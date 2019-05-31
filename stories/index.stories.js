import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import { createContextReducer, registerContext, withContextProviders } from 'react-context-reducer';

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
