// SPDX-License-Identifier: -
// License: https://license.clober.io/LICENSE.pdf

pragma solidity ^0.8.0;

import "forge-std/Test.sol";

import "../../../contracts/markets/GeometricPriceBook.sol";
import "../../../contracts/markets/VolatileMarket.sol";
import "../../../contracts/mocks/MockQuoteToken.sol";
import "../../../contracts/mocks/MockBaseToken.sol";
import "../../../contracts/OrderNFT.sol";

contract GeometricPriceBookR101UnitTest is Test {
    uint128 public constant A = 10**10;
    uint128 public constant R = 101 * 10**16;

    VolatileMarket market;
    MockQuoteToken quoteToken;
    MockBaseToken baseToken;
    OrderNFT orderToken;

    function setUp() public {
        quoteToken = new MockQuoteToken();
        baseToken = new MockBaseToken();
        orderToken = new OrderNFT(address(this), address(this));
        market = new VolatileMarket(
            address(orderToken),
            address(quoteToken),
            address(baseToken),
            1,
            0,
            0,
            address(this),
            A,
            R
        );
    }

    function testIndexToPrice() public {
        uint256 lastPrice = market.indexToPrice(0);
        for (uint16 index = 1; ; index++) {
            uint256 price = market.indexToPrice(index);
            uint256 spread = (uint256(price) * 10000000) / lastPrice;
            assertGe(spread, 10099999);
            assertLe(spread, 10100000);
            lastPrice = price;
            if (index == market.maxIndex()) break;
        }
    }

    function _testPriceToIndex(
        uint256 price,
        bool roundingUp,
        uint16 expectedIndex
    ) private {
        (uint16 priceIndex, uint256 correctedPrice) = market.priceToIndex(price, roundingUp);
        assertEq(priceIndex, expectedIndex);
        assertEq(correctedPrice, market.indexToPrice(expectedIndex));
    }

    function testPriceToIndex() public {
        for (uint16 index = 0; ; index++) {
            uint256 price = market.indexToPrice(index);
            if (index == 0) {
                vm.expectRevert();
                market.priceToIndex(price - 1, false);
                vm.expectRevert();
                market.priceToIndex(price - 1, true);
            } else {
                _testPriceToIndex(price - 1, false, index - 1);
                _testPriceToIndex(price - 1, true, index);
            }
            _testPriceToIndex(price, false, index);
            _testPriceToIndex(price, true, index);
            _testPriceToIndex(price + 1, false, index);
            if (index == market.maxIndex()) {
                vm.expectRevert(abi.encodeWithSelector(Errors.CloberError.selector, Errors.INVALID_PRICE));
                market.priceToIndex(price + 1, true);
                vm.expectRevert(abi.encodeWithSelector(Errors.CloberError.selector, Errors.INVALID_PRICE));
                // test for more than 1.01 * maxPrice
                market.priceToIndex(price + price / 99, false); // = price * 100 / 99 => price * 1.0101010101010102
                break;
            }
            _testPriceToIndex(price + 1, true, index + 1);
        }
    }

    function testRevertPriceToIndex() public {
        uint256 maxPrice = market.indexToPrice(market.maxIndex());

        vm.expectRevert(abi.encodeWithSelector(Errors.CloberError.selector, Errors.INVALID_PRICE));
        market.priceToIndex(A - 1, true);
        vm.expectRevert(abi.encodeWithSelector(Errors.CloberError.selector, Errors.INVALID_PRICE));
        market.priceToIndex(A - 1, false);
        vm.expectRevert(abi.encodeWithSelector(Errors.CloberError.selector, Errors.INVALID_PRICE));
        market.priceToIndex((maxPrice * R) / (10**18) + 1, true);
        vm.expectRevert(abi.encodeWithSelector(Errors.CloberError.selector, Errors.INVALID_PRICE));
        market.priceToIndex((maxPrice * R) / (10**18) + 1, false);
        vm.expectRevert(abi.encodeWithSelector(Errors.CloberError.selector, Errors.INVALID_PRICE));
        market.priceToIndex(maxPrice + 1, true);
    }
}
