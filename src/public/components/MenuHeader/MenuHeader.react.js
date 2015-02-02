/**
 * This module specifies a component for the page header.
 *
 * @module MenuHeader.react
 */

var React = require('react');
var CartStore = require('../../stores/CartStore');

function _getStateFromStores() {
  return {
    cartItems: CartStore.getAll()
  };
}

var MenuHeader = React.createClass({

  getInitialState: function() {
    return _getStateFromStores();
  },

  componentDidMount: function() {
    CartStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    CartStore.removeChangeListener(this._onChange);
  },

  render: function() {
    var count = this.state.cartItems.length;
    var suffix = count !== 1 ? 's' : '';

    return (
      <header className="menu-header">
        <h1>
          Ristorante Italiano
        </h1>
        <button
          className="cart-count"
          onClick={this._handleCartCountClick}>
          Cart: {count} item{suffix}
        </button>
      </header>
    );
  },

  _handleCartCountClick: function() {
    // TODO: transition to cart route
  },

  /**
   * Event handler for 'change' events coming from the CartStore
   */
  _onChange: function() {
    this.setState(_getStateFromStores());
  }

});

module.exports = MenuHeader;
