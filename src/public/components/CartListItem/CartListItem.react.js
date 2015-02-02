/**
 * This module specifies a component for individual cart items.
 *
 * @module CartListItem.react
 */

var React = require('react');
var CartItemActionCreators = require('../../actions/CartItemActionCreators');

var ReactPropTypes = React.PropTypes;

var MessageListItem = React.createClass({

  propTypes: {
    cartItem: ReactPropTypes.object
  },

  render: function() {
    var cartItem = this.props.cartItem;
    return (
      <li className="cart-list-item">
        <div className="title">
          {cartItem.menuItem.title}
        </div>
        <button onClick={this._handleRemoveFromCartClick}>
          Remove from Cart
        </button>
      </li>
    );
  },

  _handleRemoveFromCartClick: function() {
    CartItemActionCreators.clickRemoveItemFromCart(this.props.cartItem);
  }

});

module.exports = MessageListItem;
