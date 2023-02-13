// SPDX-License-Identifier: -
// License: https://license.clober.io/LICENSE.pdf

pragma solidity ^0.8.0;

import "../markets/GeometricPriceBook.sol";

contract MockGeometricPriceBook is GeometricPriceBook {
    constructor(uint128 a, uint128 r) GeometricPriceBook(a, r) {}

    function indexToPrice(uint16 priceIndex) external view returns (uint128) {
        return _indexToPrice(priceIndex);
    }

    function priceToIndex(uint128 price, bool roundingUp) external view returns (uint16, uint128) {
        return _priceToIndex(price, roundingUp);
    }
}
