import { warning, msg } from '../utils/logging';

// modified combineReducers from Redux: https://github.com/reduxjs/redux/blob/master/src/combineReducers.js
const combineReducers = (reducers) => {
  const reducerKeys = Object.keys(reducers);
  const finalReducers = {};
  for (let i = 0; i < reducerKeys.length; i++) {
    const key = reducerKeys[i];
    if (process.env.NODE_ENV !== 'production') {
      if (typeof reducers[key] === 'undefined') {
        warning(`No reducer provided for key "${key}"`);
      }
    }
    if (typeof reducers[key] === 'function') {
      finalReducers[key] = reducers[key];
    } else {
      if (process.env.NODE_ENV !== 'production') {
        warning(`The reducer provided for key "${key}" is not a function.`);
      }
    }
  }
  const finalReducerKeys = Object.keys(finalReducers);

  return (state = {}, action) => {
    let hasChanged = false;
    const nextState = {};
    for (let i = 0; i < finalReducerKeys.length; i++) {
      const key = finalReducerKeys[i];
      const reducer = finalReducers[key];
      const previousStateForKey = state[key];
      const nextStateForKey = reducer(previousStateForKey, action);
      if (process.env.NODE_ENV !== 'production') {
        if (typeof nextStateForKey === 'undefined') {
          throw new Error(msg('reducers should always return a state other then "undefined"'));
        }
      }
      nextState[key] = nextStateForKey;
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
    }
    return hasChanged ? nextState : state;
  };
};

export default combineReducers;
