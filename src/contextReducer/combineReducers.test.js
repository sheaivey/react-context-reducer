import combineReducers from './combineReducers';
var assert = require('assert');

describe('Testing combineReducers', () => {
  it('exported combineReducers()', () => {
    assert.strict.equal(typeof combineReducers, 'function');
  });
});
