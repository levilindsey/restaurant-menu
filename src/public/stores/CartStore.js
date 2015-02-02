/**
 * This module defines a flux store that handles CartItems.
 *
 * @module CartStore
 */

/**
 * An record of a MenuItem that has been added to the cart.
 * @typedef {object} CartItem
 * @property {string} id
 * @property {Date} date
 * @property {MenuItem} menuItem
 */

/**
 * A serialized version of a CartItem.
 * @typedef {object} RawCartItem
 * @property {string} id
 * @property {number} timestamp
 * @property {string} menuItemID
 */

var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var MenuAppDispatcher = require('../dispatcher/MenuAppDispatcher');
var MenuConstants = require('../constants/MenuConstants');
var MenuItemStore = require('../stores/MenuItemStore');
var CartStorageAPIUtils = require('../utils/CartStorageAPIUtils');

var ActionTypes = MenuConstants.ActionTypes;
var CHANGE_EVENT = 'change';

var _cartItems = {};

/**
 * @param {Array.<RawCartItem>} rawCartItems
 */
function _addRawCartItems(rawCartItems) {
  _cartItems = rawCartItems.reduce(function(cartItems, rawCartItem) {
    cartItems[rawCartItem.id] = _deserializeRawCartItem(rawCartItem);
    return cartItems;
  }, {});
}

/**
 * @param {RawCartItem} rawCartItem
 * @returns {CartItem}
 */
function _deserializeRawCartItem(rawCartItem) {
  return {
    id: rawCartItem.id,
    categoryName: rawCartItem.categoryName,
    date: new Date(rawCartItem.timestamp),
    menuItem: MenuItemStore.get(rawCartItem.menuItemID)
  };
}

var CartStore = assign({}, EventEmitter.prototype, {

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
   * @returns {CartItem}
   */
  get: function(id) {
    return _cartItems[id];
  },

  /**
   * @returns {object}
   */
  getAll: function() {
    // Convert from an object to an array
    return Object.keys(_cartItems).map(function(key) {
      return _cartItems[key];
    });
  },

  /**
   * @param {MenuItem} menuItem
   * @returns {CartItem}
   */
  createCartItem: function(menuItem) {
    var timestamp = Date.now();
    return {
      id: 'ci_' + timestamp,
      date: new Date(timestamp),
      menuItem: menuItem
    };
  }

});

CartStore.dispatchToken = MenuAppDispatcher.register(function(payload) {
  var action = payload.action;

  switch(action.type) {

    case ActionTypes.CLICK_ADD_ITEM_TO_CART:
      var cartItem = CartStore.createCartItem(action.menuItem);
      // Optimistically store the cart item in the store (i.e., assume it will be stored successfully via the CartStorageAPIUtils)
      _cartItems[cartItem.id] = cartItem;
      CartStorageAPIUtils.storeCartItem(cartItem);
      CartStore.emitChange();
      break;

    case ActionTypes.RECEIVE_RAW_CART_ITEMS:
      _addRawCartItems(action.rawCartItems);
      CartStore.emitChange();
      break;

    default:
      // Do nothing
  }

});

module.exports = CartStore;
