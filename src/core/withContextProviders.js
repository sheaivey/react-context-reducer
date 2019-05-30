import React from 'react';
import { getContext, getContexts } from './core';

// recursively wraps a component with all provided contextKeys.
const recursiveProvider = (WrappedComponent, contextKeys) => {
  if (contextKeys.length === 0) {
    return (props) => (<WrappedComponent {...props} />);
  }
  const contextKey = contextKeys.pop();
  const Provider = getContext(contextKey).Provider;
  const Component = recursiveProvider(WrappedComponent, contextKeys);
  return (props) => (
    <Provider>
      <Component {...props} />
    </Provider>
  );
};

const withContextStoreProviders = (contextKeys) => (WrappedComponent) => {
  return recursiveProvider(WrappedComponent, contextKeys || Object.keys(getContexts()));
};

export default withContextStoreProviders;
