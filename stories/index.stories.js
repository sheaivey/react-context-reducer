import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import { createContextReducer, registerContext, withContextProviders, combineReducers } from 'react-context-reducer';

const CombinedReducer = createContextReducer('CombinedReducer',
  combineReducers({
    store1: (state = 0, action) => {
      if (action.type === 'store1/+') {
        return ++state;
      }
      if (action.type === 'store1/-') {
        return --state;
      }
      return state;
    },
    store2: (state = 0, action) => Math.random() // always updating
  })
);

const RootReducer = createContextReducer('RootReducer', (state = 'react-context-reducer', action) => state);
registerContext(RootReducer);

storiesOf('Welcome', module).add('to Storybook', () => <div>
  <h1> Welcome to react-context-reducer examples!</h1>
  These examples can are best seen in combination with ReduxDevTools.
</div>);

storiesOf('Provider', module)
  .add('RootReducer.Provider', () => (
    <RootReducer.Provider>
      Children
    </RootReducer.Provider>
  ))
  .add('withContextProviders()(...)', withContextProviders()(() => (
    <div>Children</div>
  )));

const Component = () => { const [state, dispatch] = RootReducer.use(); return state; };
storiesOf('Consumers', module)
  .add('RootReducer.use()', () => (
    <RootReducer.Provider>
      <Component />
    </RootReducer.Provider>
  ));

const CombinedComponent = CombinedReducer.connect(([state, dispatch]) => ({ store1: state.store1 }))(
  (props) => {
    console.log('render');
    return (
      <div>
        {props.store1}
        <button onClick={() => CombinedReducer.dispatch({ type: 'store1/+' })}>+</button>
        <button onClick={() => CombinedReducer.dispatch({ type: 'store1/-' })}>-</button>
        <button onClick={() => CombinedReducer.dispatch({ type: 'noop' })}>no-op</button>
      </div>
    );
  }
);
storiesOf('combineReducers', module)
  .add('CombinedReducer.connect()', () => (
    <CombinedReducer.Provider>
      <CombinedComponent />
    </CombinedReducer.Provider>
  ));
