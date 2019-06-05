import React, { createContext, useReducer, useContext } from 'react';
import PropTypes from 'prop-types';
import { msg } from '../utils/logging';

import reduxDevToolsMiddleware from './ReduxDevToolsMiddleWare';

const createContextReducer = (contextKey, reducer, middlewares = false) => {
  const Context = createContext();
  const initialState = reducer(undefined, { type: '@@INIT' }); // returns initialState
  const _private = {
    state: initialState,
    dispatch: () => { // overloaded, enhancedDispatch (with middlewares).
      if (process.env.NODE_ENV !== 'production') {
        throw new Error(msg(`The contextKey "${contextKey}" has not been provided for consumption. Be sure to wrap your app with the HOC "withContextProviders()(App)" before trying to consume a context.`));
      }
    },
    _dispatch: () => {} // overloaded, raw dispatch (no middlewares).
  };
  const decoratedContext = {
    contextKey,
    Context,
    connect: (
      mapContextToProps = () => ({}),
      keys = null, /* array of keys to include */
      options = {
        useMemo: true /* only re-renders if props have changed */
      }
    ) => {
      return (WrappedComponent) => {
        const ConnectComponent = options.useMemo ? React.memo((props) => <WrappedComponent {...props} />) : WrappedComponent;
        return props => {
          const value = decoratedContext.use(keys);
          return (
            <ConnectComponent {...props} {...mapContextToProps(value, props)} />
          );
        };
      };
    },
    use: (keys) => {
      const value = useContext(Context);
      if (process.env.NODE_ENV !== 'production') {
        if (!value) {
          throw new Error(msg(`The contextKey "${contextKey}" has not been provided for consumption. Be sure to wrap your app with the HOC "withContextProviders()(App)" before trying to consume a context.`));
        }
      }
      if (keys) {
        const state = value[0];
        if (process.env.NODE_ENV !== 'production') {
          if (typeof state !== 'object') {
            return value; // can only filter object keys.
          }
          if (!Array.isArray(keys)) {
            throw new Error(msg(`Keys must be an array.`), state);
          }
        }
        const newState = {};
        keys.forEach((key) => { newState[key] = state[key]; });
        return [newState, value[1]];
      }
      return value;
    },
    getInitialState: () => initialState,
    getState: () => _private.state,
    dispatch: (action) => _private.dispatch(action)
  };

  let enhancedReducer = reducer;

  if (process.env.NODE_ENV !== 'production') {
    enhancedReducer = reduxDevToolsMiddleware(
      {
        getState: decoratedContext.getState,
        dispatch: (action) => _private._dispatch(action)
      },
      reducer,
      { // reduxDevTools options
        name: contextKey
      }
    );
  }

  decoratedContext.Provider = (props) => { /* Provider HoC */
    const [state] = useReducerStore(_private, enhancedReducer, initialState, middlewares);
    const enhancedValue = [state, decoratedContext.dispatch]; /* use the same dispatch function signature */
    return (
      <Context.Provider value={enhancedValue}>
        {props.children}
      </Context.Provider>
    );
  };
  decoratedContext.Provider.propTypes = {
    children: PropTypes.any
  };
  return decoratedContext;
};

export default createContextReducer;

const useReducerStore = (_private, reducer, initialState, middlewares) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  let enhancedDispatch = dispatch;
  if (middlewares && Array.isArray(middlewares) && middlewares.length) {
    const middlewareAPI = {
      getState: () => state,
      dispatch: action => dispatch(action)
    };
    const chain = middlewares.map(middleware => middleware(middlewareAPI));
    enhancedDispatch = compose(...chain)(dispatch);
  }
  // experimental Reducer Store API
  _private.state = state;
  _private.dispatch = enhancedDispatch;
  _private._dispatch = dispatch;
  return [ state, enhancedDispatch ];
};

const compose = (...funcs) => x =>
  funcs.reduceRight((composed, f) => f(composed), x);
