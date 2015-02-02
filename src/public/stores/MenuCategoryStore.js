/**
 * This module defines a flux store that handles menu categories.
 *
 * @module MenuCategoryStore
 */

var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var MenuAppDispatcher = require('../dispatcher/MenuAppDispatcher');
var MenuConstants = require('../constants/MenuConstants');

var ActionTypes = MenuConstants.ActionTypes;
var CHANGE_EVENT = 'change';

var _categories = [];
var _currentCategory = null;

var MenuCategoryStore = assign({}, EventEmitter.prototype, {

  /**
   * @param {Array.<string>} categories
   */
  init: function(categories) {
    _categories = categories.slice(0);
    _currentCategory = _categories[0];
  },

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
   * @param {string} categoryName
   */
  get: function(categoryName) {
    return _categories[categoryName];
  },

  getAll: function() {
    return _categories;
  },

  getCurrent: function() {
    return _currentCategory;
  }

});

MenuCategoryStore.dispatchToken = MenuAppDispatcher.register(function(payload) {
  var action = payload.action;

  switch(action.type) {

    case ActionTypes.CLICK_CATEGORY_ITEM:
      _currentCategory = action.categoryName;
      MenuCategoryStore.emitChange();
      break;

    case ActionTypes.RECEIVE_MENU_CATEGORIES:
      MenuCategoryStore.init(action.menuCategories);
      MenuCategoryStore.emitChange();
      break;

    default:
      // Do nothing
  }

});

module.exports = MenuCategoryStore;
