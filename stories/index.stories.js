import React, { useEffect } from 'react';

import { storiesOf } from '@storybook/react';
import { action as actionAddon, configureActions } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import { createContextReducer, registerContext, withContextProviders, combineReducers } from 'react-context-reducer';

const actionLogger = store => next => action => {
  let result = next(action);
  actionAddon('onClick');
  console.group(action.type);
  console.info('dispatching', action);
  console.log('next state', store.getState());
  console.groupEnd();
  return result;
};

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
  }),
  [actionLogger]
);

const RootReducer = createContextReducer('RootReducer', (state = 'react-context-reducer', action) => state, [actionLogger]);
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

let renderCount = 0;
const CombinedComponent = CombinedReducer.connect(([state, dispatch]) => {
  return { store1: state.store1, dispatch: dispatch };
})(
  (props) => {
    const { store1, dispatch } = props;
    console.log('render');
    useEffect(() => { renderCount = 0; }, []);
    renderCount++;
    return (
      <div>
        {store1}
        <button onClick={() => { dispatch({ type: 'store1/+' }); actionAddon('onClick'); }}>+</button>
        <button onClick={() => dispatch({ type: 'store1/-' })}>-</button>
        <button onClick={() => dispatch({ type: 'noop' })}>no-op</button>
        <br />
        Render Count: {renderCount}
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
