import { BigNumber } from 'ethers'

import { deployerTask } from '../template'
import { computeCreate1Address } from '../../utils/misc'
import { marketConfigs } from '../../utils/markets'

deployerTask(
  'dev:deploy-factory',
  'Deploy market factory',
  async (taskArgs, hre, deployer) => {
    const canceler = await deployer.deploy('OrderCanceler')
    const signer = await deployer.getSigner()
    const nonce = await signer.getTransactionCount('latest')
    const computedFactoryAddress = computeCreate1Address(
      signer.address,
      BigNumber.from(nonce + 2),
    )

    const volatileMarketDeployer = await deployer.deploy(
      'VolatileMarketDeployer',
      [computedFactoryAddress],
    )
    const stableMarketDeployer = await deployer.deploy('StableMarketDeployer', [
      computedFactoryAddress,
    ])

    const initialQuoteTokenRegistrations = [
      ...new Set(marketConfigs[hre.network.name]?.map((v) => v.quoteToken)),
    ]
    const factory = await deployer.deploy('MarketFactory', [
      volatileMarketDeployer,
      stableMarketDeployer,
      signer.address,
      canceler,
      initialQuoteTokenRegistrations,
    ])
    if (factory.toLowerCase() !== computedFactoryAddress.toLowerCase()) {
      throw new Error(
        `Computed factory address is wrong, real: ${factory}, computed: ${computedFactoryAddress}`,
      )
    }
  },
)
