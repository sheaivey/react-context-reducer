import combineActions from './combineActions';
var assert = require('assert');

describe('Testing combineActions', () => {
  let errorCount, errorMsg;
  const consoleError = console.error;
  before(() => {
    console.error = (val) => {
      errorCount++;
      errorMsg = val;
    };
  });

  after(() => {
    console.error = consoleError;
  });

  beforeEach(() => {
    errorCount = 0;
    errorMsg = undefined;
  });

  it('exported combineActions()', () => {
    assert.strict.equal(typeof combineActions, 'function');
  });
  it('verify combinedActions structure', () => {
    const asyncActions = {
      Loading: 'LOADING',
      Loaded: 'LOADED',
      Error: 'ERROR'
    };
    const syncActions = {
      Set: 'SET',
      Clear: 'CLEAR'
    };
    const combinedActions = combineActions({ asyncActions, syncActions });
    assert.strict.equal(typeof combinedActions.asyncActions, 'object');
    assert.strict.equal(combinedActions.asyncActions.Loading, 'LOADING');
    assert.strict.equal(combinedActions.asyncActions.Loaded, 'LOADED');
    assert.strict.equal(combinedActions.asyncActions.Error, 'ERROR');

    assert.strict.equal(typeof combinedActions.syncActions, 'object');
    assert.strict.equal(combinedActions.syncActions.Set, 'SET');
    assert.strict.equal(combinedActions.syncActions.Clear, 'CLEAR');
  });

  it('verify unique key warning message', () => {
    const actionsA = {
      Loading: 'LOADING'
    };
    const actionsB = {
      Loading: 'LOADING'
    };
    combineActions({ actionsA, actionsB });
    assert.strict.equal(errorCount, 1);
    assert.strict.equal(errorMsg, 'react-context-store: The action provided for key "actionsB.Loading" is not unique "LOADING". First seen here "actionsA.Loading" = "LOADING".');
  });

  it('verify undefined warning message', () => {
    const actionsA = undefined;
    const actionsB = {
      Loading: 'LOADING'
    };
    combineActions({ actionsA, actionsB });
    assert.strict.equal(errorCount, 1);
    assert.strict.equal(errorMsg, 'react-context-store: No actions provided for key "actionsA"');
  });

  it('verify non-object warning message', () => {
    const actionsA = 1;
    const actionsB = {
      Loading: 'LOADING'
    };
    combineActions({ actionsA, actionsB });
    assert.strict.equal(errorCount, 1);
    assert.strict.equal(errorMsg, 'react-context-store: The action provided for key "actionsA" is not a object.');
  });
});
