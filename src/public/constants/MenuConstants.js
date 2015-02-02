/**
 * This module defines various constants that are used for inter-component communication.
 *
 * @module MenuConstants
 */

var keyMirror = require('keymirror');

module.exports = {

  ActionTypes: keyMirror({
    CLICK_ADD_ITEM_TO_CART: null,
    CLICK_REMOVE_ITEM_FROM_CART: null,
    CLICK_CATEGORY_ITEM: null,
    CREATE_CART_ITEM: null,
    RECEIVE_MENU_ITEMS: null,
    RECEIVE_MENU_CATEGORIES: null,
    RECEIVE_RAW_CART_ITEMS: null,
    RECEIVE_CREATED_CART_ITEM: null
  }),

  PayloadSources: keyMirror({
    STORAGE_ACTION: null,
    VIEW_ACTION: null
  })

};
