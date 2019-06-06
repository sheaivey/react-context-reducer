import combineActions from './combineActions';
var assert = require('assert');

describe('Testing combineActions', () => {
  it('exported combineActions()', () => {
    assert.strict.equal(typeof combineActions, 'function');
  });
});
