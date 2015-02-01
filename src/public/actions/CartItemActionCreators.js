/**
 * This module TODO.
 *
 * @module CartItemActionCreators
 */

var MenuAppDispatcher = require('../dispatcher/MenuAppDispatcher');
var MenuConstants = require('../constants/MenuConstants');
var ChatWebAPIUtils = require('../utils/ChatWebAPIUtils');
var MessageStore = require('../stores/MessageStore');

var ActionTypes = MenuConstants.ActionTypes;

module.exports = {

  createMessage: function(text) {
    MenuAppDispatcher.handleViewAction({
      type: ActionTypes.CREATE_MESSAGE,
      text: text
    });
    var message = MessageStore.getCreatedMessageData(text);
    ChatWebAPIUtils.createMessage(message);
  }

};
