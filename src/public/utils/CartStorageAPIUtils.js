/**
 * This module defines utility logic for retrieving and storing the cart data.
 *
 * By defining the storage/retrieval logic separately from the actual flux store, we can easily later update how this
 * data is stored--e.g., on the server, in local storage, in session storage, within cookies, etc.
 *
 * @module CartStorageAPIUtils
 */

var CartStorageActionCreators = require('../actions/CartStorageActionCreators');

var _rawCartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');

/**
 * @param {CartItem} cartItem
 * @returns {RawCartItem}
 */
function _serializeCartItem(cartItem) {
  return {
    id: cartItem.id,
    timestamp: cartItem.date.getTime(),
    menuItemID: cartItem.menuItem.id
  };
}

module.exports = {

  loadAllCartItems: function() {
    // Notify the system that all cart items were retrieved successfully
    CartStorageActionCreators.receiveAll(_rawCartItems);
  },

  /**
   * @param {CartItem} cartItem
   */
  storeCartItem: function(cartItem) {
    // Create a serialized version of the cart item for storage
    var rawCartItem = _serializeCartItem(cartItem);

    // Store the cart item
    _rawCartItems.push(rawCartItem);
    localStorage.setItem('cartItems', JSON.stringify(_rawCartItems));

    setTimeout(function() {
      // Notify the system that the cart item was stored successfully
      CartStorageActionCreators.receiveCreatedCartItem(cartItem);
    }, 0);
  }

};
