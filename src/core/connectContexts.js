import React from 'react';
import { getContext } from './core';
import { msg } from '../utils/logging';

const connectContexts = (
  contextKeys = [],
  mapContextToProps = () => ({}),
  options = {
    useMemo: true /* only re-renders if props have changed */
  }
) => (WrappedComponent) => {
  const ConnectComponent = options.useMemo ? React.memo((props) => <WrappedComponent {...props} />) : WrappedComponent;
  return props => {
    if (process.env.NODE_ENV !== 'production') {
      if (!Array.isArray(contextKeys)) {
        throw new Error(msg(`You must provide an array of contextKeys to connect.`));
      }
      if (contextKeys.length === 0) {
        throw new Error(msg(`You must provide at least one contextKey to connect.`));
      }
    }
    const stores = [];
    contextKeys.forEach((contextKey) => {
      const value = getContext(contextKey).use();
      stores.push(value);
    });
    return (
      <ConnectComponent {...props} {...mapContextToProps(stores, props)}
      />
    );
  };
};

export default connectContexts;
