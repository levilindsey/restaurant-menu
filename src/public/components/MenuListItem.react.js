/**
 * This module specifies a component for individual menu items.
 *
 * @module MenuListItem.react
 */

var React = require('react');

var ReactPropTypes = React.PropTypes;

var MenuListItem = React.createClass({

  propTypes: {
    menuItem: ReactPropTypes.object
  },

  render: function() {
    var menuItem = this.props.menuItem;
    return (
      <li className="menu-list-item">
        <div className="title">{menuItem.title}</div>
        <div className="price">{menuItem.price}</div>
        <img src="{menuItem.imageUrl}" />
        <div className="description">{menuItem.description}</div>
      </li>
    );
  }

});

module.exports = MenuListItem;
