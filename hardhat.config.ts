import fs from 'fs'
import path from 'path'

import * as dotenv from 'dotenv'
// eslint-disable-next-line import/order
import readlineSync from 'readline-sync'

import '@nomiclabs/hardhat-waffle'
import '@typechain/hardhat'
import 'hardhat-deploy'
import '@nomiclabs/hardhat-ethers'
import '@nomiclabs/hardhat-etherscan'
import 'hardhat-gas-reporter'
import 'hardhat-contract-sizer'
import 'hardhat-abi-exporter'
import 'solidity-coverage'

dotenv.config()

import { HardhatConfig } from 'hardhat/types'

import { CHAINID, NETWORK } from './utils/constant'

const SKIP_LOAD = process.env.SKIP_LOAD === 'true'

// Prevent to load scripts before compilation and typechain
if (!SKIP_LOAD) {
  ;['config', 'dev-deploy', 'utils', 'prod-deploy'].forEach(
    (folder) => {
      const tasksPath = path.join(__dirname, 'task', folder)
      fs.readdirSync(tasksPath)
        .filter((pth) => pth.includes('.ts'))
        .forEach((task) => {
          require(`${tasksPath}/${task}`)
        })
    },
  )
}

let privateKey: string

const getMainnetPrivateKey = () => {
  let network
  for (const [i, arg] of Object.entries(process.argv)) {
    if (arg === '--network') {
      network = process.argv[parseInt(i) + 1]
    }
  }

  const prodNetworks = new Set<string>([
    NETWORK.ETHEREUM,
    NETWORK.POLYGON,
    NETWORK.ARBITRUM,
  ])
  if (network && prodNetworks.has(network)) {
    if (privateKey) {
      return privateKey
    }
    const keythereum = require('keythereum')

    const KEYSTORE = './clober-deployer-key.json'
    const PASSWORD = readlineSync.question('Password: ', {
      hideEchoBack: true,
    })
    if (PASSWORD !== '') {
      const keyObject = JSON.parse(fs.readFileSync(KEYSTORE).toString())
      privateKey =
        '0x' + keythereum.recover(PASSWORD, keyObject).toString('hex')
    } else {
      privateKey =
        '0x0000000000000000000000000000000000000000000000000000000000000001'
    }
    return privateKey
  }
  return '0x0000000000000000000000000000000000000000000000000000000000000001'
}

const config: HardhatConfig = {
  solidity: {
    compilers: [
      {
        version: '0.8.17',
        settings: {
          evmVersion: 'london',
          optimizer: {
            enabled: true,
            runs: 1000,
          },
        },
      },
    ],
    overrides: {},
  },
  // @ts-ignore
  typechain: {
    outDir: 'typechain',
    target: 'ethers-v5',
  },
  etherscan: {
    apiKey: 'API_KEY',
    customChains: [],
  },
  defaultNetwork: 'hardhat',
  networks: {
    [NETWORK.ETHEREUM]: {
      url: process.env.ETHEREUM_NODE_URL ?? '',
      chainId: CHAINID.ETHEREUM,
      accounts: [getMainnetPrivateKey()],
      gas: 'auto',
      gasPrice: 'auto',
      gasMultiplier: 1,
      timeout: 3000000,
      httpHeaders: {},
      live: true,
      saveDeployments: true,
      tags: ['mainnet', 'prod'],
      companionNetworks: {},
    },
    [NETWORK.POLYGON]: {
      url: process.env.POLYGON_NODE_URL ?? '',
      chainId: CHAINID.POLYGON,
      accounts: [getMainnetPrivateKey()],
      gas: 'auto',
      gasPrice: 'auto',
      gasMultiplier: 1,
      timeout: 3000000,
      httpHeaders: {},
      live: true,
      saveDeployments: true,
      tags: ['mainnet', 'prod'],
      companionNetworks: {},
    },
    [NETWORK.ARBITRUM]: {
      url: process.env.ARBITRUM_NODE_URL ?? '',
      chainId: CHAINID.ARBITRUM,
      accounts: [getMainnetPrivateKey()],
      gas: 'auto',
      gasPrice: 'auto',
      gasMultiplier: 1,
      timeout: 3000000,
      httpHeaders: {},
      live: true,
      saveDeployments: true,
      tags: ['mainnet', 'prod'],
      companionNetworks: {},
    },
    [NETWORK.GOERLI_DEV]: {
      url: process.env.GOERLI_NODE_URL ?? '',
      chainId: CHAINID.GOERLI,
      accounts:
        process.env.DEV_PRIVATE_KEY !== undefined
          ? [process.env.DEV_PRIVATE_KEY]
          : [],
      gas: 'auto',
      gasPrice: 'auto',
      gasMultiplier: 1,
      timeout: 3000000,
      httpHeaders: {},
      live: true,
      saveDeployments: true,
      tags: ['testnet', 'dev'],
      companionNetworks: {},
    },
    [NETWORK.POLYGON_DEV]: {
      url: process.env.POLYGON_NODE_URL ?? '',
      chainId: CHAINID.POLYGON,
      accounts:
        process.env.DEV_PRIVATE_KEY !== undefined
          ? [process.env.DEV_PRIVATE_KEY]
          : [],
      gas: 'auto',
      gasPrice: 'auto',
      gasMultiplier: 1,
      timeout: 3000000,
      httpHeaders: {},
      live: true,
      saveDeployments: true,
      tags: ['mainnet', 'dev'],
      companionNetworks: {},
    },
    [NETWORK.ARBITRUM_GOERLI_DEV]: {
      url: process.env.ARBITRUM_GOERLI_NODE_URL ?? '',
      chainId: CHAINID.ARBITRUM_GOERLI,
      accounts:
        process.env.DEV_PRIVATE_KEY !== undefined
          ? [process.env.DEV_PRIVATE_KEY]
          : [],
      gas: 'auto',
      gasPrice: 'auto',
      gasMultiplier: 1,
      timeout: 3000000,
      httpHeaders: {},
      live: true,
      saveDeployments: true,
      tags: ['testnet', 'dev'],
      companionNetworks: {},
    },
    [NETWORK.HARDHAT]: {
      chainId: CHAINID.HARDHAT,
      gas: 20000000,
      gasPrice: 250000000000,
      gasMultiplier: 1,
      hardfork: 'london',
      // @ts-ignore
      // forking: {
      //   enabled: true,
      //   url: 'ARCHIVE_NODE_URL',
      // },
      mining: {
        auto: true,
        interval: 0,
        mempool: {
          order: 'fifo',
        },
      },
      accounts: {
        mnemonic:
          'loop curious foster tank depart vintage regret net frozen version expire vacant there zebra world',
        initialIndex: 0,
        count: 10,
        path: "m/44'/60'/0'/0",
        accountsBalance: '10000000000000000000000000000',
        passphrase: '',
      },
      blockGasLimit: 200000000,
      // @ts-ignore
      minGasPrice: undefined,
      throwOnTransactionFailures: true,
      throwOnCallFailures: true,
      allowUnlimitedContractSize: true,
      initialDate: new Date().toISOString(),
      loggingEnabled: false,
      // @ts-ignore
      chains: undefined,
    },
  },
  namedAccounts: {
    deployer: {
      default: 0,
    },
  },
  abiExporter: [
    // @ts-ignore
    {
      path: './abi',
      runOnCompile: false,
      clear: true,
      flat: true,
      only: [],
      except: [],
      spacing: 2,
      pretty: false,
      filter: () => true,
    },
  ],
  mocha: {
    timeout: 40000000,
    require: ['hardhat/register'],
  },
  // @ts-ignore
  contractSizer: {
    runOnCompile: true,
  },
}

export default config
