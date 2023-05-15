import {
  arbitrum,
  arbitrumGoerli,
  mainnet,
  polygon,
  polygonZkEvm,
  polygonZkEvmTestnet,
  zkSyncTestnet,
} from '@wagmi/chains'

export const MARKET_TYPE = {
  NONE: 0,
  VOLATILE: 0,
  STABLE: 1,
}

export const CLOBER_ADMIN: { [network: string]: string } = {
  [mainnet.id]: '0xa8a05ED6Ab403e1D2b90D2e5050ed0a1f98b11be',
  [arbitrum.id]: '0x290D9de8d51fDf4683Aa761865743a28909b2553',
  [polygon.id]: '0xF4155c2a753B4f5e001357d3a81169245b374FCf',
  [polygonZkEvm.id]: '0x39F0b609aA86E1474B1afb228Be3E29338B4983B',
}

export const CLOBER_DAO_TREASURY: { [network: string]: string } = {
  [mainnet.id]: '0xD91012FCd663E9636afA20ff29cF3ed3090A137f',
  [arbitrum.id]: '0xc60eb261CD031F7ccf4b6cbd9ae677E11456A22a',
  [polygon.id]: '0x309bCc19DC4d8F4c31312DF2BEFb3b2821646e7f',
  [polygonZkEvm.id]: '0x1bA77cd6E9b5213E1bA468Ce498A26E1AD0782Bc',
}

export const TOKEN = {
  [mainnet.id]: {
    WETH: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
    USDC: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
    DAI: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
    USDT: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
  },
  [arbitrum.id]: {
    ARB: '0x912ce59144191c1204e64559fe8253a0e49e6548',
    plsARB: '0x7a5D193fE4ED9098F7EAdC99797087C96b002907',
    WETH: '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1',
    USDC: '0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8',
    DAI: '0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1',
    USDT: '0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9',
    EUROe: '0xcF985abA4647a432E60efcEeB8054BBd64244305',
    Arbitrum$0_5PutOption: '0x0e7fc8F067470424589Cc25DceEd0dA9a1a8E72A',
    Arbitrum$1PutOption: '0x4ed2804b5409298290654D665619c7b092297dB2',
    Arbitrum$2PutOption: '0x9d940825498Ac26182bb682491544EcFDb74FDe0',
    Arbitrum$4PutOption: '0x1C37b78A9aacaF5CD418481C2cB8859555A75C5F',
    Arbitrum$8PutOption: '0xb3fBFA4047BB1dd8bD354E3D6E15E94c75E62178',
    Arbitrum$16PutOption: '0x9f17503a60830a660AB059a7E7eacA1E7e8C4eFD',
  },
  [polygon.id]: {
    WMATIC: '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270',
    USDC: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
    DAI: '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063',
    WETH: '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619',
    USDT: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F',
  },
  [zkSyncTestnet.id]: {
    WETH: '0x4F0577E9684e5e7c0A87e35f2b6EA88bb14E3be4',
    USDC: '0x0faF6df7054946141266420b43783387A78d82A9',
    DAI: '0x3e7676937A7E96CFB7616f255b9AD9FF47363D4b',
  },
  [arbitrumGoerli.id]: {
    ARB: '0xd2a46071A279245b25859609C3de9305e6D5b3F2',
    WETH: '0xe39Ab88f8A4777030A534146A9Ca3B52bd5D43A3',
    CUSD: '0xf3F8E2d3ab08BD619A794A85626970731c4174aA',
    DAI: '0x57710D5CBF5231D6c7ED7ca3E6D4132D95AE7d96',
    CLOB: '0x5E86396Bb0eC915c2ab1980d9453Fa8924803223',
  },
  [polygonZkEvmTestnet.id]: {
    CUSD: '0x4d7E15fc589EbBF7EDae1B5236845b3A42D412B7',
    DAI: '0x56398abB6ffBAFD035E598C9139cB78E8e110fAB',
    CLOB: '0xc2f0e04cCC89D73Db18BA83810c34CbB6B33E440',
    MANGO: '0x1c1f6B8d0e4D83347fCA9fF16738DF482500EeA5',
  },
  [polygonZkEvm.id]: {
    MANGO: '0x1fA03eDB1B8839a5319A7D2c1Ae6AAE492342bAD',
    WETH: '0x4F9A0e7FD2Bf6067db6994CF12E4495Df938E6e9',
    MATIC: '0xa2036f0538221a77A3937F1379699f44945018d0',
    USDC: '0xA8CE8aee21bC2A48a5EF670afCc9274C7bbbC035',
  },
}
