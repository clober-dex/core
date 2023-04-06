// SPDX-License-Identifier: -
// License: https://license.clober.io/LICENSE.pdf

pragma solidity ^0.8.0;

import "forge-std/Test.sol";
import "../../../../contracts/markets/VolatileMarket.sol";
import "../../../../contracts/mocks/MockQuoteToken.sol";
import "../../../../contracts/mocks/MockBaseToken.sol";
import "../../../../contracts/OrderNFT.sol";

contract GeometricPriceBookIntegrationTest is Test {
    VolatileMarket market;
    MockQuoteToken quoteToken;
    MockBaseToken baseToken;
    OrderNFT orderToken;

    function setUp() public {
        quoteToken = new MockQuoteToken();
        baseToken = new MockBaseToken();
        orderToken = new OrderNFT(address(this), address(this));
    }

    function testCoefficients(uint128 a, uint128 r) public {
        vm.assume(uint256(a) * r < 2**192 * 10**18);
        if ((uint256(r) * a) / 10**18 <= a) {
            vm.expectRevert(abi.encodeWithSelector(Errors.CloberError.selector, Errors.INVALID_COEFFICIENTS));
            market = new VolatileMarket(
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
            market = new VolatileMarket(
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
        }
    }
}
