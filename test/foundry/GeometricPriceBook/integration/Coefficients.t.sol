// SPDX-License-Identifier: -
// License: https://license.clober.io/LICENSE.pdf

pragma solidity ^0.8.0;

import "forge-std/Test.sol";
import "../../../../contracts/markets/VolatileMarket.sol";
import "../../../../contracts/mocks/MockQuoteToken.sol";
import "../../../../contracts/mocks/MockBaseToken.sol";
import "../../../../contracts/OrderNFT.sol";

contract GeometricPriceBookIntegrationTest is Test {
    MockQuoteToken quoteToken;
    MockBaseToken baseToken;
    OrderNFT orderToken;

    function setUp() public {
        quoteToken = new MockQuoteToken();
        baseToken = new MockBaseToken();
        orderToken = new OrderNFT(address(this), address(this));
    }

    function testCoefficients(uint128 a, uint128 r) public {
        vm.assume(a < 3 * 10**38 && r < 3 * 10**38);
        if ((uint256(r) * a) / 10**18 <= a) {
            vm.expectRevert();
            new VolatileMarket(
                address(orderToken),
                address(quoteToken),
                address(baseToken),
                1,
                0,
                0,
                address(this),
                a,
                r
            );
        } else {
            _testCoefficients(a, r);
        }
    }

    function _testCoefficients(uint128 a, uint128 r) internal {
        VolatileMarket market = new VolatileMarket(
            address(orderToken),
            address(quoteToken),
            address(baseToken),
            1,
            0,
            0,
            address(this),
            a,
            r
        );
        uint16 maxPriceIndex = market.maxPriceIndex();
        if (maxPriceIndex < 0xffff) {
            vm.expectRevert(abi.encodeWithSelector(Errors.CloberError.selector, Errors.INVALID_INDEX));
            market.indexToPrice(maxPriceIndex + 1);
        }
        assertLe(market.indexToPrice(maxPriceIndex), market.priceUpperBound(), "WRONG_MAX_PRICE");
    }

    function testCoefficients() public {
        _testCoefficients(1000000, 100001 * 10**13);
        _testCoefficients(1, 2 * 10**18);
        _testCoefficients(10**5, 10001 * 10**14);
    }
}
