/**
 * This module defines semantic helper methods for the creation of actions relating to routing events.
 *
 * @module RouteActionCreators
 */

var MenuAppDispatcher = require('../dispatcher/MenuAppDispatcher');
var MenuConstants = require('../constants/MenuConstants');

var ActionTypes = MenuConstants.ActionTypes;

module.exports = {

  changeRoute: function(newUrl, fromHistory) {
    MenuAppDispatcher.handleViewAction({
      type: ActionTypes.CHANGE_ROUTE,
      newUrl: newUrl,
      fromHistory: fromHistory
    });
  }

};
