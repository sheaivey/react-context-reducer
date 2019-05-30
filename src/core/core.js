import { msg, warning } from '../utils/logging';

// global react-context-reducer contexts
const registeredContexts = {};

export const registerContext = (decoratedContext) => {
  if (process.env.NODE_ENV !== 'production') {
    if (registeredContexts[decoratedContext.contextKey]) {
      throw new Error(msg(`A decoratedContext already exists with the supplied contextKey "${decoratedContext.contextKey}".`));
    }

    const requiredKeys = ['contextKey', 'Context', 'Provider', 'use'];
    const missingKeys = [];
    requiredKeys.forEach((key) => {
      if (!decoratedContext[key]) {
        missingKeys.push(key);
      }
    });
    if (missingKeys.length) {
      throw new Error(msg(`The provided decoratedContext did not supply the following properties "${missingKeys.join('", "')}". Did you forget to use "contextDecorator(contextKey, Context, Provider, extra)"?`));
    }
  }
  registeredContexts[decoratedContext.contextKey] = decoratedContext;
};

export const removeContext = (contextKey) => {
  if (process.env.NODE_ENV !== 'production') {
    if (!registeredContexts[contextKey]) {
      warning(`The contextKey "${contextKey}" could not be removed because it does not exist.`);
    }
  }
  delete registeredContexts[contextKey];
};

export const getContext = (contextKey) => {
  if (process.env.NODE_ENV !== 'production') {
    if (!registeredContexts[contextKey]) {
      throw new Error(msg(`The contextKey "${contextKey}" has not yet been added. Be sure your context store has been added with "registerContext(...)" before trying to use it. `));
    }
  }
  return registeredContexts[contextKey];
};

export const getContexts = (contextKeys) => {
  if (!contextKeys) {
    // return all registered decoratedContexts
    return registeredContexts;
  }
  // only get the requested decoratedContexts
  const stores = {};
  contextKeys.forEach((contextKey) => {
    stores[contextKey] = getContext(contextKey);
  });
  return stores;
};
