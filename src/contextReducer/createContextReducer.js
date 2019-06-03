import React, { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';
import { contextDecorator } from '../core';
import { msg } from '../utils/logging';

import reduxDevToolsMiddleware from './ReduxDevToolsMiddleWare';

const createContextReducer = (contextKey, reducer, middlewares = false) => {
  const Context = createContext();
  const initialState = reducer(undefined, { type: '@@INIT' }); // returns initialState
  const _private = {
    state: initialState,
    dispatch: () => { // will be overloaded once Provider is used.
      if (process.env.NODE_ENV !== 'production') {
        throw new Error(msg(`The contextKey "${contextKey}" has not been provided for consumption. Be sure to wrap your app with the HOC "withContextProviders()(App)" before trying to consume a context.`));
      }
    }
  };
  const WrappedContext = contextDecorator(
    contextKey,
    Context,
    () => {},
    { // extra
      getInitialState: () => initialState,
      getState: () => _private.state,
      dispatch: (action) => _private.dispatch(action)
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
    const [state] = useReducerStore(_private, enhancedReducer, initialState, middlewares);
    const enhancedValue = [state, WrappedContext.dispatch];
    return (
      <Context.Provider value={enhancedValue}>
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

const useReducerStore = (_private, reducer, initialState, middlewares) => {
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
  _private.state = state;
  _private.dispatch = finalDispatch;
  return [ state, finalDispatch ];
};

const compose = (...funcs) => x =>
  funcs.reduceRight((composed, f) => f(composed), x);
