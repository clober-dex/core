# Clober

[![Docs](https://img.shields.io/badge/docs-%F0%9F%93%84-blue)](https://docs.clober.io/)
[![codecov](https://codecov.io/gh/clober-dex/core/branch/dev/graph/badge.svg?token=QNSGDYQOL7)](https://codecov.io/gh/clober-dex/core)
[![CI status](https://github.com/clober-dex/core/actions/workflows/test.yaml/badge.svg)](https://github.com/clober-dex/core/actions/workflows/test.yaml)
[![Discord](https://img.shields.io/static/v1?logo=discord&label=discord&message=Join&color=blue)](https://discord.gg/clober)
[![Twitter](https://img.shields.io/static/v1?logo=twitter&label=twitter&message=Follow&color=blue)](https://twitter.com/CloberDEX)

Core Contract of Clober DEX

## Table of Contents

- [Clober](#clober)
    - [Table of Contents](#table-of-contents)
    - [Deployments](#deployments)
    - [Install](#install)
    - [Usage](#usage)
        - [Unit Tests](#unit-tests)
        - [Integration Tests](#integration-tests)
        - [Coverage](#coverage)
        - [Linting](#linting)
    - [Audits](#audits)
    - [Licensing](#licensing)

## Deployments

### Deployments By EVM Chain

|                 | MarketFactory                                                                                                                   | MarketRouter                                                                                                                    | OrderCanceler                                                                                                                   |  
|-----------------|---------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------|
| Ethereum        | [`0x93A43391978BFC0bc708d5f55b0Abe7A9ede1B91`](https://etherscan.io/address/0x93A43391978BFC0bc708d5f55b0Abe7A9ede1B91#code)    | [`0x6d928455050b3b71490fe3B73DD84daD094299c4`](https://etherscan.io/address/0x6d928455050b3b71490fe3B73DD84daD094299c4#code)    | [`0x99228D1823baFa822dAB2B2f0a02922082f25E9E`](https://etherscan.io/address/0x99228D1823baFa822dAB2B2f0a02922082f25E9E#code)    |
| Polygon         | [`0x93A43391978BFC0bc708d5f55b0Abe7A9ede1B91`](https://polygonscan.com/address/0x93A43391978BFC0bc708d5f55b0Abe7A9ede1B91#code) | [`0x6d928455050b3b71490fe3B73DD84daD094299c4`](https://polygonscan.com/address/0x6d928455050b3b71490fe3B73DD84daD094299c4#code) | [`0x99228D1823baFa822dAB2B2f0a02922082f25E9E`](https://polygonscan.com/address/0x99228D1823baFa822dAB2B2f0a02922082f25E9E#code) |
| Arbitrum        | [`0x93A43391978BFC0bc708d5f55b0Abe7A9ede1B91`](https://arbiscan.io/address/0x93A43391978BFC0bc708d5f55b0Abe7A9ede1B91#code)     | [`0x6d928455050b3b71490fe3B73DD84daD094299c4`](https://arbiscan.io/address/0x6d928455050b3b71490fe3B73DD84daD094299c4#code)     | [`0x99228D1823baFa822dAB2B2f0a02922082f25E9E`](https://arbiscan.io/address/0x99228D1823baFa822dAB2B2f0a02922082f25E9E#code)     |

## Install

To install dependencies and compile contracts:

### Prerequisites
- We use [Forge Foundry](https://github.com/foundry-rs/foundry) for test. Follow the [guide](https://github.com/foundry-rs/foundry#installation) to install Foundry.

### Installing From Source

```bash
git clone https://github.com/clober-dex/core && cd core
npm install
```

## Usage

### Unit tests
```bash
npm run test:unit:forge
```

### Integration tests
```bash
npm run test:limit:forge  # Run Limit Order Integration Tests
npm run test:market:forge # Run Market Order Integration Tests
npm run test:claim:forge  # Run Claim Order Integration Tests
npm run test:cancel:forge # Run Cancel Order Integration Tests
```

### Coverage
To run coverage profile:
```bash
npm run coverage:local
open coverage/index.html
```

### Linting

To run lint checks:
```bash
npm run prettier:ts
npm run lint:sol
```

To run lint fixes:
```bash
npm run prettier:fix:ts
npm run lint:fix:sol
```

## Audits
Audited by [Spearbit](https://github.com/spearbit) from January to February 2023. All security risks are fixed. Full report is available [here](audits/SpearbitDAO2023Feb.pdf).

## Licensing

- The primary license for Clober Core is the Time-delayed Open Source Software Licence, see [License file](LICENSE.pdf).
- All files in [`contracts/interfaces`](contracts/interfaces) may also be licensed under GPL-2.0-or-later (as indicated in their SPDX headers), see [LICENSE_GPL](contracts/interfaces/LICENSE_GPL).
- [`contracts/utils/ReentrancyGuard.sol`](contracts/utils/ReentrancyGuard.sol) file is licensed under AGPL-3.0-only (as indicated in their SPDX headers), see [LICENSE_APGL](contracts/utils/LICENSE_APGL).
- [`contracts/utils/BoringERC20.sol`](contracts/utils/BoringERC20.sol) file is licensed under MIT (as indicated in their SPDX headers).
