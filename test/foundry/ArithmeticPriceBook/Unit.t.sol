// SPDX-License-Identifier: -
// License: https://license.clober.io/LICENSE.pdf

pragma solidity ^0.8.0;

import "forge-std/Test.sol";

import "../../../contracts/markets/ArithmeticPriceBook.sol";
import "../../../contracts/markets/StableMarket.sol";
import "../../../contracts/mocks/MockQuoteToken.sol";
import "../../../contracts/mocks/MockBaseToken.sol";
import "../../../contracts/OrderNFT.sol";

contract ArithmeticPriceBookUnitTest is Test {
    uint128 public constant A = 10**14;
    uint128 public constant D = 10**14;

    StableMarket market;
    MockQuoteToken quoteToken;
    MockBaseToken baseToken;
    OrderNFT orderToken;

    function setUp() public {
        quoteToken = new MockQuoteToken();
        baseToken = new MockBaseToken();
        orderToken = new OrderNFT(address(this), address(this));
        market = new StableMarket(
            address(orderToken),
            address(quoteToken),
            address(baseToken),
            1,
            0,
            0,
            address(this),
            A,
            D
        );
    }

    function testIndexToPrice() public {
        assertEq(market.indexToPrice(0), A);
        assertEq(market.indexToPrice(5), A + 5 * D);
        assertEq(market.indexToPrice(type(uint16).max), A + type(uint16).max * D);
    }

    function _testPriceToIndex(
        uint128 price,
        bool roundingUp,
        uint16 expectedIndex
    ) private {
        (uint16 priceIndex, uint128 correctedPrice) = market.priceToIndex(price, roundingUp);
        assertEq(priceIndex, expectedIndex);
        assertEq(correctedPrice, market.indexToPrice(expectedIndex));
    }

    function testPriceToIndex() public {
        _testPriceToIndex(A, false, 0);
        _testPriceToIndex(A + 5 * D, false, 5);

        _testPriceToIndex(A + 5 * D - 1, false, 4);
        _testPriceToIndex(A + 5 * D - 1, true, 5);
        _testPriceToIndex(A + 5 * D + 1, false, 5);
        _testPriceToIndex(A + 5 * D + 1, true, 6);

        _testPriceToIndex(A + type(uint16).max * D, false, type(uint16).max);
        _testPriceToIndex(A + type(uint16).max * D - 1, false, type(uint16).max - 1);
    }

    function testRevertPriceToIndex() public {
        vm.expectRevert(abi.encodeWithSelector(Errors.CloberError.selector, Errors.INVALID_PRICE));
        market.priceToIndex(A - 1, true);
        vm.expectRevert(abi.encodeWithSelector(Errors.CloberError.selector, Errors.INVALID_PRICE));
        market.priceToIndex(A - 1, false);
        vm.expectRevert(abi.encodeWithSelector(Errors.CloberError.selector, Errors.INVALID_PRICE));
        market.priceToIndex(A + (2**16) * D, true);
        vm.expectRevert(abi.encodeWithSelector(Errors.CloberError.selector, Errors.INVALID_PRICE));
        market.priceToIndex(A + (2**16) * D, false);
        vm.expectRevert(abi.encodeWithSelector(Errors.CloberError.selector, Errors.INVALID_PRICE));
        market.priceToIndex(A + (2**16) * D - 1, true);
    }
}
