// SPDX-License-Identifier: -
// License: https://license.clober.io/LICENSE.pdf

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

import "../../../../contracts/interfaces/CloberMarketSwapCallbackReceiver.sol";

contract VolatileMarketSwapCallbackReceiver is CloberMarketSwapCallbackReceiver {
    function cloberMarketSwapCallback(
        address tokenIn,
        address tokenOut,
        uint256 amountIn,
        uint256 amountOut,
        bytes calldata data
    ) external payable {
        tokenOut;
        amountOut;
        data;
        // no need to use above fields

        IERC20(tokenIn).transfer(msg.sender, amountIn);
    }
}
