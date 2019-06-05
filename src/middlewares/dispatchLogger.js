export default (store) =>
  (next) =>
    (action) => {
      console.group(`Dispatching "${action.type}"`);
      console.info('Action:', action);
      console.info('Current State:', store.getState());
      let result = next(action);
      console.groupEnd();
      return result;
    };
