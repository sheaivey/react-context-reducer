import React, { useContext } from 'react';
import { msg } from '../utils/logging';
import { getContext } from './core';

const contextDecorator = (contextKey, Context, Provider, extra = {}) => {
  return {
    ...extra,
    contextKey: contextKey,
    Context: Context,
    connect: (
      mapStoreToProps = () => {}
    ) => (WrappedComponent) => {
      return props => {
        const value = getContext(contextKey).use();
        return (
          <WrappedComponent
            {...mapStoreToProps(value, props)}
          />
        );
      };
    },
    use: () => {
      const value = useContext(Context);
      if (process.env.NODE_ENV !== 'production') {
        if (!value) {
          throw new Error(msg(`The contextKey "${contextKey}" has not been provided for consumption. Be sure to wrap your app with the HOC "withContextProviders()(App)" before trying to consume a context.`));
        }
      }
      return value;
    },
    Provider: Provider
  };
};

export default contextDecorator;
