'use strict';
let _ = require('lodash');

let config = {};

let general = {
  app: {
    secret: process.env.SECRET || 'secret',
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'secret',
  },
  db: {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 27017,
    user: process.env.DB_USER || '',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'mail_sultan_api_node',
  },
};

let development = {
};

let production = {
};

_.assign(config, general);

if('development' === process.env.NODE_ENV) {
  _.assign(config, development);
}

if('production' === process.env.NODE_ENV) {
  _.assign(config, production);
}

module.exports = config;
