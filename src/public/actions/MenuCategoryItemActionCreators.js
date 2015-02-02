/**
 * This module defines semantic helper methods for the creation of actions relating to menu category components.
 *
 * @module MenuCategoryItemActionCreators
 */

var MenuAppDispatcher = require('../dispatcher/MenuAppDispatcher');
var MenuConstants = require('../constants/MenuConstants');

var ActionTypes = MenuConstants.ActionTypes;

module.exports = {

  clickCategoryItem: function(categoryName) {
    MenuAppDispatcher.handleViewAction({
      type: ActionTypes.CLICK_CATEGORY_ITEM,
      categoryName: categoryName
    });
  }

};
