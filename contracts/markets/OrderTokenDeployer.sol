// SPDX-License-Identifier: -
// License: https://license.clober.io/LICENSE.pdf

pragma solidity ^0.8.0;

import "../interfaces/CloberOrderTokenDeployer.sol";

contract OrderTokenDeployer is CloberOrderTokenDeployer {
    address private immutable _factory;
    address private immutable _canceler;

    constructor(address factory_, address canceler_) {
        _factory = factory_;
        _canceler = canceler_;
    }

    function deploy(bytes32 salt) external returns (address) {}
}
