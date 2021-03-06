/**
 * @module middleware
 *
 * Sets up middleware functionality for the server.
 */

var config = require('../config/config');

/**
 * Sets up middleware for the server.
 *
 * @param {Object} server
 */
exports.init = function (server) {
  var morgan = require('morgan'), // For logging
      favicon = require('serve-favicon'), // For serving our favicon
      bodyParser = require('body-parser'), // For parsing urlencoded and json request bodies
      cookieParser = require('cookie-parser'),
      session = require('express-session'),
      staticFiles = require('./static-files');

  // Set up the templating engine
  server.set('views', __dirname);
  server.set('view engine', 'ejs');

  server.use(morgan('dev', {immediate: true}));
  server.use(favicon(config.faviconPath));
  server.use(bodyParser.json());
  server.use(cookieParser());
  if (config.environment === 'dev') {
    server.use(require('connect-livereload')({port: config.app.liveReloadPort}));
  }

  staticFiles.init(server);
};
