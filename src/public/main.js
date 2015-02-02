/**
 * This module bootstraps the entire application.
 *
 * @module main
 */

// TODO: this should instead be set dynamically via the gulp/browserify build process
process.env.NODE_ENV = 'dev';

var React = require('react');
window.React = React; // export for http://fb.me/react-devtools

var MenuApp = require('./components/MenuApp/MenuApp.react.js');
var MenuStorageAPIUtils = require('./utils/MenuStorageAPIUtils');
var CartStorageAPIUtils = require('./utils/CartStorageAPIUtils');

// Load the menu data
MenuStorageAPIUtils.loadAllMenuCategories();
MenuStorageAPIUtils.loadAllMenuItems();

// Load any pre-existing cart data
CartStorageAPIUtils.loadAllCartItems();

window.addEventListener('load', renderApp, false);

function renderApp() {
  window.removeEventListener('load', renderApp);

  React.render(
    <MenuApp />,
    document.getElementById('react')
  );
}
