// SPDX-License-Identifier: GPL-2.0-or-later

pragma solidity ^0.8.0;

interface CloberPriceBookDeployer {
    // TODO: add docstring
    function deployArithmeticPriceBook(uint128 a, uint128 d) external returns (address);

    // TODO: add docstring
    function deployGeometricPriceBook(uint128 a, uint128 r) external returns (address);

    function computeArithmeticPriceBookAddress(uint128 a, uint128 d) external view returns (address);

    function computeGeometricPriceBookAddress(uint128 a, uint128 r) external view returns (address);
}
