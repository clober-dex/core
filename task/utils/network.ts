import { task } from 'hardhat/config'

task('utils:get-block', 'Print latest block')
  .addOptionalParam('where', 'block hash or block tag', 'latest')
  .setAction(async (taskArgs, hre) => {
    const block = await hre.ethers.provider.getBlock(taskArgs.where)
    console.log(block)
  })
