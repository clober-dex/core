// SPDX-License-Identifier: -
// License: https://license.clober.io/LICENSE.pdf

pragma solidity ^0.8.0;

import "../interfaces/CloberMarketDeployer.sol";
import "../OrderBook.sol";

contract MarketDeployer is CloberMarketDeployer {
    address public immutable factory;

    constructor(address factory_) {
        factory = factory_;
    }

    function deploy(
        address orderToken,
        address quoteToken,
        address baseToken,
        bytes32 salt,
        uint96 quoteUnit,
        int24 makerFee,
        uint24 takerFee,
        address priceBook
    ) external returns (address market) {
        if (msg.sender != factory) {
            revert Errors.CloberError(Errors.ACCESS);
        }
        market = address(
            new OrderBook{salt: salt}(
                orderToken,
                quoteToken,
                baseToken,
                quoteUnit,
                makerFee,
                takerFee,
                factory,
                priceBook
            )
        );
        emit Deploy(market);
    }
}
