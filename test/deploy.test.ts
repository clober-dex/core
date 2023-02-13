import fs from 'fs'
import path from 'path'

import hre from 'hardhat'

describe('Test Dev deploy script', () => {
  after(async () => {
    fs.rmSync(path.join(__dirname, '../deployments/hardhat/', 'address.json'))
  })

  it('should run all scripts', async () => {
    await hre.run('dev:deploy-all')
  })
})
