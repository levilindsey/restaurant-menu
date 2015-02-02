/**
 * This module defines utility logic for retrieving the menu-item data.
 *
 * By defining the storage/retrieval logic separately from the actual flux store, we can easily later update how this
 * data is stored--e.g., on the server, in local storage, in session storage, within cookies, etc.
 *
 * With the current implementation, the menu item data is actually hard-coded into a JavaScript module, which is then
 * bundled together with the rest of the app. This allows us to cleanly define the menu data separately from the menu
 * item templates and not make an additional request for the data. However, a future implementation could improve
 * further on this situation by building the menu list component from the data+template on the server before sending
 * it to the client.
 *
 * @module MenuStorageAPIUtils
 */

var assign = require('object-assign');
var MenuStorageActionCreators = require('../actions/MenuStorageActionCreators');
var _rawMenuItems = require('../MenuItemData');

module.exports = {

  loadAllMenuItems: function() {
    var menuItems = [];

    // Convert from RawMenuItems to MenuItems (i.e., add id and categoryName properties)
    _rawMenuItems.forEach(function(category) {
      category.items.forEach(function(rawMenuItem) {
        menuItems.push(assign({}, rawMenuItem, {
          id: rawMenuItem.title, // NOTE: this is dependent on the fact that no two menu items currently share the same title
          categoryName: category.title
        }));
      });
    });

    MenuStorageActionCreators.receiveAllItems(menuItems);
  },

  loadAllMenuCategories: function() {
    var categories = _rawMenuItems.map(function(category) {
      return category.title;
    });

    MenuStorageActionCreators.receiveAllCategories(categories);
  }

};
