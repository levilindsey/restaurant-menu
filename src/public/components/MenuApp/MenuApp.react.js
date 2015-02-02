/**
 * This module specifies the top-level view-controller component.
 *
 * @module MenuApp.react
 */

var React = require('react');
var MenuHeader = require('../MenuHeader/MenuHeader.react.js');
var MenuCategoriesSection = require('../MenuCategoriesSection/MenuCategoriesSection.react.js');
var MenuItemsSection = require('../MenuItemsSection/MenuItemsSection.react.js');

var MenuApp = React.createClass({

  render: function() {
    return (
      <div className="menu-app">
        <MenuHeader />

        <section>
          <MenuCategoriesSection />
          <MenuItemsSection />
        </section>

        <footer>
          © 2015 Ristorante Italiano
        </footer>
      </div>
    );
  }

});

module.exports = MenuApp;
