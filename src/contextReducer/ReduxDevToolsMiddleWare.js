export const reduxDevToolsActions = {
  ReplaceState: '@@REPLACE_STATE'
};

const defaultConfig = {
  features: {
    dispatch: true,
    persist: false,
    reorder: false,
    skip: true,
    jump: true,
    import: false,
    export: false,
    test: false
  }
};

export default (store, reducer, options = {}) => {
  if (window.__REDUX_DEVTOOLS_EXTENSION__) {
    const extension = window.__REDUX_DEVTOOLS_EXTENSION__.connect({ ...defaultConfig, ...options });
    extension.init(store.getState());
    extension.subscribe((message) => {
      if (message.type === 'DISPATCH' && message.payload) {
        switch (message.payload.type) {
          case 'TOGGLE_ACTION':
          case 'JUMP_TO_ACTION':
          case 'JUMP_TO_STATE':
            // replaying global state
            const state = JSON.parse(message.state);
            store.dispatch({ type: reduxDevToolsActions.ReplaceState, data: state });
        }
      }
    });
    return (state, action) => {
      const nextState = action.type === reduxDevToolsActions.ReplaceState ? action.data : reducer(state, action);
      if (action.type === reduxDevToolsActions.ReplaceState) {
        return nextState; // dont do anything
      }
      extension.send(action, nextState);
      return nextState; // dont do anything
    };
  }
};
