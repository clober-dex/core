// SPDX-License-Identifier: GPL-2.0-or-later

pragma solidity ^0.8.0;

interface CloberPriceBook {
    /**
     * @return The biggest price book index supported.
     */
    function maxPriceIndex() external view returns (uint16);

    // TODO
    function priceUpperBound() external view returns (uint256);

    /**
     * @dev Converts the price index into the actual price.
     * @param priceIndex The price book index.
     * @return price The actual price.
     */
    function indexToPrice(uint16 priceIndex) external view returns (uint256);

    /**
     * @dev Returns the price book index closest to the provided price.
     * @param price Provided price.
     * @param roundingUp Determines whether to round up or down.
     * @return index The price book index.
     * @return correctedPrice The actual price for the price book index.
     */
    function priceToIndex(uint256 price, bool roundingUp) external view returns (uint16 index, uint256 correctedPrice);
}
