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

export default (config = {}) => {
  if (process.env.NODE_ENV === 'production') {
    // only use in development... return dummy middleware.
    return () => (next) => (action) => next(action);
  } else {
    let extension = null;
    const initExtension = (store) => {
      if (window && window.__REDUX_DEVTOOLS_EXTENSION__) {
        extension = window.__REDUX_DEVTOOLS_EXTENSION__.connect({ ...defaultConfig, name: store.contextKey, ...config });
        extension.init(store.getState());
        extension.subscribe((message) => {
          if (message.type === 'DISPATCH' && message.payload) {
            switch (message.payload.type) {
              case 'TOGGLE_ACTION':
              case 'JUMP_TO_ACTION':
              case 'JUMP_TO_STATE':
                store.dispatchState(JSON.parse(message.state));
            }
          }
        });
      } else {
        extension = false;
        if (window && navigator && navigator.userAgent.indexOf('Chrome') > -1) {
          console.info('%cDownload the Redux DevTools for a better development experience: https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd', 'font-weight:bold');
        }
      }
    };
    return (store) =>
      (next) =>
        (action) => {
          const result = next(action);
          const nextState = store.getState();
          if (extension === null) {
            initExtension(store);
          } else if (extension) {
          // reduxDevTools found
            extension.send(action, nextState);
          } else if (extension === false) {
          // fall back to console log for everyone else.
            console.group(`Dispatching "${action.type}"`);
            console.info('Action:', action);
            console.info('Next State:', nextState);
            console.groupEnd();
          }
          return result;
        };
  }
};
