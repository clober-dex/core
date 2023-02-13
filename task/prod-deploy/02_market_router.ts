import { deployerTask } from '../template'

deployerTask(
  'prod:deploy-router',
  'Deploy market router',
  async (taskArgs, hre, deployer) => {
    await deployer.deploy('MarketRouter', [
      deployer.getAddress('MarketFactory'),
    ])
  },
)
