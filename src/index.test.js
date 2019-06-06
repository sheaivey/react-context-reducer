import {
  createContextReducer,
  combineReducers,
  combineActions,
  dispatchLogger
} from './index';
var assert = require('assert');

describe('Testing index exports', () => {
  it('exported createContextReducer()', () => {
    assert.strict.equal(!!createContextReducer, true);
  });
  it('exported combineReducers()', () => {
    assert.strict.equal(!!combineReducers, true);
  });
  it('exported combineActions()', () => {
    assert.strict.equal(!!combineActions, true);
  });
  it('exported dispatchLogger()', () => {
    assert.strict.equal(!!dispatchLogger, true);
  });
});
