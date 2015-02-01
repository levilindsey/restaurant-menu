/**
 * This module specifies the top-level view-controller component.
 *
 * @module MenuApp.react
 */

var MenuItemsSection = require('./MenuItemsSection.react');
var React = require('react');
var MenuCategoriesSection = require('./MenuCategoriesSection.react');

var MenuApp = React.createClass({

  render: function() {
    return (
      <div className="menu-app">
        <MenuCategoriesSection />
        <MenuItemsSection />
      </div>
    );
  }

});

module.exports = MenuApp;
