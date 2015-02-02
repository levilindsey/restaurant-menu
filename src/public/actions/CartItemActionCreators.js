/**
 * This module defines semantic helper methods for the creation of actions relating to cart item components.
 *
 * @module CartItemActionCreators
 */

var MenuAppDispatcher = require('../dispatcher/MenuAppDispatcher');
var MenuConstants = require('../constants/MenuConstants');

var ActionTypes = MenuConstants.ActionTypes;

module.exports = {

  clickRemoveItemFromCart: function(cartItem) {
    MenuAppDispatcher.handleViewAction({
      type: ActionTypes.CLICK_REMOVE_ITEM_FROM_CART,
      cartItem: cartItem
    });
  }

};
