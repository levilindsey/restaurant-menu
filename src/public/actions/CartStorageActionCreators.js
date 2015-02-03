/**
 * This module defines semantic helper methods for the creation of actions relating to cart item storage.
 *
 * @module CartStorageActionCreators
 */

var MenuAppDispatcher = require('../dispatcher/MenuAppDispatcher');
var MenuConstants = require('../constants/MenuConstants');

var ActionTypes = MenuConstants.ActionTypes;

module.exports = {

  /**
   * Notify the system that all cart items were retrieved successfully.
   *
   * @param {Array.<RawCartItem>} rawCartItems
   */
  receiveAll: function(rawCartItems) {
    MenuAppDispatcher.handleStorageAction({
      type: ActionTypes.RECEIVE_RAW_CART_ITEMS,
      rawCartItems: rawCartItems
    });
  },

  /**
   * Notify the system that the cart item was added/removed successfully.
   *
   * @param {CartItem} updatedCartItem
   */
  updateCart: function(updatedCartItem) {
    MenuAppDispatcher.handleStorageAction({
      type: ActionTypes.CART_UPDATED,
      cartItem: updatedCartItem
    });
  }

};
