import { deployerTask } from '../template'
import {
  marketConfigs,
  StableMarketConfig,
  VolatileMarketConfig,
} from '../../utils/markets'
import { liveLog } from '../../utils/misc'
import { MARKET_TYPE } from '../../utils/constant'
import { waitForTx } from '../../utils/contract'

deployerTask(
  'config:factory:create-markets',
  'create all defined markets',
  async (taskArgs, hre, deployer) => {
    const factory = await hre.ethers.getContractAt(
      'MarketFactory',
      deployer.getAddress('MarketFactory'),
    )
    const configs = marketConfigs[hre.network.name]
    if (!configs) {
      throw new Error(`Config not defined with network ${hre.network.name}`)
    }
    for (const config of configs) {
      if (!config.address) {
        // deploy market
        let receipt
        if (config.type === MARKET_TYPE.VOLATILE) {
          receipt = await waitForTx(
            factory.createVolatileMarket(
              config.host,
              config.quoteToken,
              config.baseToken,
              config.quoteUnit,
              config.makeFee,
              config.takeFee,
              config.a,
              (config as VolatileMarketConfig).r,
            ),
          )

          const event = receipt.events?.filter(
            (e) => e.event == 'CreateVolatileMarket',
          )[0]
          // @ts-ignore
          const deployedAddress = event.args[0]
          liveLog(
            `Volatile Market ${config.name} is deployed with ${deployedAddress} on tx ${receipt.transactionHash}`,
          )
        } else if (config.type === MARKET_TYPE.STABLE) {
          receipt = await waitForTx(
            factory.createStableMarket(
              config.host,
              config.quoteToken,
              config.baseToken,
              config.quoteUnit,
              config.makeFee,
              config.takeFee,
              config.a,
              (config as StableMarketConfig).d,
            ),
          )

          const event = receipt.events?.filter(
            (e) => e.event == 'CreateStableMarket',
          )[0]
          // @ts-ignore
          const deployedAddress = event.args[0]
          liveLog(
            `Stable Market ${config.name} is deployed with ${deployedAddress} on tx ${receipt.transactionHash}`,
          )
        } else {
          throw new Error(`Wrong market type(${config.type}) of ${config.name}`)
        }
      }
    }
  },
)
