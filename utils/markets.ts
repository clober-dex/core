import { BigNumber } from 'ethers'

import { CLOBER_ADMIN, MARKET_TYPE, NETWORK, TOKEN } from './constant'

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
  [NETWORK.GOERLI_DEV]: [
    {
      name: 'fBANANA/fUSD-volatile',
      host: '0x5F79EE8f8fA862E98201120d83c4eC39D9468D49',
      type: MARKET_TYPE.VOLATILE,
      quoteToken: '0x9185a3225d18A6a79756a8273Da88Eb4d5E51FC1', // fUSD
      baseToken: '0x112A6563dd7e272037Fd75af7c002D0113a48277', // fBANANA
      quoteUnit: BigNumber.from('100'),
      makeFee: -200,
      takeFee: 400,
      a: BigNumber.from(10).pow(10),
      r: BigNumber.from(1001).mul(BigNumber.from(10).pow(15)),
      address: '0x8fFb9b698f34fFeAeDE715beB66b8c7Ebcf28719',
    },
    {
      name: 'fTT/fUSD-volatile',
      host: '0x5F79EE8f8fA862E98201120d83c4eC39D9468D49',
      type: MARKET_TYPE.VOLATILE,
      quoteToken: '0x9185a3225d18A6a79756a8273Da88Eb4d5E51FC1', // fUSD
      baseToken: '0xa035463c491951714C3AB0B3CC65E9c2F45404A9', // fTT
      quoteUnit: BigNumber.from('10'),
      makeFee: 200,
      takeFee: 400,
      a: BigNumber.from(10).pow(10),
      r: BigNumber.from(1001).mul(BigNumber.from(10).pow(15)),
      address: '0x648607752c173dF27041098eD450db15a576b3a3',
    },
    {
      name: 'fUST/fUSD-stable1',
      host: '0x5F79EE8f8fA862E98201120d83c4eC39D9468D49',
      type: MARKET_TYPE.STABLE,
      quoteToken: '0x9185a3225d18A6a79756a8273Da88Eb4d5E51FC1', // fUSD
      baseToken: '0x290cA20A1953a39f31a93209B8183f7E0A40fEFc', // fUST
      quoteUnit: BigNumber.from('1'),
      makeFee: -40,
      takeFee: 60,
      a: BigNumber.from(10).pow(14),
      d: BigNumber.from(10).pow(14),
      address: '0xbA09f423Eb5FD32bb6e38515843556EdFA2E13c3',
    },
    {
      name: 'fUST/fUSD-stable2',
      host: '0x5F79EE8f8fA862E98201120d83c4eC39D9468D49',
      type: MARKET_TYPE.STABLE,
      quoteToken: '0x9185a3225d18A6a79756a8273Da88Eb4d5E51FC1', // fUSD
      baseToken: '0x290cA20A1953a39f31a93209B8183f7E0A40fEFc', // fUST
      quoteUnit: BigNumber.from('10'),
      makeFee: 40,
      takeFee: 60,
      a: BigNumber.from(10).pow(14),
      d: BigNumber.from(10).pow(14),
      address: '0x2705917fc0240C3b017349c2793ab1f28BCD5954',
    },
    {
      name: 'WETH/fUSD-volatile1',
      host: '0x5F79EE8f8fA862E98201120d83c4eC39D9468D49',
      type: MARKET_TYPE.VOLATILE,
      quoteToken: '0x9185a3225d18A6a79756a8273Da88Eb4d5E51FC1', // fUSD
      baseToken: '0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6', // WETH
      quoteUnit: BigNumber.from('1000'),
      makeFee: -200,
      takeFee: 400,
      a: BigNumber.from(10).pow(10),
      r: BigNumber.from(1001).mul(BigNumber.from(10).pow(15)),
      address: '0xd3Ba11dAd79B847158727b42DebeaFF57094c2AA',
    },
    {
      name: 'WETH/fUSD-volatile2',
      host: '0x5F79EE8f8fA862E98201120d83c4eC39D9468D49',
      type: MARKET_TYPE.VOLATILE,
      quoteToken: '0x9185a3225d18A6a79756a8273Da88Eb4d5E51FC1', // fUSD
      baseToken: '0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6', // WETH
      quoteUnit: BigNumber.from('10000'),
      makeFee: 200,
      takeFee: 400,
      a: BigNumber.from(10).pow(10),
      r: BigNumber.from(1001).mul(BigNumber.from(10).pow(15)),
      address: '0xa30B76D78AfB392cE2FF6b8bb13014F2FeAc0d53',
    },
  ],
  [NETWORK.POLYGON_DEV]: [
    {
      name: 'fBANANA/fUSD-volatile',
      host: '0x5F79EE8f8fA862E98201120d83c4eC39D9468D49',
      type: MARKET_TYPE.VOLATILE,
      quoteToken: '0x591d4A99d7A53947Cd65C12dDba1bad8b4FEd00a', // fUSD
      baseToken: '0x6696912AA244449920564528da1C732fD8242065', // fBANANA
      quoteUnit: BigNumber.from('100'),
      makeFee: -200,
      takeFee: 400,
      a: BigNumber.from(10).pow(10),
      r: BigNumber.from(1001).mul(BigNumber.from(10).pow(15)),
      address: '0x54E15286f5864567E0d3aDa418aC8F381ebF2Bfb',
    },
    {
      name: 'fTT/fUSD-volatile',
      host: '0x5F79EE8f8fA862E98201120d83c4eC39D9468D49',
      type: MARKET_TYPE.VOLATILE,
      quoteToken: '0x591d4A99d7A53947Cd65C12dDba1bad8b4FEd00a', // fUSD
      baseToken: '0x891c51587721F90c01Fe0DEa524D9eab5a4d413B', // fTT
      quoteUnit: BigNumber.from('10'),
      makeFee: 200,
      takeFee: 400,
      a: BigNumber.from(10).pow(10),
      r: BigNumber.from(1001).mul(BigNumber.from(10).pow(15)),
      address: '0x6e1cD728912Af4E2A7c8676B290Fb64B8C80A3Ef',
    },
    {
      name: 'fUST/fUSD-stable1',
      host: '0x5F79EE8f8fA862E98201120d83c4eC39D9468D49',
      type: MARKET_TYPE.STABLE,
      quoteToken: '0x591d4A99d7A53947Cd65C12dDba1bad8b4FEd00a', // fUSD
      baseToken: '0x76810BfCaea5F7f925ca9066853a70eE2a909DE1', // fUST
      quoteUnit: BigNumber.from('1'),
      makeFee: -40,
      takeFee: 60,
      a: BigNumber.from(10).pow(14),
      d: BigNumber.from(10).pow(14),
      address: '0x1e050E6A9B4B382EB3A322FBEAA7e1e0A8BD4A12',
    },
    {
      name: 'fUST/fUSD-stable2',
      host: '0x5F79EE8f8fA862E98201120d83c4eC39D9468D49',
      type: MARKET_TYPE.STABLE,
      quoteToken: '0x591d4A99d7A53947Cd65C12dDba1bad8b4FEd00a', // fUSD
      baseToken: '0x76810BfCaea5F7f925ca9066853a70eE2a909DE1', // fUST
      quoteUnit: BigNumber.from('10'),
      makeFee: 40,
      takeFee: 60,
      a: BigNumber.from(10).pow(14),
      d: BigNumber.from(10).pow(14),
      address: '0x1E330a2C92A0E728BE452e164F97e5e24ACbD48a',
    },
    {
      name: 'WMATIC/fUSD-volatile1',
      host: '0x5F79EE8f8fA862E98201120d83c4eC39D9468D49',
      type: MARKET_TYPE.VOLATILE,
      quoteToken: '0x591d4A99d7A53947Cd65C12dDba1bad8b4FEd00a', // fUSD
      baseToken: '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270', // WMATIC
      quoteUnit: BigNumber.from('1000'),
      makeFee: -200,
      takeFee: 400,
      a: BigNumber.from(10).pow(10),
      r: BigNumber.from(1001).mul(BigNumber.from(10).pow(15)),
      address: '0x0cA2BA22080dC67F3Cd1Acf60dC09496Aa652e82',
    },
    {
      name: 'WMATIC/fUSD-volatile2',
      host: '0x5F79EE8f8fA862E98201120d83c4eC39D9468D49',
      type: MARKET_TYPE.VOLATILE,
      quoteToken: '0x591d4A99d7A53947Cd65C12dDba1bad8b4FEd00a', // fUSD
      baseToken: '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270', // WMATIC
      quoteUnit: BigNumber.from('10000'),
      makeFee: 200,
      takeFee: 400,
      a: BigNumber.from(10).pow(10),
      r: BigNumber.from(1001).mul(BigNumber.from(10).pow(15)),
      address: '0x003062216d918c0b2ED5F02B0Bf27EF11839edB7',
    },
  ],
  [NETWORK.ARBITRUM_GOERLI_DEV]: [
    {
      name: 'fBANANA/fUSD-volatile',
      host: '0x5F79EE8f8fA862E98201120d83c4eC39D9468D49',
      type: MARKET_TYPE.VOLATILE,
      quoteToken: '0x86563F1D8Afd3f9abAEC8B09B56103BE38F19AF7', // fUSD
      baseToken: '0xa3CC662732e4ae2a2e0156859B7Fbcd57936723c', // fBANANA
      quoteUnit: BigNumber.from('100'),
      makeFee: -200,
      takeFee: 400,
      a: BigNumber.from(10).pow(10),
      r: BigNumber.from(1001).mul(BigNumber.from(10).pow(15)),
      address: '0x2eA46E76DE955498c4dd4a91F8B0e919F299466B',
    },
    {
      name: 'fTT/fUSD-volatile',
      host: '0x5F79EE8f8fA862E98201120d83c4eC39D9468D49',
      type: MARKET_TYPE.VOLATILE,
      quoteToken: '0x86563F1D8Afd3f9abAEC8B09B56103BE38F19AF7', // fUSD
      baseToken: '0x05494E258e7165333e7EAaF9c3E6ef32A1a801D5', // fTT
      quoteUnit: BigNumber.from('10'),
      makeFee: 200,
      takeFee: 400,
      a: BigNumber.from(10).pow(10),
      r: BigNumber.from(1001).mul(BigNumber.from(10).pow(15)),
      address: '0x77E0977a98977963814CAa3963A1428dCa248ad1',
    },
    {
      name: 'fUST/fUSD-stable1',
      host: '0x5F79EE8f8fA862E98201120d83c4eC39D9468D49',
      type: MARKET_TYPE.STABLE,
      quoteToken: '0x86563F1D8Afd3f9abAEC8B09B56103BE38F19AF7', // fUSD
      baseToken: '0xd811BcE4c00A4803204b501Ff987bBaC272A875B', // fUST
      quoteUnit: BigNumber.from('1'),
      makeFee: -40,
      takeFee: 60,
      a: BigNumber.from(10).pow(14),
      d: BigNumber.from(10).pow(14),
      address: '0x45bd4aa9ecc1B7f8d282183eb0A9Cf554c2dB696',
    },
    {
      name: 'fUST/fUSD-stable2',
      host: '0x5F79EE8f8fA862E98201120d83c4eC39D9468D49',
      type: MARKET_TYPE.STABLE,
      quoteToken: '0x86563F1D8Afd3f9abAEC8B09B56103BE38F19AF7', // fUSD
      baseToken: '0xd811BcE4c00A4803204b501Ff987bBaC272A875B', // fUST
      quoteUnit: BigNumber.from('10'),
      makeFee: 40,
      takeFee: 60,
      a: BigNumber.from(10).pow(14),
      d: BigNumber.from(10).pow(14),
      address: '0xaa6f412caA3F7976393dCD54D6D4b49C6BE83437',
    },
    {
      name: 'WETH/fUSD-volatile1',
      host: '0x5F79EE8f8fA862E98201120d83c4eC39D9468D49',
      type: MARKET_TYPE.VOLATILE,
      quoteToken: '0x86563F1D8Afd3f9abAEC8B09B56103BE38F19AF7', // fUSD
      baseToken: '0xFF7645fcf101E80C6FC44F4C4c42Ab6064d6e816', // WETH
      quoteUnit: BigNumber.from('1000'),
      makeFee: -200,
      takeFee: 400,
      a: BigNumber.from(10).pow(10),
      r: BigNumber.from(1001).mul(BigNumber.from(10).pow(15)),
      address: '0x791618900d16A59FccAF1148e49fC886f108Cbf3',
    },
    {
      name: 'WETH/fUSD-volatile2',
      host: '0x5F79EE8f8fA862E98201120d83c4eC39D9468D49',
      type: MARKET_TYPE.VOLATILE,
      quoteToken: '0x86563F1D8Afd3f9abAEC8B09B56103BE38F19AF7', // fUSD
      baseToken: '0xFF7645fcf101E80C6FC44F4C4c42Ab6064d6e816', // WETH
      quoteUnit: BigNumber.from('10000'),
      makeFee: 200,
      takeFee: 400,
      a: BigNumber.from(10).pow(10),
      r: BigNumber.from(1001).mul(BigNumber.from(10).pow(15)),
      address: '0xff26958F6d527E788fd787443c903F30C4D74772',
    },
  ],
  [NETWORK.ETHEREUM]: [
    {
      name: 'WETH/USDC',
      host: CLOBER_ADMIN[NETWORK.ETHEREUM],
      type: MARKET_TYPE.VOLATILE,
      quoteToken: TOKEN[NETWORK.ETHEREUM].USDC,
      baseToken: TOKEN[NETWORK.ETHEREUM].WETH,
      quoteUnit: BigNumber.from('1'),
      makeFee: -100,
      takeFee: 500,
      a: BigNumber.from(10).pow(10),
      r: BigNumber.from(1001).mul(BigNumber.from(10).pow(15)),
      address: '0xFBfd6eA54C50cb48ecAD02dB2Cf167daFdC81355',
    },
    {
      name: 'DAI/USDC',
      host: CLOBER_ADMIN[NETWORK.ETHEREUM],
      type: MARKET_TYPE.STABLE,
      quoteToken: TOKEN[NETWORK.ETHEREUM].USDC,
      baseToken: TOKEN[NETWORK.ETHEREUM].DAI,
      quoteUnit: BigNumber.from('1'),
      makeFee: -10,
      takeFee: 90,
      a: BigNumber.from(10).pow(14),
      d: BigNumber.from(10).pow(14),
      address: '0x1c230Df6364af81d1585C3B3e6aC5aaD2daD9bD9',
    },
  ],
  [NETWORK.POLYGON]: [
    {
      name: 'WETH/USDC',
      host: CLOBER_ADMIN[NETWORK.POLYGON],
      type: MARKET_TYPE.VOLATILE,
      quoteToken: TOKEN[NETWORK.POLYGON].USDC,
      baseToken: TOKEN[NETWORK.POLYGON].WETH,
      quoteUnit: BigNumber.from('1'),
      makeFee: -100,
      takeFee: 500,
      a: BigNumber.from(10).pow(10),
      r: BigNumber.from(1001).mul(BigNumber.from(10).pow(15)),
      address: '0x6EF4dBa10BE9A64fC8A4BD74d613999787488666',
    },
    {
      name: 'WMATIC/USDC',
      host: CLOBER_ADMIN[NETWORK.POLYGON],
      type: MARKET_TYPE.VOLATILE,
      quoteToken: TOKEN[NETWORK.POLYGON].USDC,
      baseToken: TOKEN[NETWORK.POLYGON].WMATIC,
      quoteUnit: BigNumber.from('1'),
      makeFee: -100,
      takeFee: 500,
      a: BigNumber.from(10).pow(10),
      r: BigNumber.from(1001).mul(BigNumber.from(10).pow(15)),
      address: '0x410b33f656EE634B977BB1334E827d81d25E0Cb6',
    },
    {
      name: 'DAI/USDC',
      host: CLOBER_ADMIN[NETWORK.POLYGON],
      type: MARKET_TYPE.STABLE,
      quoteToken: TOKEN[NETWORK.POLYGON].USDC,
      baseToken: TOKEN[NETWORK.POLYGON].DAI,
      quoteUnit: BigNumber.from('1'),
      makeFee: -10,
      takeFee: 90,
      a: BigNumber.from(10).pow(14),
      d: BigNumber.from(10).pow(14),
      address: '0x4457d03FE38a8CE83591bc09eF5B4085b9c38117',
    },
  ],
  [NETWORK.ARBITRUM]: [
    {
      name: 'WETH/USDC',
      host: CLOBER_ADMIN[NETWORK.ARBITRUM],
      type: MARKET_TYPE.VOLATILE,
      quoteToken: TOKEN[NETWORK.ARBITRUM].USDC,
      baseToken: TOKEN[NETWORK.ARBITRUM].WETH,
      quoteUnit: BigNumber.from('1'),
      makeFee: -100,
      takeFee: 500,
      a: BigNumber.from(10).pow(10),
      r: BigNumber.from(1001).mul(BigNumber.from(10).pow(15)),
      address: '0xC3c5316AE6f1e522E65074b70608C1Df01F93AE0',
    },
    {
      name: 'DAI/USDC',
      host: CLOBER_ADMIN[NETWORK.ARBITRUM],
      type: MARKET_TYPE.STABLE,
      quoteToken: TOKEN[NETWORK.ARBITRUM].USDC,
      baseToken: TOKEN[NETWORK.ARBITRUM].DAI,
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
  [NETWORK.ETHEREUM]: [
    TOKEN[NETWORK.ETHEREUM].USDC,
    TOKEN[NETWORK.ETHEREUM].DAI,
    TOKEN[NETWORK.ETHEREUM].USDT,
  ],
  [NETWORK.POLYGON]: [
    TOKEN[NETWORK.POLYGON].USDC,
    TOKEN[NETWORK.POLYGON].DAI,
    TOKEN[NETWORK.POLYGON].USDT,
  ],
  [NETWORK.ARBITRUM]: [
    TOKEN[NETWORK.ARBITRUM].USDC,
    TOKEN[NETWORK.ARBITRUM].DAI,
    TOKEN[NETWORK.ARBITRUM].USDT,
  ],
}
