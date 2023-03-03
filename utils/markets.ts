import { BigNumber } from 'ethers'
import { arbitrum, mainnet, polygon, zkSyncTestnet } from '@wagmi/chains'

import { CLOBER_ADMIN, MARKET_TYPE, TOKEN } from './constant'

type MarketConfig = {
  name: string
  host: string
  type: number
  quoteToken: string
  baseToken: string
  quoteUnit: BigNumber
  makeFee: number
  takeFee: number
  address?: string
}

export type VolatileMarketConfig = MarketConfig & {
  a: BigNumber
  r: BigNumber
}

export type StableMarketConfig = MarketConfig & {
  a: BigNumber
  d: BigNumber
}

type MarketConfigs = {
  [network: string]: (StableMarketConfig | VolatileMarketConfig)[]
}

export const marketConfigs: MarketConfigs = {
  // TODO: use `@wagmi/chain`
  [1442]: [
    {
      name: 'DAI/cUSD-stable',
      host: '0x5F79EE8f8fA862E98201120d83c4eC39D9468D49',
      type: MARKET_TYPE.STABLE,
      quoteToken: TOKEN[1442].CUSD, // cUSD
      baseToken: TOKEN[1442].DAI, // DAI
      quoteUnit: BigNumber.from('1'),
      makeFee: -40,
      takeFee: 60,
      a: BigNumber.from(10).pow(14),
      d: BigNumber.from(10).pow(14),
      address: '0x88D7a07AAe5BAd5D2ff2749384b68e85ec4e09Da',
    },
    {
      name: 'CLOB/cUSD-volatile',
      host: '0x5F79EE8f8fA862E98201120d83c4eC39D9468D49',
      type: MARKET_TYPE.VOLATILE,
      quoteToken: TOKEN[1442].CUSD, // cUSD
      baseToken: TOKEN[1442].CLOB, // CLOB
      quoteUnit: BigNumber.from('1'),
      makeFee: -200,
      takeFee: 400,
      a: BigNumber.from(10).pow(10),
      r: BigNumber.from(1001).mul(BigNumber.from(10).pow(15)),
      address: '0x779DF490Bb26c55a971fd529cD6d351dC228B8Df',
    },
  ],
  [zkSyncTestnet.id]: [
    {
      name: 'WETH/USDC',
      host: '0x5F79EE8f8fA862E98201120d83c4eC39D9468D49',
      type: MARKET_TYPE.VOLATILE,
      quoteToken: TOKEN[zkSyncTestnet.id].USDC,
      baseToken: TOKEN[zkSyncTestnet.id].WETH,
      quoteUnit: BigNumber.from('1'),
      makeFee: -100,
      takeFee: 500,
      a: BigNumber.from(10).pow(10),
      r: BigNumber.from(1001).mul(BigNumber.from(10).pow(15)),
      address: '0x536790CcB1FA5ee19645031570C1642Be2Bdd1c8',
    },
    {
      name: 'DAI/USDC',
      host: '0x5F79EE8f8fA862E98201120d83c4eC39D9468D49',
      type: MARKET_TYPE.STABLE,
      quoteToken: TOKEN[zkSyncTestnet.id].USDC,
      baseToken: TOKEN[zkSyncTestnet.id].DAI,
      quoteUnit: BigNumber.from('1'),
      makeFee: -10,
      takeFee: 90,
      a: BigNumber.from(10).pow(14),
      d: BigNumber.from(10).pow(14),
      address: '0xDcB91c6ec7c4Ac3cFBcEf6Df198407F32C621A3A',
    },
  ],
  [mainnet.id]: [
    {
      name: 'WETH/USDC',
      host: CLOBER_ADMIN[mainnet.id],
      type: MARKET_TYPE.VOLATILE,
      quoteToken: TOKEN[mainnet.id].USDC,
      baseToken: TOKEN[mainnet.id].WETH,
      quoteUnit: BigNumber.from('1'),
      makeFee: -100,
      takeFee: 500,
      a: BigNumber.from(10).pow(10),
      r: BigNumber.from(1001).mul(BigNumber.from(10).pow(15)),
      address: '0xFBfd6eA54C50cb48ecAD02dB2Cf167daFdC81355',
    },
    {
      name: 'DAI/USDC',
      host: CLOBER_ADMIN[mainnet.id],
      type: MARKET_TYPE.STABLE,
      quoteToken: TOKEN[mainnet.id].USDC,
      baseToken: TOKEN[mainnet.id].DAI,
      quoteUnit: BigNumber.from('1'),
      makeFee: -10,
      takeFee: 90,
      a: BigNumber.from(10).pow(14),
      d: BigNumber.from(10).pow(14),
      address: '0x1c230Df6364af81d1585C3B3e6aC5aaD2daD9bD9',
    },
  ],
  [polygon.id]: [
    {
      name: 'WETH/USDC',
      host: CLOBER_ADMIN[polygon.id],
      type: MARKET_TYPE.VOLATILE,
      quoteToken: TOKEN[polygon.id].USDC,
      baseToken: TOKEN[polygon.id].WETH,
      quoteUnit: BigNumber.from('1'),
      makeFee: -100,
      takeFee: 500,
      a: BigNumber.from(10).pow(10),
      r: BigNumber.from(1001).mul(BigNumber.from(10).pow(15)),
      address: '0x6EF4dBa10BE9A64fC8A4BD74d613999787488666',
    },
    {
      name: 'WMATIC/USDC',
      host: CLOBER_ADMIN[polygon.id],
      type: MARKET_TYPE.VOLATILE,
      quoteToken: TOKEN[polygon.id].USDC,
      baseToken: TOKEN[polygon.id].WMATIC,
      quoteUnit: BigNumber.from('1'),
      makeFee: -100,
      takeFee: 500,
      a: BigNumber.from(10).pow(10),
      r: BigNumber.from(1001).mul(BigNumber.from(10).pow(15)),
      address: '0x410b33f656EE634B977BB1334E827d81d25E0Cb6',
    },
    {
      name: 'DAI/USDC',
      host: CLOBER_ADMIN[polygon.id],
      type: MARKET_TYPE.STABLE,
      quoteToken: TOKEN[polygon.id].USDC,
      baseToken: TOKEN[polygon.id].DAI,
      quoteUnit: BigNumber.from('1'),
      makeFee: -10,
      takeFee: 90,
      a: BigNumber.from(10).pow(14),
      d: BigNumber.from(10).pow(14),
      address: '0x4457d03FE38a8CE83591bc09eF5B4085b9c38117',
    },
  ],
  [arbitrum.id]: [
    {
      name: 'WETH/USDC',
      host: CLOBER_ADMIN[arbitrum.id],
      type: MARKET_TYPE.VOLATILE,
      quoteToken: TOKEN[arbitrum.id].USDC,
      baseToken: TOKEN[arbitrum.id].WETH,
      quoteUnit: BigNumber.from('1'),
      makeFee: -100,
      takeFee: 500,
      a: BigNumber.from(10).pow(10),
      r: BigNumber.from(1001).mul(BigNumber.from(10).pow(15)),
      address: '0xC3c5316AE6f1e522E65074b70608C1Df01F93AE0',
    },
    {
      name: 'DAI/USDC',
      host: CLOBER_ADMIN[arbitrum.id],
      type: MARKET_TYPE.STABLE,
      quoteToken: TOKEN[arbitrum.id].USDC,
      baseToken: TOKEN[arbitrum.id].DAI,
      quoteUnit: BigNumber.from('1'),
      makeFee: -10,
      takeFee: 90,
      a: BigNumber.from(10).pow(14),
      d: BigNumber.from(10).pow(14),
      address: '0x02F4DC911919AcB274ceA42DfEb3481C88E4D330',
    },
  ],
}

export const initialRegisteredQuoteTokens: { [network: string]: string[] } = {
  [mainnet.id]: [
    TOKEN[mainnet.id].USDC,
    TOKEN[mainnet.id].DAI,
    TOKEN[mainnet.id].USDT,
  ],
  [polygon.id]: [
    TOKEN[polygon.id].USDC,
    TOKEN[polygon.id].DAI,
    TOKEN[polygon.id].USDT,
  ],
  [arbitrum.id]: [
    TOKEN[arbitrum.id].USDC,
    TOKEN[arbitrum.id].DAI,
    TOKEN[arbitrum.id].USDT,
  ],
}
