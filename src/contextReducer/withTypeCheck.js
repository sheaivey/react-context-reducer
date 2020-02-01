import propTypes from 'prop-types';
import { warning, msg } from '../utils/logging';
export const TYPE_CHECK_KEY = '_propTypes';

export default (thing, shape = null) => {
  if (process.env.NODE_ENV === 'development') {
    if (shape == null) {
      throw new Error(msg('Error withPropTypes() expected non-null shape.'));
    }
    if (typeof thing === 'string') { // action
      const name = new String(thing); // eslint-disable-line no-new-wrappers
      name[TYPE_CHECK_KEY] = shape;
      return name;
    } else if (typeof thing === 'function') { // reducer
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

export const runTypeCheck = (action) => {
  const type = action.type;
  if (type instanceof String && type[TYPE_CHECK_KEY]) {
    propTypes.checkPropTypes(
      { action: type[TYPE_CHECK_KEY] },
      { action: action },
      'property',
      type.toString()
    );
    action = { ...action, type: type.toString() };
  }
  return action;
};
