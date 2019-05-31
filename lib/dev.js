'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var PropTypes = _interopDefault(require('prop-types'));

var msg = function msg(text) {
  return "react-context-store: ".concat(text);
};
var warning = function warning(text) {
  {
    console.error(msg(text));
  }
};

var registeredContexts = {};
var registerContext = function registerContext(decoratedContext) {
  {
    if (registeredContexts[decoratedContext.contextKey]) {
      throw new Error(msg("A decoratedContext already exists with the supplied contextKey \"".concat(decoratedContext.contextKey, "\".")));
    }

    var requiredKeys = ['contextKey', 'Context', 'Provider', 'use'];
    var missingKeys = [];
    requiredKeys.forEach(function (key) {
      if (!decoratedContext[key]) {
        missingKeys.push(key);
      }
    });

    if (missingKeys.length) {
      throw new Error(msg("The provided decoratedContext did not supply the following properties \"".concat(missingKeys.join('", "'), "\". Did you forget to use \"contextDecorator(contextKey, Context, Provider, extra)\"?")));
    }
  }

  registeredContexts[decoratedContext.contextKey] = decoratedContext;
};
var getContext = function getContext(contextKey) {
  {
    if (!registeredContexts[contextKey]) {
      throw new Error(msg("The contextKey \"".concat(contextKey, "\" has not yet been added. Be sure your context store has been added with \"registerContext(...)\" before trying to use it. ")));
    }
  }

  return registeredContexts[contextKey];
};
var getContexts = function getContexts(contextKeys) {
  if (!contextKeys) {
    // return all registered decoratedContexts
    return registeredContexts;
  } // only get the requested decoratedContexts


  var stores = {};
  contextKeys.forEach(function (contextKey) {
    stores[contextKey] = getContext(contextKey);
  });
  return stores;
};

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      _defineProperty(target, key, source[key]);
    });
  }

  return target;
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  }
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

function _iterableToArrayLimit(arr, i) {
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

var contextDecorator = function contextDecorator(contextKey, Context, Provider) {
  var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

  var decoratedContext = _objectSpread({}, extra, {
    contextKey: contextKey,
    Context: Context,
    connect: function connect() {
      var mapStoreToProps = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};
      return function (WrappedComponent) {
        return function (props) {
          // todo make this not getContext
          var value = decoratedContext.use();
          return React__default.createElement(WrappedComponent, mapStoreToProps(value, props));
        };
      };
    },
    use: function use() {
      var value = React.useContext(Context);

      {
        if (!value) {
          throw new Error(msg("The contextKey \"".concat(contextKey, "\" has not been provided for consumption. Be sure to wrap your app with the HOC \"withContextProviders()(App)\" before trying to consume a context.")));
        }
      }

      return value;
    },
    Provider: Provider
  });

  decoratedContext.connect;
  return decoratedContext;
};

var recursiveProvider = function recursiveProvider(WrappedComponent, contextKeys) {
  if (contextKeys.length === 0) {
    return function (props) {
      return React__default.createElement(WrappedComponent, props);
    };
  }

  var contextKey = contextKeys.pop();
  var Provider = getContext(contextKey).Provider;
  var Component = recursiveProvider(WrappedComponent, contextKeys);
  return function (props) {
    return React__default.createElement(Provider, null, React__default.createElement(Component, props));
  };
};

var withContextStoreProviders = function withContextStoreProviders(contextKeys) {
  return function (WrappedComponent) {
    return recursiveProvider(WrappedComponent, contextKeys || Object.keys(getContexts()));
  };
};

var useContext = function useContext(contextKey) {
  return getContext(contextKey).use();
};

var useContexts = function useContexts(contextKeys) {
  {
    if (!Array.isArray(contextKeys)) {
      throw new Error(msg("You must provide an array of contextKeys to use."));
    }

    if (contextKeys.length === 0) {
      throw new Error(msg("You must provide at least one contextKey to use."));
    }
  }

  var stores = [];
  contextKeys.forEach(function (contextKey) {
    var value = useContext(contextKey);
    stores.push(value);
  });
  return stores;
};

var connectContexts = function connectContexts() {
  var contextKeys = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var mapContextStoreToProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {
    return {};
  };
  return function (WrappedComponent) {
    return function (props) {
      {
        if (!Array.isArray(contextKeys)) {
          throw new Error(msg("You must provide an array of contextKeys to connect."));
        }

        if (contextKeys.length === 0) {
          throw new Error(msg("You must provide at least one contextKey to connect."));
        }
      }

      var stores = [];
      contextKeys.forEach(function (contextKey) {
        var value = getContext(contextKey).use();
        stores.push(value);
      });
      return React__default.createElement(WrappedComponent, mapContextStoreToProps(stores, props));
    };
  };
};

var combineReducers = function combineReducers(reducers) {
  var reducerKeys = Object.keys(reducers);
  var finalReducers = {};

  for (var i = 0; i < reducerKeys.length; i++) {
    var key = reducerKeys[i];

    {
      if (typeof reducers[key] === 'undefined') {
        warning("No reducer provided for key \"".concat(key, "\""));
      }
    }

    if (typeof reducers[key] === 'function') {
      finalReducers[key] = reducers[key];
    } else {
      {
        warning("The reducer provided for key \"".concat(key, "\" is not a function."));
      }
    }
  }

  var finalReducerKeys = Object.keys(finalReducers);
  return function combination() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action = arguments.length > 1 ? arguments[1] : undefined;
    var hasChanged = false;
    var nextState = {};

    for (var _i = 0; _i < finalReducerKeys.length; _i++) {
      var _key = finalReducerKeys[_i];
      var reducer = finalReducers[_key];
      var previousStateForKey = state[_key];
      var nextStateForKey = reducer(previousStateForKey, action);

      {
        if (typeof nextStateForKey === 'undefined') {
          throw new Error(msg('reducers should always return a state other then "undefined"'));
        }
      }

      nextState[_key] = nextStateForKey;
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
    }

    return hasChanged ? nextState : state;
  };
};

var reduxDevToolsActions = {
  ReplaceState: '@@REPLACE_STATE'
};
var defaultConfig = {
  features: {
    dispatch: true,
    persist: false,
    reorder: false,
    skip: true,
    jump: true,
    "import": false,
    "export": false,
    test: false
  }
};
var reduxDevToolsMiddleware = (function (store, reducer) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  if (window.__REDUX_DEVTOOLS_EXTENSION__) {
    var extension = window.__REDUX_DEVTOOLS_EXTENSION__.connect(_objectSpread({}, defaultConfig, options));

    extension.init(store.getState());
    extension.subscribe(function (message, extra) {
      if (message.type === 'DISPATCH' && message.payload) {
        switch (message.payload.type) {
          case 'TOGGLE_ACTION':
          case 'JUMP_TO_ACTION':
          case 'JUMP_TO_STATE':
            // replaying global state
            var state = JSON.parse(message.state);
            store.dispatch({
              type: reduxDevToolsActions.ReplaceState,
              data: state
            });
        }
      }
    });
    return function (state, action) {
      var nextState = action.type === reduxDevToolsActions.ReplaceState ? action.data : reducer(state, action);

      if (action.type === reduxDevToolsActions.ReplaceState) {
        return nextState; // dont do anything
      }

      extension.send(action, nextState);
      return nextState; // dont do anything
    };
  }

  return function (state, action) {
    var nextState = reducer(state, action);
    console.log("Action Triggered: ".concat(action.type, " [").concat(options.name || '', "]"), action);
    return nextState;
  };
});

var createContextReducer = function createContextReducer(contextKey, reducer) {
  var middlewares = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var Context = React.createContext();
  var initialState = reducer(undefined, {
    type: '@@INIT'
  }); // returns initialState

  var WrappedContext = contextDecorator(contextKey, Context, function (props) {}, {
    getInitialState: function getInitialState() {
      return initialState;
    },
    getState: function getState() {
      return initialState;
    },
    // overloaded
    dispatch: function dispatch(action) {
      {
        throw new Error(msg("The contextKey \"".concat(contextKey, "\" has not been provided for consumption. Be sure to wrap your app with the HOC \"withContextProviders()(App)\" before trying to consume a context.")));
      }
    } // overloaded

  });
  var enhancedReducer = reduxDevToolsMiddleware({
    getState: WrappedContext.getState,
    dispatch: function dispatch(action) {
      return WrappedContext.dispatch(action);
    }
  }, reducer, {
    // reduxDevTools options
    name: contextKey
  });

  WrappedContext.Provider = function (props) {
    /* Provider HoC */
    var value = useReducerStore(WrappedContext, enhancedReducer, initialState, middlewares);
    return React__default.createElement(Context.Provider, {
      value: value
    }, props.children);
  };

  WrappedContext.Provider.propTypes = {
    children: PropTypes.any
  };
  return WrappedContext;
};

var useReducerStore = function useReducerStore(WrappedContext, reducer, initialState, middlewares) {
  // TODO: this function gets called over and over rebuilding middleware and updating .getState() .dispatch()
  var _useReducer = React.useReducer(reducer, initialState),
      _useReducer2 = _slicedToArray(_useReducer, 2),
      state = _useReducer2[0],
      _dispatch = _useReducer2[1];

  var enhancedDispatch = _dispatch;

  if (middlewares && Array.isArray(middlewares) && middlewares.length) {
    var middlewareAPI = {
      getState: function getState() {
        return state;
      },
      dispatch: function dispatch(action) {
        return _dispatch(action);
      }
    };
    var chain = middlewares.map(function (middleware) {
      return middleware(middlewareAPI);
    });
    enhancedDispatch = compose.apply(void 0, _toConsumableArray(chain))(_dispatch);
  }

  var finalDispatch = function finalDispatch(action) {
    return enhancedDispatch(action);
  }; // experimental Reducer Store API


  WrappedContext.getState = function () {
    return state;
  };

  WrappedContext.dispatch = function (action) {
    return enhancedDispatch(action);
  };

  return [state, finalDispatch];
};

var compose = function compose() {
  for (var _len = arguments.length, funcs = new Array(_len), _key = 0; _key < _len; _key++) {
    funcs[_key] = arguments[_key];
  }

  return function (x) {
    return funcs.reduceRight(function (composed, f) {
      return f(composed);
    }, x);
  };
};

exports.combineReducers = combineReducers;
exports.connectContexts = connectContexts;
exports.contextDecorator = contextDecorator;
exports.createContextReducer = createContextReducer;
exports.getContext = getContext;
exports.getContexts = getContexts;
exports.registerContext = registerContext;
exports.useContexts = useContexts;
exports.withContextProviders = withContextStoreProviders;
//# sourceMappingURL=dev.js.map
