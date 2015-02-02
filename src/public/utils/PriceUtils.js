/**
 * This module defines utility logic for parsing price values.
 *
 * @module PriceUtils
 */

module.exports = {

  /**
   * @param {number} price
   * @returns {string}
   */
  formatPrice: function(price) {
    return '$' + price.toFixed(2);
  }

};
