import { BigNumber, BigNumberish, utils } from 'ethers'
import { HardhatRuntimeEnvironment } from 'hardhat/types'
import { hardhat } from '@wagmi/chains'

let HRE: HardhatRuntimeEnvironment | undefined
export const getHRE = (): HardhatRuntimeEnvironment => {
  if (!HRE) {
    HRE = require('hardhat')
  }
  return HRE as HardhatRuntimeEnvironment
}

export const liveLog = (str: string): void => {
  if (getHRE().network.name !== hardhat.name) {
    console.log(str)
  }
}

export const bn2StrWithPrecision = (bn: BigNumber, precision: number): string => {
  const prec = BigNumber.from(10).pow(precision)
  const q = bn.div(prec)
  const r = bn.mod(prec)
  return q.toString() + '.' + r.toString().padStart(precision, '0')
}

export const convertToDateString = (utc: BigNumber): string => {
  return new Date(utc.toNumber() * 1000).toLocaleDateString('ko-KR', {
    year: '2-digit',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })
}

export const sleep = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export const strToBytes32 = (str: string): string => {
  return utils.formatBytes32String(str)
}

export const computeCreate1Address = (origin: string, nonce: BigNumber): string => {
  let packedData: string
  if (nonce.eq(BigNumber.from('0x00'))) {
    packedData = utils.solidityPack(['bytes1', 'bytes1', 'address', 'bytes1'], ['0xd6', '0x94', origin, '0x80'])
  } else if (nonce.lte(BigNumber.from('0x7f'))) {
    packedData = utils.solidityPack(
      ['bytes1', 'bytes1', 'address', 'bytes1'],
      ['0xd6', '0x94', origin, nonce.toHexString()],
    )
  } else if (nonce.lte(BigNumber.from('0xff'))) {
    packedData = utils.solidityPack(
      ['bytes1', 'bytes1', 'address', 'bytes1', 'uint8'],
      ['0xd7', '0x94', origin, '0x81', nonce.toHexString()],
    )
  } else if (nonce.lte(BigNumber.from('0xffff'))) {
    packedData = utils.solidityPack(
      ['bytes1', 'bytes1', 'address', 'bytes1', 'uint16'],
      ['0xd8', '0x94', origin, '0x82', nonce.toHexString()],
    )
  } else if (nonce.lte(BigNumber.from('0xffffff'))) {
    packedData = utils.solidityPack(
      ['bytes1', 'bytes1', 'address', 'bytes1', 'uint24'],
      ['0xd9', '0x94', origin, '0x83', nonce.toHexString()],
    )
  } else if (nonce.lte(BigNumber.from('0xffffffff'))) {
    packedData = utils.solidityPack(
      ['bytes1', 'bytes1', 'address', 'bytes1', 'uint32'],
      ['0xda', '0x94', origin, '0x84', nonce.toHexString()],
    )
  } else if (nonce.lte(BigNumber.from('0xffffffffff'))) {
    packedData = utils.solidityPack(
      ['bytes1', 'bytes1', 'address', 'bytes1', 'uint40'],
      ['0xdb', '0x94', origin, '0x85', nonce.toHexString()],
    )
  } else if (nonce.lte(BigNumber.from('0xffffffffffff'))) {
    packedData = utils.solidityPack(
      ['bytes1', 'bytes1', 'address', 'bytes1', 'uint48'],
      ['0xdc', '0x94', origin, '0x86', nonce.toHexString()],
    )
  } else if (nonce.lte(BigNumber.from('0xffffffffffffff'))) {
    packedData = utils.solidityPack(
      ['bytes1', 'bytes1', 'address', 'bytes1', 'uint56'],
      ['0xdd', '0x94', origin, '0x87', nonce.toHexString()],
    )
  } else if (nonce.lt(BigNumber.from('0xffffffffffffffff'))) {
    packedData = utils.solidityPack(
      ['bytes1', 'bytes1', 'address', 'bytes1', 'uint64'],
      ['0xde', '0x94', origin, '0x88', nonce.toHexString()],
    )
  } else {
    // Cannot deploy contract when the nonce is type(uint64).max
    throw new Error('MAX_NONCE')
  }
  return '0x' + utils.keccak256(packedData).slice(-40)
}

export function randomBigNumber(): BigNumber
export function randomBigNumber(max: BigNumberish): BigNumber
export function randomBigNumber(min: BigNumberish, max: BigNumberish): BigNumber
export function randomBigNumber(min?: BigNumberish, max?: BigNumberish): BigNumber {
  if (!max) {
    max = min
    min = undefined
  }
  if (!min) {
    min = BigNumber.from(0)
  }
  if (!max) {
    max = BigNumber.from(2).pow(256).sub(1)
  }
  return BigNumber.from(utils.randomBytes(32)).mod(BigNumber.from(max).sub(min)).add(min)
}

export const generateRandoms = (min: number, max: number, numOfRandoms: number): number[] => {
  const getRandom = (x: number, y: number) => {
    return Math.floor(Math.random() * (y - x + 1) + x)
  }
  const randoms = []
  while (randoms.length < numOfRandoms) {
    const random = getRandom(min, max)
    if (randoms.indexOf(random) === -1) {
      randoms.push(random)
    }
  }
  return randoms
}

export class UsefulMap<K, V> extends Map<K, V> {
  constructor(...initValues: [K, V][]) {
    super()
    for (const initValue of initValues) {
      this.set(initValue[0], initValue[1])
    }
  }

  mustGet(key: K): V {
    const value = this.get(key)
    if (!value) {
      throw new Error(`UsefulMap mustGet failed`)
    }
    return value
  }

  async forEachAsync(callbackfn: (value: V, key: K, map: UsefulMap<K, V>) => Promise<void>): Promise<void> {
    for (const [key, value] of this.entries()) {
      await callbackfn(value, key, this)
    }
  }
}
