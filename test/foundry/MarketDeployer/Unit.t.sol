// SPDX-License-Identifier: -
// License: https://license.clober.io/LICENSE.pdf

pragma solidity ^0.8.0;

import "forge-std/Test.sol";

import "../../../contracts/markets/VolatileMarketDeployer.sol";
import "../../../contracts/markets/StableMarketDeployer.sol";
import "../../../contracts/mocks/MockERC20.sol";
import "../../../contracts/MarketFactory.sol";

contract MarketDeployerUnitTest is Test {
    VolatileMarketDeployer volatileDeployer;
    StableMarketDeployer stableDeployer;
    address quoteToken;
    address baseToken;
    address mockOrderToken = address(0x123);

    function setUp() public {
        volatileDeployer = new VolatileMarketDeployer(address(this));
        stableDeployer = new StableMarketDeployer(address(this));
        quoteToken = address(new MockERC20("quote", "QUOTE", 6));
        baseToken = address(new MockERC20("base", "BASE", 18));
    }

    function testDeployVolatileAsNonAdmin() public {
        address caller = address(0);
        vm.expectRevert(abi.encodeWithSelector(Errors.CloberError.selector, Errors.ACCESS));
        vm.prank(caller);
        volatileDeployer.deploy(
            mockOrderToken,
            quoteToken,
            baseToken,
            bytes32(uint256(1)),
            1000,
            0,
            0,
            10**10,
            1001 * 10**15
        );
    }

    function testDeployVolatile() public {
        address market = volatileDeployer.deploy(
            mockOrderToken,
            quoteToken,
            baseToken,
            bytes32(uint256(1)),
            1000,
            0,
            0,
            10**10,
            1001 * 10**15
        );
        assertEq(VolatileMarket(market).quoteToken(), quoteToken, "MARKET_QUOTE");
        assertEq(VolatileMarket(market).baseToken(), baseToken, "MARKET_BASE");
    }

    function testDeployStableAsNonAdmin() public {
        address caller = address(0);
        vm.expectRevert(abi.encodeWithSelector(Errors.CloberError.selector, Errors.ACCESS));
        vm.prank(caller);
        stableDeployer.deploy(mockOrderToken, quoteToken, baseToken, bytes32(uint256(1)), 1000, 0, 0, 10**14, 10**14);
    }

    function testDeployStable() public {
        address market = stableDeployer.deploy(
            mockOrderToken,
            quoteToken,
            baseToken,
            bytes32(uint256(1)),
            1000,
            0,
            0,
            10**14,
            10**14
        );
        assertEq(StableMarket(market).quoteToken(), quoteToken, "MARKET_QUOTE");
        assertEq(StableMarket(market).baseToken(), baseToken, "MARKET_BASE");
    }
}
