/**
 * This module specifies a component for lists of menu items.
 *
 * @module MenuItemsSection.react
 */

var React = require('react');
var MenuListItem = require('../MenuListItem/MenuListItem.react.js');
var MenuItemStore = require('../../stores/MenuItemStore');
var MenuCategoryStore = require('../../stores/MenuCategoryStore');

function _getStateFromStores() {
  return {
    menuItems: MenuItemStore.getAllForCurrentMenuCategory(),
    menuCategory: MenuCategoryStore.getCurrent()
  };
}

function _createMenuListItem(menuItem) {
  return (
    <MenuListItem
      key={menuItem.id}
      menuItem={menuItem}
    />
  );
}

var MenuItemsSection = React.createClass({

  getInitialState: function() {
    return _getStateFromStores();
  },

  componentDidMount: function() {
    MenuItemStore.addChangeListener(this._onChange);
    MenuCategoryStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    MenuItemStore.removeChangeListener(this._onChange);
    MenuCategoryStore.removeChangeListener(this._onChange);
  },

  render: function() {
    return (
      <div className="menu-items-section">
        <h2 className="menu-items-header">
          {this.state.menuCategory}
        </h2>
        <ul className="menu-items-list"
            ref="menuItemList">
          {this.state.menuItems.map(_createMenuListItem)}
        </ul>
      </div>
    );
  },

  /**
   * Event handler for 'change' events coming from the MenuItemStore
   */
  _onChange: function() {
    this.setState(_getStateFromStores());
  }

});

module.exports = MenuItemsSection;
