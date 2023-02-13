import { task } from 'hardhat/config'
import { HardhatRuntimeEnvironment } from 'hardhat/types'
import { ConfigurableTaskDefinition } from 'hardhat/types/runtime'

import { Deployer } from '../utils/Deployer'

export const deployerTask = (
  name: string,
  description: string,
  action: (
    taskArgs: any,
    hre: HardhatRuntimeEnvironment,
    deployer: Deployer,
  ) => Promise<any>,
): ConfigurableTaskDefinition => {
  return task(name, description).setAction(async (taskArgs, hre) => {
    await hre.run('compile')
    const deployer = new Deployer(hre)
    let result
    try {
      result = await action(taskArgs, hre, deployer)
    } finally {
      deployer.saveAddresses()
    }
    return result
  })
}
