import { warning } from '../utils/logging';

const combineActions = (actions) => {
  const actionKeys = Object.keys(actions);
  const actionCache = {}; // acrtions should be unique
  const finalActions = {};
  for (let i = 0; i < actionKeys.length; i++) {
    const key = actionKeys[i];
    if (process.env.NODE_ENV !== 'production') {
      if (typeof actions[key] === 'undefined') {
        warning(`No actions provided for key "${key}"`);
        continue;
      }
    }
    if (typeof actions[key] === 'object') {
      Object.keys(actions[key]).forEach((actionKey) => {
        // make sure all actions are unique
        if (actionCache[actions[key][actionKey]]) {
          if (process.env.NODE_ENV !== 'production') {
            warning(`The action provided for key "${key}.${actionKey}" is not unique "${actions[key][actionKey]}". First seen here "${actionCache[actions[key][actionKey]]}" = "${actions[key][actionKey]}".`);
          }
        } else {
          actionCache[actions[key][actionKey]] = `${key}.${actionKey}`;
        }
      });
      finalActions[key] = actions[key];
    } else {
      if (process.env.NODE_ENV !== 'production') {
        warning(`The action provided for key "${key}" is not a object.`);
      }
    }
  }

  return finalActions;
};

export default combineActions;
