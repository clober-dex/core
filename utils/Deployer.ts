import fs from 'fs'
import path from 'path'

import chalk from 'chalk'
import { HardhatRuntimeEnvironment } from 'hardhat/types'
import { formatEther } from 'ethers/lib/utils'
import { BigNumber, BytesLike, ContractFactory, ethers } from 'ethers'
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers'

import { liveLog, UsefulMap } from './misc'
import { waitForTx } from './contract'

type MethodInfo = {
  methodName: string
  args: any[]
}

type DeployOptions = {
  upgradeable?:
    | {
        init?: MethodInfo
      }
    | true
}

export class Deployer {
  private static readonly DEPLOYMENTS_FILE_NAME = 'address.json'
  private static readonly GAS_BUF = 1.3 // floor at 0.xx
  private readonly dirPath: string
  private readonly filePath: string
  private readonly hre: HardhatRuntimeEnvironment
  private readonly addresses: UsefulMap<string, string>

  constructor(hre: HardhatRuntimeEnvironment) {
    this.hre = hre
    this.dirPath = path.join(
      __dirname,
      '../deployments/',
      this.hre.network.name,
    )
    this.filePath = path.join(this.dirPath, Deployer.DEPLOYMENTS_FILE_NAME)
    if (fs.existsSync(this.filePath)) {
      this.addresses = new UsefulMap<string, string>(
        ...(Object.entries(
          JSON.parse(fs.readFileSync(this.filePath, 'utf-8')),
        ) as [string, string][]),
      )
    } else {
      this.addresses = new UsefulMap<string, string>()
    }
  }

  async getSigner(): Promise<SignerWithAddress> {
    return (await this.hre.ethers.getSigners())[0]
  }

  getAddress(contractName: string): string {
    return this.addresses.mustGet(contractName)
  }

  removeAddress(contractName: string): void {
    this.addresses.delete(contractName)
  }

  saveAddresses(): void {
    if (!fs.existsSync(this.dirPath)) {
      fs.mkdirSync(this.dirPath)
    }
    fs.writeFileSync(
      this.filePath,
      JSON.stringify(Object.fromEntries(this.addresses), null, 2),
    )
  }

  async deploy(
    contractName: string,
    args: any[] = [],
    options?: DeployOptions,
  ): Promise<string> {
    const factory = await this.hre.ethers.getContractFactory(contractName)

    // check if contract already has deployed
    if (this.addresses.has(contractName)) {
      const address = this.addresses.mustGet(contractName)
      liveLog(`${contractName} already deployed with ${address}`)
      return address
    } else {
      const deployer = await this._loadDeployer()

      let receipt: ethers.ContractReceipt
      // check upgradeable
      if (options && options.upgradeable) {
        // if upgradeable, deploy proxy first
        liveLog(`Deploying ${contractName} with Proxy...`)
        // encode data before deploy for type check
        let initData: BytesLike = '0x'
        if (
          typeof options.upgradeable !== 'boolean' &&
          options.upgradeable.init
        ) {
          initData = this._buildMethodCall(factory, options.upgradeable.init)
        }

        let implAddress: string
        // check if implementation has deployed before
        if (this.addresses.has(this._toImplementationKey(contractName))) {
          implAddress = this.addresses.mustGet(
            this._toImplementationKey(contractName),
          )
          liveLog(
            `${contractName} Implementation Already Deployed with: ${implAddress}`,
          )
        } else {
          // deploy implementation contract
          receipt = await waitForTx(this._deploy(deployer, factory, args))
          implAddress = receipt.contractAddress
          liveLog(
            `Deployed ${contractName} Implementation: ${implAddress} on tx ${receipt.transactionHash}`,
          )
          this.addresses.set(
            this._toImplementationKey(contractName),
            implAddress,
          )
        }

        // deploy proxy contract
        const proxyAdmin = this.addresses.mustGet('DefaultProxyAdmin')
        liveLog(`Deploying Proxy...`)
        const proxyFactory = await this.hre.ethers.getContractFactory(
          'TransparentUpgradeableProxy',
        )
        receipt = await waitForTx(
          this._deploy(deployer, proxyFactory, [
            implAddress,
            proxyAdmin,
            initData,
          ]),
        )
      } else {
        // deploy non-upgradeable
        liveLog(`Deploying ${contractName}...`)
        receipt = await waitForTx(this._deploy(deployer, factory, args))
      }
      const contractAddress = receipt.contractAddress
      liveLog(
        `Deployed ${contractName}: ${contractAddress} on tx ${receipt.transactionHash}\n`,
      )
      this.addresses.set(contractName, contractAddress)
      if (options && options.upgradeable) {
        // delete implementation address to mark as finished
        this.addresses.delete(this._toImplementationKey(contractName))
      }
      return contractAddress
    }
  }

  async upgrade(
    contractName: string,
    args: any[] = [],
    newImplementation?: string,
    callWith?: MethodInfo,
  ): Promise<void> {
    const factory = await this.hre.ethers.getContractFactory(contractName)
    if (!this.addresses.has(contractName)) {
      throw new Error(`${contractName} has not been deployed`)
    }
    const contractAddress = this.addresses.mustGet(contractName)
    const proxyAdmin = await this.hre.ethers.getContractAt(
      'DefaultProxyAdmin',
      this.addresses.mustGet('DefaultProxyAdmin'),
    )
    let pastImplAddress: string
    try {
      pastImplAddress = await proxyAdmin.getProxyImplementation(contractAddress)
    } catch (e) {
      console.error(
        chalk.red(
          `Failed to load implementation of ${contractName}(${contractAddress})`,
        ),
      )
      throw e
    }
    const deployer = await this._loadDeployer()
    const initData = callWith ? this._buildMethodCall(factory, callWith) : '0x'
    if (!newImplementation) {
      // deploy implementation contract
      const receipt = await waitForTx(this._deploy(deployer, factory, args))
      newImplementation = receipt.contractAddress
      liveLog(
        `Deployed ${contractName} Implementation: ${newImplementation} on tx ${receipt.transactionHash}`,
      )
    }
    const receipt = await waitForTx(
      initData === '0x'
        ? proxyAdmin.upgrade(contractAddress, newImplementation)
        : proxyAdmin.upgradeAndCall(
            contractAddress,
            newImplementation,
            initData,
          ),
    )
    liveLog(
      `Upgrade ${contractName}(${contractAddress}) from ${pastImplAddress} to ${newImplementation} on tx ${receipt.transactionHash}`,
    )
  }

  private _buildMethodCall(
    factory: ContractFactory,
    methodInfo: MethodInfo,
  ): string {
    try {
      return factory.interface.encodeFunctionData(
        methodInfo.methodName,
        methodInfo.args,
      )
    } catch (e) {
      // print contract name caught error does not print right traces
      console.error(
        chalk.red(
          `Encoding ${factory.constructor.name}'s initialize data failed`,
        ),
      )
      console.error(`methodName: ${methodInfo.methodName}`)
      console.error(`args:`, methodInfo.args)
      throw e
    }
  }

  async _deploy(
    deployer: SignerWithAddress,
    factory: ContractFactory,
    args: any[],
  ): Promise<ethers.providers.TransactionResponse> {
    const rawTx = await factory.getDeployTransaction(...args)
    rawTx.nonce = await deployer.getTransactionCount('latest')
    const multiplier = BigNumber.from(Math.floor(Deployer.GAS_BUF * 100))
    rawTx.gasPrice = (await this.hre.ethers.provider.getGasPrice())
      .mul(multiplier)
      .div(100)
    rawTx.gasLimit = (await this.hre.ethers.provider.estimateGas(rawTx))
      .mul(multiplier)
      .div(100)
    return deployer.sendTransaction(rawTx)
  }

  private _toImplementationKey(contractName: string): string {
    return contractName + '$Implementation'
  }

  private async _loadDeployer(): Promise<SignerWithAddress> {
    // check deploy signer's balance
    const deployer = (await this.hre.ethers.getSigners())[0]
    liveLog(`Deployer: ${deployer.address}`)
    liveLog(`Balance : ${formatEther(await deployer.getBalance())}`)
    return deployer
  }
}
