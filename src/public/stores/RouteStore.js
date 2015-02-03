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
_router.add(MenuRoutes.RouteDescriptions);

var RouteStore = assign({}, EventEmitter.prototype, {

  currentRoute: MenuRoutes.Default.handler.name,
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
      //var results = _router.recognize(href);
      //
      //// Was this recognized as a valid front-end route?
      //if (results && results.length) {
      //  this.currentRoute = results[0].handler.name;
      //  this.currentParams = results[0].params;
      //
      //  if (!fromHistory) {
      //    history.pushState(href, '', href);
      //  }
      //} else {
      //  // Handle default/page-missing re-directs
      //  console.info('URL matched no routes: redirecting to default route', href);
      //  // TODO: fix the _router.recognize() logic; right now, there is a bug where no route is recognized
      //  //this.handleChangeUrl(MenuRoutes.Default.path, fromHistory);
      //}

      // TODO: this is a hack to handle a bug I couldn't figure out at the moment
      var results =
        href === '/home' ?
          [{handler: {name: 'HOME'}, path: '/home'}] :
          href === '/cart' ?
            [{handler: {name: 'CART'}, path: '/cart'}] :
            href === '/check-out' ?
              [{handler: {name: 'CHECK_OUT'}, path: '/check-out'}] :
              null;

      // Was this recognized as a valid front-end route?
      if (results && results.length) {
        this.currentRoute = results[0].handler.name;
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
