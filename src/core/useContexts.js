import { getContext } from './core';
import { msg } from '../utils/logging';

export const useContext = (contextKey) => {
  return getContext(contextKey).use();
};

const useContexts = (contextKeys) => {
  if (process.env.NODE_ENV !== 'production') {
    if (!Array.isArray(contextKeys)) {
      throw new Error(msg(`You must provide an array of contextKeys to use.`));
    }
    if (contextKeys.length === 0) {
      throw new Error(msg(`You must provide at least one contextKey to use.`));
    }
  }
  const stores = [];
  contextKeys.forEach((contextKey) => {
    const value = useContext(contextKey);
    stores.push(value);
  });
  return stores;
};

export default useContexts;
