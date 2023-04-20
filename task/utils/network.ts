import { task } from 'hardhat/config'

task('utils:get-block', 'Print latest block')
  .addOptionalParam('where', 'block hash or block tag', 'latest')
  .setAction(async (taskArgs, hre) => {
    const block = await hre.ethers.provider.getBlock(taskArgs.where)
    console.log(block)
  })

task('utils:get-code', 'Get code of a contract')
  .addParam('address', 'target address')
  .setAction(async (taskArgs, hre) => {
    const code = await hre.ethers.provider.getCode(taskArgs.address)
    console.log(code)
  })
