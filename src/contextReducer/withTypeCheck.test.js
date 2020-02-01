import propTypes from 'prop-types';
import withTypeCheck, { runTypeCheck, TYPE_CHECK_KEY } from './withTypeCheck';
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
  it('exported runTypeCheck()', () => {
    assert.strict.equal(typeof runTypeCheck, 'function');
  });
  it('Action Payload Validation withTypeCheck()', () => {
    const shape = propTypes.shape({ data: propTypes.number.isRequired });
    const type = withTypeCheck('do-work', shape);
    assert.strict.equal(type instanceof String, true);
    assert.strict.equal(type.toString(), 'do-work');
    assert.strict.equal(type[TYPE_CHECK_KEY], shape);
  });
  it('Reducer State Validation withTypeCheck()', () => {
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
});
