import { BigNumber } from 'ethers'

import { deployerTask } from '../template'
import { computeCreate1Address, liveLog } from '../../utils/misc'
import { initialRegisteredQuoteTokens } from '../../utils/markets'
import { CLOBER_ADMIN, CLOBER_DAO_TREASURY } from '../../utils/constant'
import { waitForTx } from '../../utils/contract'

deployerTask(
  'prod:deploy-factory',
  'Deploy market factory',
  async (taskArgs, hre, deployer) => {
    const signer = await deployer.getSigner()

    if ((await signer.getTransactionCount('latest')) !== 2) {
      throw new Error('nonce not matched')
    }
    const canceler = await deployer.deploy('OrderCanceler')
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

    const factoryAddress = await deployer.deploy('MarketFactory', [
      volatileMarketDeployer,
      stableMarketDeployer,
      CLOBER_DAO_TREASURY[hre.network.name],
      canceler,
      initialRegisteredQuoteTokens[hre.network.name],
    ])
    if (factoryAddress.toLowerCase() !== computedFactoryAddress.toLowerCase()) {
      throw new Error(
        `Computed factory address is wrong, real: ${factoryAddress}, computed: ${computedFactoryAddress}`,
      )
    }
    const factory = await hre.ethers.getContractAt(
      'MarketFactory',
      factoryAddress,
    )
    const receipt = await waitForTx(
      factory.prepareChangeOwner(CLOBER_ADMIN[hre.network.name]),
    )
    liveLog(
      `Prepare change owner to ${CLOBER_ADMIN[hre.network.name]} on tx ${
        receipt.transactionHash
      }`,
    )
  },
)
