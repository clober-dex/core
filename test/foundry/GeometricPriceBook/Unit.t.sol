// SPDX-License-Identifier: -
// License: https://license.clober.io/LICENSE.pdf

pragma solidity ^0.8.0;

import "forge-std/Test.sol";

import "../../../contracts/markets/GeometricPriceBook.sol";
import "../../../contracts/mocks/MockGeometricPriceBook.sol";

contract GeometricPriceBookUnitTest is Test {
    uint128 public constant A = 10**10;
    uint128 public constant R = 1001 * 10**15;

    MockGeometricPriceBook priceBook;

    function setUp() public {
        priceBook = new MockGeometricPriceBook(A, R);
    }

    function testIndexToPrice() public {
        uint128 lastPrice = priceBook.indexToPrice(0);
        for (uint16 index = 1; ; index++) {
            uint128 price = priceBook.indexToPrice(index);
            uint256 spread = (uint256(price) * 10000000) / lastPrice;
            assertGe(spread, 10009999);
            assertLe(spread, 10010000);
            lastPrice = price;
            if (index == 0xffff) break;
        }
    }

    function _testPriceToIndex(
        uint128 price,
        bool roundingUp,
        uint16 expectedIndex
    ) private {
        (uint16 priceIndex, uint128 correctedPrice) = priceBook.priceToIndex(price, roundingUp);
        assertEq(priceIndex, expectedIndex);
        assertEq(correctedPrice, priceBook.indexToPrice(expectedIndex));
    }

    function testPriceToIndex() public {
        for (uint16 index = 0; ; index++) {
            uint128 price = priceBook.indexToPrice(index);
            if (index == 0) {
                vm.expectRevert();
                priceBook.priceToIndex(price - 1, false);
                vm.expectRevert();
                priceBook.priceToIndex(price - 1, true);
            } else {
                _testPriceToIndex(price - 1, false, index - 1);
                _testPriceToIndex(price - 1, true, index);
            }
            _testPriceToIndex(price, false, index);
            _testPriceToIndex(price, true, index);
            _testPriceToIndex(price + 1, false, index);
            if (index == 0xffff) {
                vm.expectRevert(abi.encodeWithSelector(Errors.CloberError.selector, Errors.INVALID_PRICE));
                priceBook.priceToIndex(price + 1, true);
                break;
            }
            _testPriceToIndex(price + 1, true, index + 1);
        }
    }

    function testRevertPriceToIndex() public {
        uint256 maxPrice = priceBook.indexToPrice(type(uint16).max);

        vm.expectRevert(abi.encodeWithSelector(Errors.CloberError.selector, Errors.INVALID_PRICE));
        priceBook.priceToIndex(A - 1, true);
        vm.expectRevert(abi.encodeWithSelector(Errors.CloberError.selector, Errors.INVALID_PRICE));
        priceBook.priceToIndex(A - 1, false);
        vm.expectRevert(abi.encodeWithSelector(Errors.CloberError.selector, Errors.INVALID_PRICE));
        priceBook.priceToIndex(uint128((maxPrice * R) / (10**18) + 1), true);
        vm.expectRevert(abi.encodeWithSelector(Errors.CloberError.selector, Errors.INVALID_PRICE));
        priceBook.priceToIndex(uint128((maxPrice * R) / (10**18) + 1), false);
        vm.expectRevert(abi.encodeWithSelector(Errors.CloberError.selector, Errors.INVALID_PRICE));
        priceBook.priceToIndex(uint128(maxPrice + 1), true);
    }
}
