import React, { useEffect } from 'react';
import { storiesOf } from '@storybook/react';
import propTypes from 'prop-types';
import { action as actionAddon } from '@storybook/addon-actions';
// import { linkTo } from '@storybook/addon-links';
import { createContextReducer, combineReducers, combineActions, withTypeCheck, reduxDevTools } from 'react-context-reducer';

const dispatchAction = (store) =>
  (next) =>
    (action) => {
      const previousState = store.getState();
      if (action.type === 'store1/+') {
        // store.dispatch({ type: 'do more dispatch' });
      }
      const result = next(action);
      actionAddon(`Dispatching "${action.type}"`, { clearOnStoryChange: true })({
        action: action,
        oldState: previousState,
        nextState: store.getState()
      });
      return result;
    };

const combinedActions = combineActions({
  store1: { Increment: 'store1/+', Decrement: 'store1/-', ResetAll: 'reset' },
  store2: { Noop: 'store2/noop', ResetAll: 'reset' }
});

const CombinedReducer = createContextReducer('CombinedReducer',
  withTypeCheck(combineReducers({
    store1: withTypeCheck((state = 0, action) => {
      if (action.type === 'store1/+') {
        return ++state;
      }
      if (action.type === 'store1/-') {
        return --state;
      }
      if (action.type === 'reset') {
        return 0;
      }
      return state;
    }, propTypes.number.isRequired),
    store2: withTypeCheck((state, action) => {
      if (state === undefined || action.type === 'reset') {
        return 0;
      }
      return ++state;
    }, propTypes.number.isRequired)
  }), propTypes.shape({
    store1: propTypes.number.isRequired,
    store2: propTypes.number.isRequired
  })),
  [dispatchAction, reduxDevTools()]
);

const RootReducer = createContextReducer('RootReducer', (state = 'react-context-reducer') => state, [dispatchAction, reduxDevTools()]);

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
  return { store1: state.store1, store2: state.store2, dispatch: dispatch };
}, ['store1', 'store2'])(
  (props) => {
    const { store1, store2, dispatch } = props;
    useEffect(() => { renderCount = 0; }, []);
    renderCount++;
    return (
      <div>
        Store 1: {store1}
        <button onClick={() => dispatch({ type: combinedActions.store1.Increment })}>+</button>
        <button onClick={() => dispatch({ type: combinedActions.store1.Decrement })}>-</button>
        <br />
        Store 2: {store2}<br />

        <button onClick={() => dispatch({ type: combinedActions.store2.Noop })}>no-op</button>
        <button onClick={() => dispatch({ type: combinedActions.store1.ResetAll })}>Reset All</button>
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
