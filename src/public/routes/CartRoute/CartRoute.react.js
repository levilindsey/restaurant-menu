/**
 * This module specifies a component for the cart route.
 *
 * @module CartRoute.react
 */

var React = require('react');
var CartItemsSection = require('../../components/CartItemsSection/CartItemsSection.react');

var CartRoute = React.createClass({

  render: function() {
    return (
      <section id="cart-route">
        <button className="check-out">
          <a href="/check-out">
            Check Out
          </a>
        </button>
        <CartItemsSection />
      </section>
    );
  }

});

module.exports = CartRoute;
