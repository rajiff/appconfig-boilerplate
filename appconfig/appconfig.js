const path = require('path');
const extend = require('util')._extend;

const defaults = {
  SERVER_ROOT: path.resolve(__dirname, '../'),
  NODE_ENV: process.env.NODE_ENV
};

const appConfig = {
  development: extend(require('./env/DEV'), defaults),
  test: extend(require('./env/TEST'), defaults),
  production: extend(require('./env/PROD'), defaults)
};

let env = process.env.NODE_ENV || 'development';

process.stdout.write(`\nConfiguring for environment: ${env}`);

const effectiveConfig = appConfig[env];

process.stdout.write(`\nconfig settings: ${JSON.stringify(effectiveConfig)}\n`);

module.exports = effectiveConfig;
