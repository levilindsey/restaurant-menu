/**
 * This module specifies a component for the page header.
 *
 * @module MenuHeader.react
 */

var React = require('react');
var CartStore = require('../../stores/CartStore');
var PriceUtils = require('../../utils/PriceUtils');

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
    var price = this.state.cartItems.reduce(function(price, cartItem) {
      return price + cartItem.menuItem.price;
    }, 0);

    return (
      <header className="menu-header">
        <h1>
          <a href="/home">
            Ristorante Italiano
          </a>
        </h1>
        <button
          className="cart-count">
          <a href="/cart">
            <div>
              Cart: {count} item{suffix}
            </div>
            <div>
              ({PriceUtils.formatPrice(price)})
            </div>
          </a>
        </button>
      </header>
    );
  },

  /**
   * Event handler for 'change' events coming from the CartStore
   */
  _onChange: function() {
    this.setState(_getStateFromStores());
  }

});

module.exports = MenuHeader;
