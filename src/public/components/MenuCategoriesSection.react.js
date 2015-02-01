/**
 * This module specifies a component for lists of menu categories.
 *
 * @module MenuCategoriesSection.react
 */

var React = require('react');
var MessageStore = require('../stores/MessageStore');
var MenuCategoryListItem = require('../components/MenuCategoryListItem.react');
var MenuCategoryStore = require('../stores/MenuCategoryStore');
var UnreadMenuCategoryStore = require('../stores/UnreadMenuCategoryStore');

function getStateFromStores() {
  return {
    threads: MenuCategoryStore.getAllChrono(),
    currentMenuCategoryID: MenuCategoryStore.getCurrentID(),
    unreadCount: UnreadMenuCategoryStore.getCount()
  };
}

var MenuCategorySection = React.createClass({

  getInitialState: function() {
    return getStateFromStores();
  },

  componentDidMount: function() {
    MenuCategoryStore.addChangeListener(this._onChange);
    UnreadMenuCategoryStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    MenuCategoryStore.removeChangeListener(this._onChange);
    UnreadMenuCategoryStore.removeChangeListener(this._onChange);
  },

  render: function() {
    var menuCategoryItems = this.state.threads.map(function(thread) {
      return (
        <MenuCategoryListItem
          key={thread.id}
          thread={thread}
          currentMenuCategoryID={this.state.currentMenuCategoryID}
        />
      );
    }, this);
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
    this.setState(getStateFromStores());
  }

});

module.exports = MenuCategorySection;
