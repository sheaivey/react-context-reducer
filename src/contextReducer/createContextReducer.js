import React, { createContext, useReducer, useContext } from 'react';
import propTypes from 'prop-types';
import { runTypeCheck } from './withTypeCheck';
import { msg } from '../utils/logging';

const createContextReducer = (contextKey, reducer, middlewares = false) => {
  const Context = createContext();
  // const initialState = reducer(undefined, { type: '@@INIT' }); // returns initialState
  const _private = {
    contextKey: contextKey,
    state: undefined,
    dispatch: () => {}, // overloaded
    _dispatch: () => {}, // overloaded
    wrappedDispatch: (action) => {
      _private.state = _private.reducer(_private.state, action, contextKey);
    }, // overloaded
    reducer: reducer,
    middlewareAPI: {
      // experimental Reducer Store API
      contextKey: contextKey,
      getState: () => _private.state,
      dispatch: action => _private.dispatch(action),
      // used to replace the entire state.
      dispatchState: newState => { _private.state = newState; _private._dispatch(newState); }
    }
  };
  _private.dispatch = composeMiddlewares(_private, middlewares);
  _private.dispatch({ type: '@@INIT' }); // initialState

  const initialState = _private.state;
  const decoratedContext = {
    contextKey,
    Context,
    Consumer: Context.Consumer,
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
  decoratedContext.Provider = (props) => { /* Provider HoC */
    const [state] = useReducerStore(_private, () => decoratedContext.getState(), decoratedContext.getState(), middlewares);
    const enhancedValue = [state, decoratedContext.dispatch]; /* use the same dispatch function signature */
    return (
      <Context.Provider value={enhancedValue}>
        {props.children}
      </Context.Provider>
    );
  };
  decoratedContext.Provider.propTypes = {
    children: propTypes.any
  };
  return decoratedContext;
};

export default createContextReducer;

const useReducerStore = (_private, reducer, initialState) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  _private.state = state;
  _private._dispatch = dispatch;
  _private.wrappedDispatch = (action) => {
    // In order to get the next reduced state for middlewares we need to change
    // when the reducer gets called. This is changes the useReducer hook to
    // just a simple return store.getState() call because we have already calculated the next
    // state here...
    _private.state = _private.reducer(_private.state, action, _private.contextKey); // important
    dispatch(); // simple dispatch see above note.
    return action; // return the action
  };
  return [ state, _private.dispatch ];
};

const composeMiddlewares = (_private, middlewares) => {
  if (middlewares && Array.isArray(middlewares) && middlewares.length) {
    const chain = middlewares.map(middleware => middleware(_private.middlewareAPI));
    return (action) => {
      action = runTypeCheck(action);
      compose(...chain)(_private.wrappedDispatch)(action);
    };
  }
  return _private.wrappedDispatch;
};

const compose = (...funcs) => x =>
  funcs.reduceRight((composed, f) => f(composed), x);
