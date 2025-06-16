import { deployerTask } from '../template'

deployerTask('dev:deploy-router', 'Deploy market router', async (taskArgs, hre, deployer) => {
  await deployer.deploy('MarketRouter', [deployer.getAddress('MarketFactory')])
})
