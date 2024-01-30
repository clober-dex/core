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
import {
  arbitrum,
  arbitrumGoerli,
  localhost,
  mainnet,
  polygon,
  polygonZkEvm,
  polygonZkEvmTestnet,
  skaleEuropaTestnet,
} from '@wagmi/chains'

const SKIP_LOAD = process.env.SKIP_LOAD === 'true'

const networkInfos = require('@wagmi/chains')
const chainIdMap: { [key: string]: string } = {}
for (const [networkName, networkInfo] of Object.entries(networkInfos)) {
  // @ts-ignore
  chainIdMap[networkInfo.id] = networkName
}

// Prevent to load scripts before compilation and typechain
if (!SKIP_LOAD) {
  ;['config', 'dev-deploy', 'utils', 'prod-deploy'].forEach((folder) => {
    const tasksPath = path.join(__dirname, 'task', folder)
    fs.readdirSync(tasksPath)
      .filter((pth) => pth.includes('.ts'))
      .forEach((task) => {
        require(`${tasksPath}/${task}`)
      })
  })
}

let privateKey: string
let ok: string

const getMainnetPrivateKey = () => {
  let network
  for (const [i, arg] of Object.entries(process.argv)) {
    if (arg === '--network') {
      network = parseInt(process.argv[parseInt(i) + 1])
      if (network.toString() in chainIdMap && ok !== 'Y') {
        ok = readlineSync.question(
          `You are trying to use ${
            chainIdMap[network.toString()]
          } network [Y/n] : `,
        )
        if (ok !== 'Y') {
          throw new Error('Network not allowed')
        }
      }
    }
  }

  const prodNetworks = new Set<number>([
    mainnet.id,
    polygon.id,
    arbitrum.id,
    polygonZkEvm.id,
  ])
  if (network && prodNetworks.has(network)) {
    if (privateKey) {
      return privateKey
    }
    const keythereum = require('keythereum')

    const KEYSTORE = './clober-v1.1-deployer-key.json'
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
    customChains: [
      {
        network: `${polygonZkEvm.id}`,
        chainId: polygonZkEvm.id,
        urls: {
          apiURL: 'https://api-zkevm.polygonscan.com/api',
          browserURL: 'https://zkevm.polygonscan.com',
        },
      },
    ],
  },
  defaultNetwork: 'hardhat',
  networks: {
    [mainnet.id]: {
      url: mainnet.rpcUrls.default.http[0],
      chainId: mainnet.id,
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
    [polygon.id]: {
      url: polygon.rpcUrls.default.http[0],
      chainId: polygon.id,
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
    [arbitrum.id]: {
      url: arbitrum.rpcUrls.default.http[0],
      chainId: arbitrum.id,
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
    [polygonZkEvm.id]: {
      url: polygonZkEvm.rpcUrls.default.http[0],
      chainId: polygonZkEvm.id,
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
    [arbitrumGoerli.id]: {
      url: arbitrumGoerli.rpcUrls.default.http[0],
      chainId: arbitrumGoerli.id,
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
    [polygonZkEvmTestnet.id]: {
      url: polygonZkEvmTestnet.rpcUrls.default.http[0],
      chainId: polygonZkEvmTestnet.id,
      accounts:
        process.env.DEV_PRIVATE_KEY !== undefined
          ? [process.env.DEV_PRIVATE_KEY]
          : [],
      gas: 10000000,
      gasPrice: 100000000000,
      gasMultiplier: 1.5,
      timeout: 3000000,
      httpHeaders: {},
      live: true,
      saveDeployments: true,
      tags: ['testnet', 'dev'],
      companionNetworks: {},
    },
    [skaleEuropaTestnet.id]: {
      url: skaleEuropaTestnet.rpcUrls.default.http[0],
      chainId: skaleEuropaTestnet.id,
      accounts:
        process.env.DEV_PRIVATE_KEY !== undefined
          ? [process.env.DEV_PRIVATE_KEY]
          : [],
      gas: 10000000,
      gasPrice: 100000000000,
      gasMultiplier: 1,
      timeout: 3000000,
      httpHeaders: {},
      live: true,
      saveDeployments: true,
      tags: ['testnet', 'dev'],
      companionNetworks: {},
    },
    hardhat: {
      chainId: localhost.id,
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
