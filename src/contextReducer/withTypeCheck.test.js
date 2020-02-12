import propTypes from 'prop-types';
import withTypeCheck, { runActionTypeCheck, TYPE_CHECK_KEY } from './withTypeCheck';
var assert = require('assert');

describe('Testing wityTypeCheck', () => {
  const tempENV = process.env.NODE_ENV;
  const consoleError = console.error;
  let errorCount = 0;
  let errorMsg = '';
  before(() => {
    console.error = (val) => {
      errorCount++;
      errorMsg = val;
    };
    process.env.NODE_ENV = 'development';
  });

  after(() => {
    console.error = consoleError;
    process.env.NODE_ENV = tempENV;
  });

  beforeEach(() => {
    errorCount = 0;
    errorMsg = undefined;
  });

  it('exported withTypeCheck()', () => {
    assert.strict.equal(typeof withTypeCheck, 'function');
  });
  it('exported runActionTypeCheck()', () => {
    assert.strict.equal(typeof runActionTypeCheck, 'function');
  });
  it('Action Payload Validation withTypeCheck()', () => {
    const shape = { data: propTypes.number.isRequired };
    const type = withTypeCheck('do-work', shape);
    assert.strict.equal(type instanceof String, true);
    assert.strict.equal(type.toString(), 'do-work');
    assert.strict.equal(typeof type[TYPE_CHECK_KEY], 'function');
    runActionTypeCheck({ type: type, data: 1 });
    assert.strict.equal(errorCount, 0);
    runActionTypeCheck({ type: type, data: true });
    assert.strict.equal(errorCount, 1);
    assert.strict.equal(errorMsg, 'Warning: Failed property type: Invalid property `action.data` of type `boolean` supplied to `do-work`, expected `number`.');
  });
  it('Reducer State Validation withTypeCheck() propTypes function', () => {
    const shape = propTypes.bool.isRequired;
    const wrappedReducer = withTypeCheck((state, action) => {
      switch (action.type) {
        case 'do-work':
          return action.data;
        default:
          return state;
      }
    }, shape);

    wrappedReducer(false, { type: 'do-work', data: true });
    assert.strict.equal(errorCount, 0);

    wrappedReducer(false, { type: 'do-work', data: 1 });
    assert.strict.equal(errorCount, 1);
    assert.strict.equal(errorMsg, 'Warning: Failed property type: Invalid property `state` of type `number` supplied to `store`, expected `boolean`.');
  });
  it('Reducer State Validation withTypeCheck() propTypes shape object', () => {
    const shape = { result: propTypes.bool.isRequired };
    const wrappedReducer = withTypeCheck((state, action) => {
      switch (action.type) {
        case 'do-work':
          return { result: action.data };
        default:
          return state;
      }
    }, shape);

    wrappedReducer({ result: false }, { type: 'do-work', data: true });
    assert.strict.equal(errorCount, 0);

    wrappedReducer({ result: false }, { type: 'do-work', data: 1 });
    assert.strict.equal(errorCount, 1);
    assert.strict.equal(errorMsg, 'Warning: Failed property type: Invalid property `state.result` of type `number` supplied to `store`, expected `boolean`.');
  });
});
