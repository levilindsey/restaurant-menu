/**
 * This module specifies a component for lists of menu items.
 *
 * @module MenuItemsSection.react
 */

var MenuListItem = require('./MenuListItem.react');
var MenuItemStore = require('../stores/MenuItemStore');
var React = require('react');
var MenuCategoryStore = require('../stores/MenuCategoryStore');

function getStateFromStores() {
  return {
    menuItems: MenuItemStore.getAllForCurrentMenuSection(),
    menuCategory: MenuCategoryStore.getCurrent()
  };
}

function createMenuListItem(menuItem) {
  return (
    <MenuListItem
      key={menuItem.id}
      menuItem={menuItem}
    />
  );
}

var MenuSection = React.createClass({

  getInitialState: function() {
    return getStateFromStores();
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
        <h3 className="menu-items-header">
          {this.state.menuCategory.name}
        </h3>
        <ul className="menu-items-list"
            ref="menuItemList">
          {this.state.menuItems.map(createMenuListItem)}
        </ul>
      </div>
    );
  },

  /**
   * Event handler for 'change' events coming from the MenuItemStore
   */
  _onChange: function() {
    this.setState(getStateFromStores());
  }

});

module.exports = MenuSection;
