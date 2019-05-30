import React from 'react';
import { getContext } from './core';
import { msg } from '../utils/logging';

const connectContexts = (
  contextKeys = [],
  mapContextStoreToProps = () => ({})
) => (WrappedComponent) => {
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
      <WrappedComponent
        {...mapContextStoreToProps(stores, props)}
      />
    );
  };
};

export default connectContexts;
