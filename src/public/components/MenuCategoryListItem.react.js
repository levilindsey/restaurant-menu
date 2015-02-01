/**
 * This module specifies a component for individual menu categories.
 *
 * @module MenuCategoryListItem.react
 */

var MenuMenuCategoryActionCreators = require('../actions/MenuCategoryActionCreators');
var React = require('react');
var cx = require('react/lib/cx');

var ReactPropTypes = React.PropTypes;

var MenuCategoryListItem = React.createClass({

  propTypes: {
    menuCategory: ReactPropTypes.object,
    currentMenuCategoryID: ReactPropTypes.string
  },

  render: function() {
    var menuCategory = this.props.menuCategory;
    return (
      <li
        className={cx({
          'menu-category-list-item': true,
          'active': menuCategory.id === this.props.currentMenuCategoryID
        })}
        onClick={this._handleClick}>
        <h5 className="category-header">
          {menuCategory.name}
        </h5>
      </li>
    );
  },

  _handleClick: function() {
    MenuMenuCategoryActionCreators.clickMenuCategoryItem(this.props.menuCategory.id);
  }

});

module.exports = MenuCategoryListItem;
