/**
 * This module defines a flux store that handles menu items.
 *
 * @module MenuItemStore
 */

/**
 * A representation of a menu item, including a unique ID and the name of the category it is in.
 * @typedef {object} MenuItem
 * @property {string} id
 * @property {string} categoryName
 * @property {string} title
 * @property {string} description
 * @property {number} price
 * @property {string} imageUrl
 */

/**
 * The original representation of a menu item from the example data collection.
 * @typedef {object} RawMenuItem
 * @property {string} title
 * @property {string} description
 * @property {number} price
 * @property {string} imageUrl
 */

var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var MenuAppDispatcher = require('../dispatcher/MenuAppDispatcher');
var MenuConstants = require('../constants/MenuConstants');
var MenuCategoryStore = require('../stores/MenuCategoryStore');

var ActionTypes = MenuConstants.ActionTypes;
var CHANGE_EVENT = 'change';

var _menuItems = {};

/**
 * @param {Array.<MenuItem>} menuItems
 * @private
 */
function _addMenuItems(menuItems) {
  _menuItems = menuItems.reduce(function(menuItems, menuItem) {
    menuItems[menuItem.id] = menuItem;
    return menuItems;
  }, {});
}

var MenuItemStore = assign({}, EventEmitter.prototype, {

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  /**
   * @param {function} callback
   */
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  /**
   * @param {string} id
   * @returns {MenuItem}
   */
  get: function(id) {
    return _menuItems[id];
  },

  /**
   * @returns {object}
   */
  getAll: function() {
    // Convert from an object to an array
    return Object.keys(_menuItems).map(function(key) {
      return _menuItems[key];
    });
  },

  /**
   * @param {string} categoryName
   * @returns {Array.<MenuItem>}
   */
  getAllForMenuCategory: function(categoryName) {
    return Object.keys(_menuItems)
      .reduce(function (categoryMenuItems, menuItemId) {
        var menuItem = _menuItems[menuItemId];
        if (menuItem.categoryName === categoryName) {
          categoryMenuItems.push(menuItem);
        }
        return categoryMenuItems;
      }, []);
  },

  /**
   * @returns {Array.<MenuItem>}
   */
  getAllForCurrentMenuCategory: function() {
    return this.getAllForMenuCategory(MenuCategoryStore.getCurrent());
  }

});

MenuItemStore.dispatchToken = MenuAppDispatcher.register(function(payload) {
  var action = payload.action;

  switch(action.type) {

    case ActionTypes.RECEIVE_MENU_ITEMS:
      _addMenuItems(action.menuItems);
      MenuItemStore.emitChange();
      break;

    default:
      // Do nothing
  }

});

module.exports = MenuItemStore;
