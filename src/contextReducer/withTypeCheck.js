import propTypes from 'prop-types';
import { warning, msg } from '../utils/logging';
export const TYPE_CHECK_KEY = '_propTypes';

export default (thing, shape = {}) => {
  if (process.env.NODE_ENV !== 'production') {
    if (typeof thing === 'string') { // action
      if (typeof shape !== 'object') {
        throw new Error(msg('Error withPropTypes() action expected to be a PropTypes shape object.'));
      }
      const name = new String(thing); // eslint-disable-line no-new-wrappers
      name[TYPE_CHECK_KEY] = propTypes.shape({ ...shape, type: propTypes.instanceOf(String).isRequired });
      return name;
    } else if (typeof thing === 'function') { // reducer
      if (typeof shape === 'object') {
        shape = propTypes.shape(shape);
      }
      if (typeof shape !== 'function') {
        throw new Error(msg('Error withPropTypes() reducer expected to be a propTypes function or shape object.'));
      }
      return (state, action, contextKey = 'store') => {
        const nextState = thing(state, action, contextKey);
        propTypes.checkPropTypes(
          { state: shape },
          { state: nextState },
          'property',
          contextKey
        );
        return nextState;
      };
    } else { // unknown
      warning('Unknown type passed to withPropTypes(). Expected \'string\' or \'function\'.', thing, shape);
    }
  }
  return thing;
};

export const runActionTypeCheck = (action) => {
  if (process.env.NODE_ENV !== 'production') {
    const type = action.type;
    if (type instanceof String && type[TYPE_CHECK_KEY]) {
      propTypes.checkPropTypes(
        { action: type[TYPE_CHECK_KEY] },
        { action: action },
        'property',
        type.toString()
      );
    }
  }
  return action;
};
