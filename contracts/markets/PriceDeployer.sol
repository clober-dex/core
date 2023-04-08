// SPDX-License-Identifier: -
// License: https://license.clober.io/LICENSE.pdf

pragma solidity ^0.8.0;

import "./ArithmeticPriceBook.sol";
import "./GeometricPriceBook.sol";
import "../interfaces/CloberPriceBookDeployer.sol";

contract PriceBookDeployer is CloberPriceBookDeployer {
    address private immutable _factory;

    constructor(address factory_) {
        _factory = factory_;
    }

    function deployArithmeticPriceBook(uint128 a, uint128 d) external returns (address priceBook) {
        if (msg.sender != _factory) {
            revert Errors.CloberError(Errors.ACCESS);
        }
        priceBook = address(new ArithmeticPriceBook(a, d));
    }

    function deployGeometricPriceBook(uint128 a, uint128 r) external returns (address priceBook) {
        if (msg.sender != _factory) {
            revert Errors.CloberError(Errors.ACCESS);
        }
        priceBook = address(new GeometricPriceBook(a, r));
    }
}
