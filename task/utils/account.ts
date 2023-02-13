import { task } from 'hardhat/config'
import { formatEther } from 'ethers/lib/utils'

task('utils:accounts', 'Prints the list of accounts').setAction(
  async (taskArgs, hre) => {
    const accounts = await hre.ethers.getSigners()

    for (const account of accounts) {
      console.log(account.address)
      console.log(formatEther(await account.getBalance()))
    }
  },
)
