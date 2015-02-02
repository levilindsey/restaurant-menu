/**
 * This module defines semantic helper methods for the creation of actions relating to menu item components.
 *
 * @module MenuItemActionCreators
 */

var MenuAppDispatcher = require('../dispatcher/MenuAppDispatcher');
var MenuConstants = require('../constants/MenuConstants');

var ActionTypes = MenuConstants.ActionTypes;

module.exports = {

  clickAddItemToCart: function(menuItem) {
    MenuAppDispatcher.handleViewAction({
      type: ActionTypes.CLICK_ADD_ITEM_TO_CART,
      menuItem: menuItem
    });
  }

};
