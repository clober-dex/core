import { task } from 'hardhat/config'

task('dev:deploy-all').setAction(async (taskArgs, hre) => {
  await hre.run('dev:deploy-factory')
  await hre.run('dev:deploy-router')
})
