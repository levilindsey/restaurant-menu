/**
 * This module defines the various front-end routes that are used in this app.
 *
 * @module MenuRoutes
 */

var keyMirror = require('keymirror');

var Routes = keyMirror({
  HOME: null,
  CART: null,
  CHECK_OUT: null
});

var RouteDescriptions = [
  {path: '/home', handler: {name: Routes.HOME}},
  {path: '/cart', handler: {name: Routes.CART}},
  {path: '/check-out', handler: {name: Routes.CHECK_OUT}}
];

module.exports = {
  Routes: Routes,
  Default: RouteDescriptions[0],
  RouteDescriptions: RouteDescriptions
};

if(!Routes[module.exports.Default.handler.name]) {
  throw new Error('The default route matches none of the registered routes.');
}
