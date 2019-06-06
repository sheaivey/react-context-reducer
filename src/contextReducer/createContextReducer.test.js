import createContextReducer from './createContextReducer';
var assert = require('assert');

describe('Testing createContextReducer', () => {
  it('exported createContextReducer()', () => {
    assert.strict.equal(typeof createContextReducer, 'function');
  });
});
