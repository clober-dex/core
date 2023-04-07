// SPDX-License-Identifier: -
// License: https://license.clober.io/LICENSE.pdf

pragma solidity ^0.8.0;

import "../OrderBook.sol";
import "./GeometricPriceBook.sol";

contract VolatileMarket is OrderBook, GeometricPriceBook {
    constructor(
        address orderToken_,
        address quoteToken_,
        address baseToken_,
        uint96 quoteUnit_,
        int24 makerFee_,
        uint24 takerFee_,
        address factory_,
        uint128 a_,
        uint128 r_
    )
        OrderBook(orderToken_, quoteToken_, baseToken_, quoteUnit_, makerFee_, takerFee_, factory_)
        GeometricPriceBook(a_, r_)
    {}

    function maxPriceIndex() public view override returns (uint16) {
        return _maxIndex;
    }

    function priceUpperBound() public view override returns (uint256) {
        return _priceUpperBound;
    }

    function indexToPrice(uint16 priceIndex) public view override returns (uint256) {
        return _indexToPrice(priceIndex);
    }

    function priceToIndex(uint256 price, bool roundingUp) public view override returns (uint16, uint256) {
        return _priceToIndex(price, roundingUp);
    }
}
