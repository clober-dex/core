import { task } from 'hardhat/config'
import { BigNumber } from 'ethers'

import { waitForTx } from '../../utils/contract'

task('utils:token-transfer', 'Transfer ERC20 Token')
  .addParam('token', 'token address')
  .addParam('to', 'receiver address')
  .addParam('amount', 'token amount')
  .setAction(async ({ token, to, amount }, hre) => {
    const tokenContract = await hre.ethers.getContractAt('IERC20', token)
    const receipt = await waitForTx(
      tokenContract.transfer(to, BigNumber.from(amount)),
    )
    console.log(receipt.transactionHash)
  })

task('utils:token-approve', 'Approve ERC20 Token')
  .addParam('token', 'token address')
  .addParam('to', 'receiver address')
  .addParam('amount', 'token amount')
  .setAction(async ({ token, to, amount }, hre) => {
    const tokenContract = await hre.ethers.getContractAt('IERC20', token)
    const receipt = await waitForTx(
      tokenContract.approve(to, BigNumber.from(amount)),
    )
    console.log(receipt.transactionHash)
  })

task('utils:token-mint', 'Mint ERC20 Token')
  .addParam('token', 'token address')
  .addParam('to', 'receiver address')
  .addParam('amount', 'token amount')
  .setAction(async ({ token, to, amount }, hre) => {
    const tokenContract = await hre.ethers.getContractAt('MockERC20', token)
    const receipt = await waitForTx(
      tokenContract.mint(to, BigNumber.from(amount)),
    )
    console.log(receipt.transactionHash)
  })
