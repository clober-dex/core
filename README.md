# Clober Core Contracts

[![Docs](https://img.shields.io/badge/docs-%F0%9F%93%84-blue)](https://docs.clober.io/)
[![codecov](https://codecov.io/gh/clober-dex/core/branch/dev/graph/badge.svg?token=QNSGDYQOL7)](https://codecov.io/gh/clober-dex/core)
[![CI status](https://github.com/clober-dex/core/actions/workflows/ci.yaml/badge.svg)](https://github.com/clober-dex/core/actions/workflows/ci.yaml)

Core Contract of Clober DEX

## Audits
Audited by [Spearbit](https://github.com/spearbit) from January to February 2023. All security risks are fixed. Full report is available [here](audits/SpearbitDAO2023Feb.pdf).

## Licensing

- The primary license for Clober Core is the Time-delayed Open Source Software Licence, see [License file](LICENSE.pdf).
- All files in [`contracts/interfaces`](contracts/interfaces) may also be licensed under GPL-2.0-or-later (as indicated in their SPDX headers), see [LICENSE_GPL](contracts/interfaces/LICENSE_GPL).
- [`contracts/utils/ReentrancyGuard.sol`](contracts/utils/ReentrancyGuard.sol) file is licensed under AGPL-3.0-only (as indicated in their SPDX headers), see [LICENSE_APGL](contracts/utils/LICENSE_APGL).
- [`contracts/utils/BoringERC20.sol`](contracts/utils/BoringERC20.sol) file is licensed under MIT (as indicated in their SPDX headers).
