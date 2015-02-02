/**
 * This module defines semantic helper methods for the creation of actions relating to menu item storage.
 *
 * @module MenuStorageActionCreators
 */

var MenuAppDispatcher = require('../dispatcher/MenuAppDispatcher');
var MenuConstants = require('../constants/MenuConstants');

var ActionTypes = MenuConstants.ActionTypes;

module.exports = {

  /**
   * Notify the system that all menu items were retrieved successfully.
   *
   * @param {Array.<MenuItem>} menuItems
   */
  receiveAllItems: function(menuItems) {
    MenuAppDispatcher.handleStorageAction({
      type: ActionTypes.RECEIVE_MENU_ITEMS,
      menuItems: menuItems
    });
  },

  /**
   * Notify the system that all menu categories were retrieved successfully.
   *
   * @param {Array.<string>} menuCategories
   */
  receiveAllCategories: function(menuCategories) {
    MenuAppDispatcher.handleStorageAction({
      type: ActionTypes.RECEIVE_MENU_CATEGORIES,
      menuCategories: menuCategories
    });
  }

};
