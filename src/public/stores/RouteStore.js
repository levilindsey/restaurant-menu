/**
 * This module defines a flux store that handles route state.
 *
 * @module RouteStore
 */

var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var RouteRecognizer = require('route-recognizer');

var MenuAppDispatcher = require('../dispatcher/MenuAppDispatcher');
var MenuConstants = require('../constants/MenuConstants');
var MenuRoutes = require('../constants/MenuRoutes');

var ActionTypes = MenuConstants.ActionTypes;
var CHANGE_EVENT = 'change';

var _router = new RouteRecognizer();
_router.add(MenuRoutes);

var RouteStore = assign({}, EventEmitter.prototype, {

  currentRoute: MenuRoutes.Default.handler,
  currentParams: {},

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
   * This was originally based off of a StackOverflow answer at http://stackoverflow.com/a/23636491/489568.
   *
   * @param {string} href
   * @param {boolean} fromHistory
   */
  handleChangeUrl: function(href, fromHistory) {
    var isExternalUrl = /^https?:\/\//.test(href);

    // Links with a protocol simply change the location
    if (isExternalUrl) {
      document.location = href;
    } else {
      var results = this._router.recognize(href);

      // Was this recognized as a valid front-end route?
      if (results && results.length) {
        this.currentRoute = results[0].handler;
        this.currentParams = results[0].params;

        if (!fromHistory) {
          history.pushState(href, '', href);
        }
      } else {
        // Handle default/page-missing re-directs
        console.info('URL matched no routes: redirecting to default route', href);
        this.handleChangeUrl(MenuRoutes.Default.path, fromHistory);
      }
    }
  }

});

RouteStore.dispatchToken = MenuAppDispatcher.register(function(payload) {
  var action = payload.action;

  switch(action.type) {

    case ActionTypes.CHANGE_ROUTE:
      RouteStore.handleChangeUrl(action.newUrl, action.fromHistory);
      RouteStore.emitChange();
      break;

    default:
      // Do nothing
  }

});

module.exports = RouteStore;
