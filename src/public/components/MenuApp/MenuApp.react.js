/**
 * This module specifies the top-level view-controller component.
 *
 * @module MenuApp.react
 */

var React = require('react');

var MenuRoutes = require('../../constants/MenuRoutes');
var RouteStore = require('../../stores/RouteStore');
var RoutingMixin = require('../../components/RoutingMixin');
var MenuHeader = require('../MenuHeader/MenuHeader.react');

var CartRoute = require('../../routes/CartRoute/CartRoute.react');
var CheckOutRoute = require('../../routes/CheckOutRoute/CheckOutRoute.react');
var HomeRoute = require('../../routes/HomeRoute/HomeRoute.react');

function _getStateFromStores() {
  return {
    currentRoute: RouteStore.currentRoute,
    currentRouteParams: RouteStore.currentParams
  };
}

function _getRouteComponent(route) {
  switch(route) {
    case MenuRoutes.Routes.HOME:
      return <HomeRoute />;
    case MenuRoutes.Routes.CART:
      return <CartRoute />;
    case MenuRoutes.Routes.CHECK_OUT:
      return <CheckOutRoute />;
    default:
      throw new Error('Route not recognized: ' + route);
  }
}

var MenuApp = React.createClass({
  mixins: [RoutingMixin],

  getInitialState: function() {
    return _getStateFromStores();
  },

  componentDidMount: function() {
    RouteStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    RouteStore.removeChangeListener(this._onChange);
  },

  render: function() {
    var routeSection = _getRouteComponent(this.state.currentRoute);

    return (
      <div className="menu-app">
        <MenuHeader />

        {routeSection}

        <footer>
          © 2015 Ristorante Italiano
        </footer>
      </div>
    );
  },

  /**
   * Event handler for 'change' events coming from the RouteStore
   */
  _onChange: function() {
    this.setState(_getStateFromStores());
  }

});

module.exports = MenuApp;
