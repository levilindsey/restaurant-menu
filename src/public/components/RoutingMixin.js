/**
 * This module defines a mixin for the top-level view-controller component to capture events meant to spawn route
 * changes and then redirects them into proper action dispatches. This manages the HTML5 history stack via
 * pushState/popState.
 *
 * This component is meant to be used as a mixin.
 *
 * This module was originally based off of a StackOverflow answer at http://stackoverflow.com/a/23636491/489568.
 *
 * @module RoutingMixin
 */

var React = require('react');
var RouteActionCreators = require('../actions/RouteActionCreators');

var RoutingMixin = {

  componentDidMount: function() {
    // Intercept all bubbled click events on the top-level app element
    this.getDOMNode().addEventListener('click', this._handleRouteClick, false);
    window.addEventListener('popstate', this._handlePopState, false);
  },

  componentWillUnmount: function() {
    this.getDOMNode().removeEventListener('click', this._handleRouteClick);
    window.removeEventListener('popstate', this._handlePopState);
  },

  handleRouteChange: function(newUrl, fromHistory) {
    RouteActionCreators.changeRoute(newUrl, fromHistory);
  },

  _handleRouteClick: function(event) {
    var href;
    var target = event.target;

    // Did the user click on an <a> tag?
    while(target && target.tagName !== 'A') {
      target = target.parentNode;
    }

    if (target) {
      // Don't intercept link events when the user is pressing a modifier key
      if (!event.altKey && !event.ctrlKey && !event.shiftKey && !event.metaKey) {
        event.preventDefault();

        href = target.attributes.href.value;
        this.handleRouteChange(href, false);
      }
    }
  },

  _isFirstCallToPopState: true,

  _handlePopState: function() {
    var path;

    // Some browsers call popState immediately after the page loads
    if (this._isFirstCallToPopState) {
      this._isFirstCallToPopState = false;
    } else {
      path = document.location.toString().replace(document.location.origin, '');
      this.handleRouteChange(path, true);
    }
  }

};

module.exports = RoutingMixin;
