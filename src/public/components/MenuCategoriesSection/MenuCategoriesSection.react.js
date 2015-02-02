/**
 * This module specifies a component for lists of menu categories.
 *
 * @module MenuCategoriesSection.react
 */

var React = require('react');
var MenuCategoryListItem = require('../MenuCategoryListItem/MenuCategoryListItem.react.js');
var MenuCategoryStore = require('../../stores/MenuCategoryStore');

function _getStateFromStores() {
  return {
    categories: MenuCategoryStore.getAll(),
    currentMenuCategoryName: MenuCategoryStore.getCurrent()
  };
}

function _getMenuCategoryItem(currentMenuCategoryName, categoryName) {
  return (
    <MenuCategoryListItem
      key={categoryName}
      categoryName={categoryName}
      currentMenuCategoryName={currentMenuCategoryName}
    />
  );
}

var MenuCategoriesSection = React.createClass({

  getInitialState: function() {
    return _getStateFromStores();
  },

  componentDidMount: function() {
    MenuCategoryStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    MenuCategoryStore.removeChangeListener(this._onChange);
  },

  render: function() {
    var menuCategoryItems =
      this.state.categories.map(
        _getMenuCategoryItem.bind(null, this.state.currentMenuCategoryName));

    return (
      <ul className="menu-category-list">
        {menuCategoryItems}
      </ul>
    );
  },

  /**
   * Event handler for 'change' events coming from the stores
   */
  _onChange: function() {
    this.setState(_getStateFromStores());
  }

});

module.exports = MenuCategoriesSection;
