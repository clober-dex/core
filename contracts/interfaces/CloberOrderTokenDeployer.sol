// SPDX-License-Identifier: GPL-2.0-or-later

pragma solidity ^0.8.0;

interface CloberOrderTokenDeployer {
    // TODO: add docstring
    function deploy(bytes32 salt) external returns (address);
}
