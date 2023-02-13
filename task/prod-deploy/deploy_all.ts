import { task } from 'hardhat/config'

task('prod:deploy-all').setAction(async (taskArgs, hre) => {
  await hre.run('prod:deploy-factory')
  await hre.run('prod:deploy-router')
})
