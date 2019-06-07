import combineReducers from './combineReducers';
var assert = require('assert');

const ACTION_INIT = '@@INIT';
describe('Testing combineReducers', () => {
  let combinedReducer;
  const reducerA = (state = 'reducerA', action) => {
    if (action.type !== ACTION_INIT) {
      return 'reducerA/' + action.type;
    }
    return state;
  };
  const reducerB = (state = 'reducerB', action) => {
    if (action.type !== ACTION_INIT) {
      return 'reducerB/' + action.type;
    }
    return state;
  };
  const reducerC = (state = 'reducerC') => {
    return state;
  };

  beforeEach(() => {
    combinedReducer = combineReducers({ reducerA, reducerB, reducerC });
  });

  it('exported combineReducers()', () => {
    assert.strict.equal(typeof combineReducers, 'function');
  });

  it('All reducers should return initial state.', () => {
    const initialState = combinedReducer(undefined, { type: '@@INIT' });
    assert.strict.equal(typeof initialState, 'object');
    assert.strict.equal(initialState.reducerA, 'reducerA');
    assert.strict.equal(initialState.reducerB, 'reducerB');
    assert.strict.equal(initialState.reducerC, 'reducerC');
  });

  it('All reducers should process or ignore the action.', () => {
    const state = {
      reducerA: 'A',
      reducerB: 'B',
      reducerC: 'C'
    };
    const nextState = combinedReducer(state, { type: 'foo' });
    assert.strict.equal(typeof state, 'object');
    assert.strict.equal(typeof nextState, 'object');
    assert.strict.equal(state !== nextState, true);
    assert.strict.equal(nextState.reducerA, 'reducerA/foo');
    assert.strict.equal(nextState.reducerB, 'reducerB/foo');
    assert.strict.equal(nextState.reducerC, 'C');
  });

  it('State should remain unchanged.', () => {
    const reducer = (state) => state;
    combinedReducer = combineReducers({
      reducerA: reducer,
      reducerB: reducer,
      reducerC: reducer
    });
    const state = {
      reducerA: 'A',
      reducerB: 'B',
      reducerC: 'C'
    };
    const nextState = combinedReducer(state, { type: 'foo' });
    assert.strict.equal(typeof state, 'object');
    assert.strict.equal(typeof nextState, 'object');
    assert.strict.equal(nextState, state);
  });
});
