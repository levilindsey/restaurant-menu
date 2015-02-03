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
  addCartItem: function(cartItem) {
    // Create a serialized version of the cart item for storage
    var rawCartItem = _serializeCartItem(cartItem);

    // Store the cart item
    _rawCartItems.push(rawCartItem);
    localStorage.setItem('cartItems', JSON.stringify(_rawCartItems));

    setTimeout(function() {
      // Notify the system that the cart item was stored successfully
      CartStorageActionCreators.updateCart(cartItem);
    }, 0);
  },

  /**
   * @param {CartItem} cartItem
   */
  removeCartItem: function(cartItem) {
    var i, count;

    // Remove the matching cart item
    for (i = 0, count = _rawCartItems.length; i < count; i +=1 ) {
      if (_rawCartItems[i].id === cartItem.id) {
        _rawCartItems.splice(i, 1);
        break;
      }
    }

    // Store the updated cart list
    localStorage.setItem('cartItems', JSON.stringify(_rawCartItems));

    setTimeout(function() {
      // Notify the system that the cart item was removed successfully
      CartStorageActionCreators.updateCart(cartItem);
    }, 0);
  }

};
