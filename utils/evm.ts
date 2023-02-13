import { getHRE } from './misc'

export const snapshots = new Map<string, string>()

export const evmSnapshot = async (): Promise<string> => {
  const hre = getHRE()
  return hre.ethers.provider.send('evm_snapshot', [])
}

export const evmRevert = async (id: string): Promise<void> => {
  const hre = getHRE()
  // id is consumed when user call `evm_revert`
  await hre.ethers.provider.send('evm_revert', [id])
}

export const setSnapshot = async (name: string): Promise<void> => {
  snapshots.set(name, await evmSnapshot())
}

export const getSnapshot = async (name: string): Promise<void> => {
  const id = snapshots.get(name)
  await evmRevert(id || '1')
}
