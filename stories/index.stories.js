import React, { useEffect } from 'react';
import { storiesOf } from '@storybook/react';
import { action as actionAddon } from '@storybook/addon-actions';
// import { linkTo } from '@storybook/addon-links';
import { createContextReducer, combineReducers, combineActions, dispatchLogger } from 'react-context-reducer';

const dispatchAction = (store) =>
  (next) =>
    (action) => {
      actionAddon(`Dispatching "${action.type}"`, { clearOnStoryChange: true })({
        action: action,
        currentState: store.getState()
      });
      let result = next(action);
      return result;
    };

const combinedActions = combineActions({
  store1: { Increment: 'store1/+', Decrement: 'store1/-' },
  store2: { Noop: 'store2/noop' }
});

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
    store2: () => Math.floor(Math.random() * 100) // always updating
  }),
  [dispatchLogger, dispatchAction]
);

const RootReducer = createContextReducer('RootReducer', (state = 'react-context-reducer') => state, [dispatchLogger, dispatchAction]);

storiesOf('Welcome', module).add('to Storybook', () => <div>
  <h1> Welcome to react-context-reducer examples!</h1>
  These examples can are best seen in combination with ReduxDevTools.
</div>);

storiesOf('Provider', module)
  .add('RootReducer.Provider', () => (
    <RootReducer.Provider>
      Children
    </RootReducer.Provider>
  ));

const Component = () => { const [state] = RootReducer.use(); return state; };
storiesOf('Consumers', module)
  .add('RootReducer.use()', () => (
    <RootReducer.Provider>
      <Component />
    </RootReducer.Provider>
  ));

let renderCount = 0;
const CombinedComponent = CombinedReducer.connect(([state, dispatch]) => {
  return { store1: state.store1, dispatch: dispatch };
}, ['store1'])(
  (props) => {
    const { store1, dispatch } = props;
    useEffect(() => { renderCount = 0; }, []);
    renderCount++;
    return (
      <div>
        {store1}
        <button onClick={() => { dispatch({ type: combinedActions.store1.Increment }); }}>+</button>
        <button onClick={() => dispatch({ type: combinedActions.store1.Decrement })}>-</button>
        <button onClick={() => dispatch({ type: combinedActions.store2.Noop })}>no-op</button>
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
