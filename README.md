
[![npm](https://img.shields.io/npm/v/react-context-reducer.svg)](https://www.npmjs.com/package/react-context-reducer) [![Build Status](https://travis-ci.org/sheaivey/react-context-reducer.svg?branch=master)](https://travis-ci.org/sheaivey/react-context-reducer) [![npm](https://img.shields.io/npm/l/react-context-reducer.svg)](https://github.com/sheaivey/react-context-reducer/blob/master/LICENSE) [![npm](https://img.shields.io/npm/dt/react-context-reducer.svg)](https://www.npmjs.com/package/react-context-reducer)
# react-context-reducer
React Context + useReducer = Hooks version of Redux. This library is intended to be a light weight stand-in for Redux.js.

## Features
- Same great features found in [Redux](https://github.com/reduxjs/redux)
- Create a data store using `createContextReducer()`.
- Simplify reducer complexity with `combineReducers()`.
- New `combineActions()` validate and consolidate all your actions into one export.
- Use existing Redux middlewares or create your own.
  - Take advantage of the included `reduxDevTools()` or `dispatchLogger` middleware.
- Use a simple `<Provider />` HoC to register the context store with your app.
- Connect your components to your stores state with `connect()` HoC, `use()` Hook,
- Use `getState()` or `dispatch()` to interact with your store outside a react component.
- Create as many stores as you need with `createContextReducer()` or use one super store by combining your reducers.
- Only render when props change using `React.memo()`.
- Developer friendly with fail fast helpful debugging messages.
  - Use `withTypeCheck()` to describe your action and store shape.
- Lightweight under 5kb in production

## Installing

Using npm:

```bash
$ npm install react-context-reducer
```

Also install the required peer dependancies if you have not already done so:

```bash
$ npm install react
$ npm install prop-types
```

## Core API
- `createContextReducer(ContextKey, reducer, middlewares)` - Creates a Context store object with the following properties:
```js
  {
    ContextKey: ContextKey, /* name of the store. */
    Context, /* React Context Object. */
    Provider, /* The Provider HoC. */
    use(keys), /* React Hook to use the store. returns [state, dispatch]
    - keys (optional) array of keys to return from the state.
    */
    connect(mapContextToProps, keys, options), /* The Connect HoC
    - mapContextToProps(...) function to map context [state, dispatch] to props.
    - keys (optional) array of keys to return from the state.
    - options (optional) object {useMemo = true}
    */
    getState(), /* Returns the current state of the store. */
    dispatch(action) /* Dispatch an action to your store. */
  }
```
- `combineReducers({...})` - Split up complex reducers into smaller chunks. Works exactly like redux implementation [Redux of combineReducers()](https://redux.js.org/recipes/structuring-reducers/using-combinereducers).
- `combineActions({...})` - Combines actions similar to reducers and validates all your actions for uniqueness. Helps reduce the number of files you need to include in larger apps.
- `withTypeCheck(actionName or reducer, propTypes schema)` - Define your action payload shape or reducers state shape by wrapping it withTypeCheck.


## Middleware API
The middleware api sits between every dispatch call to your store. This allows for advanced features such as logging, analytics, crash reports, etc...
- `store.getState()` - Get the current state of the store. (before the reducer has been resolved)
- `store.dispatch(action)` - Dispatch a new action before (or after with async callback) the current dispatch completes.
- `next(action)` - Process the next middleware in the chain. (You can modify action before passing it to the next middleware in the chain)
- `action` - The passed down action.
```js
// log every dispatch to the console
  (store) =>
    (next) =>
      (action) => {
        console.group(`Dispatching "${action.type}"`);
        console.info('Action:', action);
        console.info('Previous State:', store.getState());
        const result = next(action);
        console.info('Next State:', store.getState());
        console.groupEnd();
        return result;
      };
```

## Example
First we need to create a context store using createContextReducer().

```jsx
// ./AppStore.js
import propTypes from 'prop-types';
import { createContextReducer, reduxDevTools, withTypeCheck } from 'react-context-reducer';

// create your actions.
export const AppStoreActions = {
  Add: withTypeCheck('+')),
  Subtract: withTypeCheck('-')
};

// create your reducer.
const reducer = (state = 0, action) => {
  switch(action.types) {
    case AppStoreActions.Add:
      return state+1;
    case AppStoreActions.Subtract:
      return state-1;
    default:
      return state;
  }
};

// Create the context store and export it.
export default createContextReducer(
  "AppStore", // store name
  withTypeCheck(reducer, propTypes.number.isRequired), // reducer
  [reduxDevTools()] // middlewares
);
```

Now we can provide the context store to the app by wrapping it with `AppStore.Provider`.
```jsx
// ./app.js
import React from 'react';
import AppStore from './AppStore';
import MyComponent from './MyComponent';

const App = (props) => {
  return (
    <AppStore.Provider>
      <MyComponent />
    </AppStore.Provider>
  )
};

export default App;
```

Connect our store to a component that needs access to state and dispatch using the `AppStore.connect()` HoC.
```jsx
// ./MyComponent.js - AppStore.connect() HoC
import React from 'react';
import AppStore, {AppStoreActions} from './AppStore';

const MyComponent = (props) => {
  const {state, dispatch} = props;
  return (
    <div>
      <button onClick={() => dispatch({type: AppStoreActions.Add})}>Add</button>
      <button onClick={() => dispatch({type: AppStoreActions.Subtract})}>Subtract</button>
      {state}
    </div>
  )
};

export default AppStore.connect(([state, dispatch]) => ({
  // mapContextToProps
  state,
  dispatch
}))(MyComponent);
```

Alternatively you can use the `AppStore.use(selectors)` hook to also gain access to the stores state and dispatch.
```jsx
// ./MyComponent.js - AppStore.use() hook
import React from 'react';
import AppStore, {AppStoreActions} from './AppStore';

const MyComponent = (props) => {
  const [state, dispatch] = AppStore.use(); // hook
  return (
    <div>
      <button onClick={() => dispatch({type: AppStoreActions.Add})}>Add</button>
      <button onClick={() => dispatch({type: AppStoreActions.Subtract})}>Subtract</button>
      {state}
    </div>
  )
};

export default MyComponent;
```

If everything was coded up correctly you should now see two buttons and the state value. Each time a button is pressed you will also see the action being logged to the console because of the `reduxDevTools()` middleware.


View Examples (Work In Progress)
https://sheaivey.github.io/react-context-reducer/
