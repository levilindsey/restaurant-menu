/**
 * This module specifies a component for lists of cart items.
 *
 * @module CartItemsSection.react
 */

var React = require('react');
var CartListItem = require('./../CartListItem/CartListItem.react.js');
var CartStore = require('../../stores/CartStore');

function _getStateFromStores() {
  return {
    cartItems: CartStore.getAll()
  };
}

function _getCartListItem(cartItem) {
  return (
    <CartListItem
      key={cartItem.id}
      cartItem={cartItem}
    />
  );
}

var CartItemsSection = React.createClass({

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
    var cartItems = this.state.cartItems.map(_getCartListItem);
    return (
      <ul className="cart-items-list"
          ref="cartList">
        {cartItems}
      </ul>
    );
  },

  /**
   * Event handler for 'change' events coming from the CartStore
   */
  _onChange: function() {
    this.setState(_getStateFromStores());
  }

});

module.exports = CartItemsSection;
