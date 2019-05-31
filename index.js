if (process.env.NODE_ENV === 'production') {
  module.exports = require('./lib/react-context-reducer.prod.js');
} else {
  module.exports = require('./lib/react-context-reducer.dev.js');
}
