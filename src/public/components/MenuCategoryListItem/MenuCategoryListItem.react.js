/**
 * This module specifies a component for individual menu categories.
 *
 * @module MenuCategoryListItem.react
 */

var React = require('react');
var cx = require('react/lib/cx');
var MenuCategoryItemActionCreators = require('../../actions/MenuCategoryItemActionCreators');

var ReactPropTypes = React.PropTypes;

var MenuCategoryListItem = React.createClass({

  propTypes: {
    categoryName: ReactPropTypes.string,
    currentMenuCategoryName: ReactPropTypes.string
  },

  render: function() {
    var categoryName = this.props.categoryName;
    return (
      <li
        className={cx({
          'menu-category-list-item': true,
          'active': categoryName === this.props.currentMenuCategoryName
        })}
        onClick={this._handleClick}>
        {categoryName}
      </li>
    );
  },

  _handleClick: function() {
    MenuCategoryItemActionCreators.clickCategoryItem(this.props.categoryName);
  }

});

module.exports = MenuCategoryListItem;
