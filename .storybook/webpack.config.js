const path = require('path');

module.exports = async ({ config, mode }) => {
  // `mode` has a value of 'DEVELOPMENT' or 'PRODUCTION'

  // Make whatever fine-grained changes you need
  config.resolve.alias["react-context-reducer"] = path.resolve(__dirname, "../src/index.js")

  // Return the altered config
  return config;
};
