/**
 * This module specifies a component for the checkout route.
 *
 * @module CheckOutRoute.react
 */

var React = require('react');

var CheckOutRoute = React.createClass({

  render: function() {
    return (
      <section id="check-out-route">
        <h2 className="check-out-header">
          Check Out
        </h2>
        <form onSubmit={this._handleSubmit}>
          <div>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" placeholder="Your Name" />
          </div>

          <div>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" placeholder="your@email.com" />
          </div>

          <div>
            <label htmlFor="address">Address:</label>
            <input type="text" id="address" placeholder="Your address" />
          </div>

          <div>
            <label htmlFor="cc">Credit Card:</label>
            <input type="text" id="cc" placeholder="1234 5678 1234 5678" />
          </div>

          <div>
            <button type="submit">Send Order</button>
          </div>
        </form>
      </section>
    );
  },

  _handleSubmit: function() {
    alert('fluc yeah!');
  }

});

module.exports = CheckOutRoute;
