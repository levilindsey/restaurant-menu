/**
 * This module specifies a component for the home route.
 *
 * @module HomeRoute.react
 */

var React = require('react');
var MenuCategoriesSection = require('../../components/MenuCategoriesSection/MenuCategoriesSection.react');
var MenuItemsSection = require('../../components/MenuItemsSection/MenuItemsSection.react');

var HomeRoute = React.createClass({

  render: function() {
    return (
      <section id="home-route">
        <MenuCategoriesSection />
        <MenuItemsSection />
      </section>
    );
  }

});

module.exports = HomeRoute;
