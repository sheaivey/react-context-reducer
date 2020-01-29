export default (store) =>
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
