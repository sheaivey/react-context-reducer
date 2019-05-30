import React, { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';
import { contextDecorator } from '../core';
import { msg } from '../utils/logging';

import reduxDevToolsMiddleware from './ReduxDevToolsMiddleWare';

const createContextReducer = (contextKey, reducer, middlewares = false) => {
  const Context = createContext();
  const initialState = reducer(undefined, { type: '@@INIT' }); // returns initialState
  const WrappedContext = contextDecorator(
    contextKey,
    Context,
    (props) => {},
    {
      getInitialState: () => initialState,
      getState: () => initialState, // overloaded
      dispatch: (action) => {
        if (process.env.NODE_ENV !== 'production') {
          throw new Error(msg(`The contextKey "${contextKey}" has not been provided for consumption. Be sure to wrap your app with the HOC "withContextProviders()(App)" before trying to consume a context.`));
        }
      } // overloaded
    }
  );

  let enhancedReducer = reduxDevToolsMiddleware(
    {
      getState: WrappedContext.getState,
      dispatch: (action) => WrappedContext.dispatch(action)
    },
    reducer,
    { // reduxDevTools options
      name: contextKey
    }
  );

  WrappedContext.Provider = (props) => { /* Provider HoC */
    const value = useReducerStore(WrappedContext, enhancedReducer, initialState, middlewares);
    return (
      <Context.Provider value={value}>
        {props.children}
      </Context.Provider>
    );
  };
  WrappedContext.Provider.propTypes = {
    children: PropTypes.any
  };
  return WrappedContext;
};

export default createContextReducer;

const useReducerStore = (WrappedContext, reducer, initialState, middlewares) => {
  // TODO: this function gets called over and over rebuilding middleware and updating .getState() .dispatch()
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

  const finalDispatch = (action) => enhancedDispatch(action);
  // experimental Reducer Store API
  WrappedContext.getState = () => state;
  WrappedContext.dispatch = (action) => enhancedDispatch(action);
  return [ state, finalDispatch ];
};

const compose = (...funcs) => x =>
  funcs.reduceRight((composed, f) => f(composed), x);
