import React, { useContext } from 'react';
import { msg } from '../utils/logging';

const contextDecorator = (contextKey, Context, Provider, extra = {}) => {
  const decoratedContext = {
    ...extra,
    contextKey: contextKey,
    Context: Context,
    connect: (
      mapContextToProps = () => ({}),
      options = {
        useMemo: true /* only re-renders if props have changed */
      }
    ) => {
      return (WrappedComponent) => {
        const ConnectComponent = options.useMemo ? React.memo((props) => <WrappedComponent {...props} />) : WrappedComponent;
        return props => {
          const value = decoratedContext.use();
          return (
            <ConnectComponent {...props} {...mapContextToProps(value, props)} />
          );
        };
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
  return decoratedContext;
};

export default contextDecorator;
