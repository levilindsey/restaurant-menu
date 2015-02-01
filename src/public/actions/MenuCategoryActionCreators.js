/**
 * This module TODO.
 *
 * @module CategoryListActionCreators
 */

var MenuAppDispatcher = require('../dispatcher/MenuAppDispatcher');
var MenuConstants = require('../constants/MenuConstants');

var ActionTypes = MenuConstants.ActionTypes;

module.exports = {

  clickThread: function(threadID) {
    MenuAppDispatcher.handleViewAction({
      type: ActionTypes.CLICK_THREAD,
      threadID: threadID
    });
  }

};
