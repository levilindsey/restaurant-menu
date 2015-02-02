/**
 * This module specifies a component for individual menu items.
 *
 * @module MenuListItem.react
 */

var React = require('react');
var MenuItemActionCreators = require('../../actions/MenuItemActionCreators');

var ReactPropTypes = React.PropTypes;

var MenuListItem = React.createClass({

  propTypes: {
    menuItem: ReactPropTypes.object
  },

  render: function() {
    var menuItem = this.props.menuItem;
    return (
      <li className="menu-list-item">
        <img src={menuItem.imageUrl} />
        <div className="text">
          <div className="header">
            <div className="title">
              {menuItem.title}
            </div>
            <div className="price">
              {menuItem.price}
            </div>
          </div>
          <div className="body">
            <div className="description">
              {menuItem.description}
            </div>
            <button onClick={this._handleAddToCartClick}>
              Add to Cart
            </button>
          </div>
        </div>
      </li>
    );
  },

  _handleAddToCartClick: function() {
    MenuItemActionCreators.clickAddItemToCart(this.props.menuItem);
  }

});

module.exports = MenuListItem;
