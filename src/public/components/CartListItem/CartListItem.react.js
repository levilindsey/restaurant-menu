/**
 * This module specifies a component for individual cart items.
 *
 * @module CartListItem.react
 */

var React = require('react');
var CartItemActionCreators = require('../../actions/CartItemActionCreators');
var PriceUtils = require('../../utils/PriceUtils');

var ReactPropTypes = React.PropTypes;

var MessageListItem = React.createClass({

  propTypes: {
    cartItem: ReactPropTypes.object
  },

  render: function() {
    var menuItem = this.props.cartItem.menuItem;
    return (
      // TODO: this is almost identical to the template in MenuListItem; refactor this template out into a shared sub-view
      <li className="cart-list-item">
        <img src={menuItem.imageUrl} />
        <div className="text">
          <div className="header">
            <div className="title">
              {menuItem.title}
            </div>
            <div className="price">
              {PriceUtils.formatPrice(menuItem.price)}
            </div>
          </div>
          <div className="body">
            <div className="description">
              {menuItem.description}
            </div>
            <button onClick={this._handleRemoveFromCartClick}>
              Remove from Cart
            </button>
          </div>
        </div>
      </li>
    );
  },

  _handleRemoveFromCartClick: function() {
    CartItemActionCreators.clickRemoveItemFromCart(this.props.cartItem);
  }

});

module.exports = MessageListItem;
