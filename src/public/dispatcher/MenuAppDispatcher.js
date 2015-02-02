/**
 * This module receives and re-directs inter-component messages for significant actions.
 *
 * @module MenuAppDispatcher
 */

var MenuConstants = require('../constants/MenuConstants');
var Dispatcher = require('flux').Dispatcher;
var assign = require('object-assign');

var PayloadSources = MenuConstants.PayloadSources;

var MenuAppDispatcher = assign(new Dispatcher(), {

  /**
   * @param {object} action The details of the action, including the action's type and additional data coming from the
   * server.
   */
  handleStorageAction: function(action) {
    var payload = {
      source: PayloadSources.STORAGE_ACTION,
      action: action
    };
    this.dispatch(payload);
  },

  /**
   * @param {object} action The details of the action, including the action's type and additional data coming from the
   * view.
   */
  handleViewAction: function(action) {
    var payload = {
      source: PayloadSources.VIEW_ACTION,
      action: action
    };
    this.dispatch(payload);
  }

});

module.exports = MenuAppDispatcher;
