(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{16:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__(9),__webpack_require__(15),__webpack_require__(11),__webpack_require__(28);var contextReducer_combineReducers=function(reducers){for(var key,reducerKeys=Object.keys(reducers),finalReducers={},i=0;i<reducerKeys.length;i++)"function"==typeof reducers[key=reducerKeys[i]]&&(finalReducers[key]=reducers[key]);var finalReducerKeys=Object.keys(finalReducers);return function(){for(var state=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{},action=1<arguments.length?arguments[1]:void 0,hasChanged=!1,nextState={},_i=0;_i<finalReducerKeys.length;_i++){var _key=finalReducerKeys[_i],reducer=finalReducers[_key],previousStateForKey=state[_key],nextStateForKey=reducer(previousStateForKey,action,_key);nextState[_key]=nextStateForKey,hasChanged=hasChanged||nextStateForKey!==previousStateForKey}return hasChanged?nextState:state}};__webpack_require__(20),__webpack_require__(17),__webpack_require__(19);function _typeof(obj){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(obj){return typeof obj}:function(obj){return obj&&"function"==typeof Symbol&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj})(obj)}var contextReducer_combineActions=function(actions){for(var actionKeys=Object.keys(actions),actionCache={},finalActions={},_loop=function(i){var key=actionKeys[i];"object"===_typeof(actions[key])&&(Object.keys(actions[key]).forEach(function(actionKey){!actionCache[actions[key][actionKey]]&&(actionCache[actions[key][actionKey]]="".concat(key,".").concat(actionKey))}),finalActions[key]=actions[key])},i=0;i<actionKeys.length;i++)_loop(i);return finalActions},react=(__webpack_require__(66),__webpack_require__(97),__webpack_require__(67),__webpack_require__(68),__webpack_require__(41),__webpack_require__(406),__webpack_require__(53),__webpack_require__(35),__webpack_require__(0)),react_default=__webpack_require__.n(react),prop_types=__webpack_require__(24),prop_types_default=__webpack_require__.n(prop_types);__webpack_require__(73),__webpack_require__(2);var withTypeCheck=function(thing){1<arguments.length&&void 0!==arguments[1]&&arguments[1];return thing};function _toConsumableArray(arr){return function _arrayWithoutHoles(arr){if(Array.isArray(arr)){for(var i=0,arr2=Array(arr.length);i<arr.length;i++)arr2[i]=arr[i];return arr2}}(arr)||function _iterableToArray(iter){if(Symbol.iterator in Object(iter)||"[object Arguments]"===Object.prototype.toString.call(iter))return Array.from(iter)}(arr)||function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}function _slicedToArray(arr,i){return function _arrayWithHoles(arr){if(Array.isArray(arr))return arr}(arr)||function _iterableToArrayLimit(arr,i){var _arr=[],_n=!0,_d=!1,_e=void 0;try{for(var _s,_i=arr[Symbol.iterator]();!(_n=(_s=_i.next()).done)&&(_arr.push(_s.value),!i||_arr.length!==i);_n=!0);}catch(err){_d=!0,_e=err}finally{try{_n||null==_i.return||_i.return()}finally{if(_d)throw _e}}return _arr}(arr,i)||function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function createContextReducer_typeof(obj){return(createContextReducer_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(obj){return typeof obj}:function(obj){return obj&&"function"==typeof Symbol&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj})(obj)}function _extends(){return(_extends=Object.assign||function(target){for(var source,i=1;i<arguments.length;i++)for(var key in source=arguments[i])Object.prototype.hasOwnProperty.call(source,key)&&(target[key]=source[key]);return target}).apply(this,arguments)}var contextReducer_createContextReducer=function(contextKey,reducer){var middlewares=!!(2<arguments.length&&void 0!==arguments[2])&&arguments[2],Context=Object(react.createContext)(),_private={contextKey:contextKey,state:void 0,dispatch:function dispatch(){},_dispatch:function _dispatch(){},wrappedDispatch:function wrappedDispatch(action){_private.state=_private.reducer(_private.state,action,contextKey)},reducer:reducer,middlewareAPI:{contextKey:contextKey,getState:function getState(){return _private.state},dispatch:function dispatch(action){return _private.dispatch(action)},dispatchState:function dispatchState(newState){_private.state=newState,_private._dispatch(newState)}}};_private.dispatch=composeMiddlewares(_private,middlewares),_private.dispatch({type:"@@INIT"});var initialState=_private.state,decoratedContext={contextKey:contextKey,Context:Context,Consumer:Context.Consumer,connect:function connect(){var mapContextToProps=0<arguments.length&&void 0!==arguments[0]?arguments[0]:function(){return{}},keys=1<arguments.length&&void 0!==arguments[1]?arguments[1]:null,options=2<arguments.length&&void 0!==arguments[2]?arguments[2]:{useMemo:!0};return function(WrappedComponent){var ConnectComponent=options.useMemo?react_default.a.memo(function(props){return react_default.a.createElement(WrappedComponent,props)}):WrappedComponent;return function(props){var value=decoratedContext.use(keys);return react_default.a.createElement(ConnectComponent,_extends({},props,mapContextToProps(value,props)))}}},use:function use(keys){var value=Object(react.useContext)(Context);if(keys){var state=value[0];if("object"!==createContextReducer_typeof(state))return value;var newState={};return keys.forEach(function(key){newState[key]=state[key]}),[newState,value[1]]}return value},getInitialState:function getInitialState(){return initialState},getState:function getState(){return _private.state},dispatch:function dispatch(action){return _private.dispatch(action)},Provider:function(props){var value=useStoreReducer(_private,decoratedContext.getState());return react_default.a.createElement(Context.Provider,{value:value},props.children)}};return decoratedContext.Provider.propTypes={children:prop_types_default.a.any},decoratedContext},useStoreReducer=function(_private,initialState){var _useState2=_slicedToArray(Object(react.useState)(initialState),2),state=_useState2[0],setState=_useState2[1];return _private.state=state,_private._dispatch=setState,_private.wrappedDispatch=function(action){return _private.state=_private.reducer(_private.state,action,_private.contextKey),setState(_private.state),action},[state,_private.dispatch]},composeMiddlewares=function(_private,middlewares){if(middlewares&&Array.isArray(middlewares)&&middlewares.length){var chain=middlewares.map(function(middleware){return middleware(_private.middlewareAPI)});return function(action){action=function(action){return action}(action),compose.apply(void 0,_toConsumableArray(chain))(_private.wrappedDispatch)(action)}}return _private.wrappedDispatch},compose=function(){for(var _len=arguments.length,funcs=Array(_len),_key=0;_key<_len;_key++)funcs[_key]=arguments[_key];return function(x){return funcs.reduceRight(function(composed,f){return f(composed)},x)}};__webpack_require__(102);var reduxDevTools=function(){0<arguments.length&&void 0!==arguments[0]&&arguments[0];return function(){return function(next){return function(action){return next(action)}}}};__webpack_require__.d(__webpack_exports__,"c",function(){return contextReducer_createContextReducer}),__webpack_require__.d(__webpack_exports__,"b",function(){return contextReducer_combineReducers}),__webpack_require__.d(__webpack_exports__,"a",function(){return contextReducer_combineActions}),__webpack_require__.d(__webpack_exports__,"e",function(){return withTypeCheck}),__webpack_require__.d(__webpack_exports__,"d",function(){return reduxDevTools})},180:function(module,exports,__webpack_require__){__webpack_require__(181),__webpack_require__(267),module.exports=__webpack_require__(268)},268:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),function(module){__webpack_require__(9),__webpack_require__(15),__webpack_require__(11),__webpack_require__(19);var _storybook_react__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__(36),req=__webpack_require__(333);Object(_storybook_react__WEBPACK_IMPORTED_MODULE_4__.configure)(function loadStories(){req.keys().forEach(function(filename){return req(filename)})},module)}.call(this,__webpack_require__(132)(module))},333:function(module,exports,__webpack_require__){var map={"./index.stories.js":334};function webpackContext(req){var id=webpackContextResolve(req);return __webpack_require__(id)}function webpackContextResolve(req){if(!__webpack_require__.o(map,req)){var e=new Error("Cannot find module '"+req+"'");throw e.code="MODULE_NOT_FOUND",e}return map[req]}webpackContext.keys=function webpackContextKeys(){return Object.keys(map)},webpackContext.resolve=webpackContextResolve,module.exports=webpackContext,webpackContext.id=333},334:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),function(module){__webpack_require__(20),__webpack_require__(17),__webpack_require__(9),__webpack_require__(35);var react__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__(0),react__WEBPACK_IMPORTED_MODULE_4___default=__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__),_storybook_react__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__(36),prop_types__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__(24),prop_types__WEBPACK_IMPORTED_MODULE_6___default=__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_6__),_storybook_addon_actions__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__(179),react_context_reducer__WEBPACK_IMPORTED_MODULE_8__=__webpack_require__(16);function _slicedToArray(arr,i){return function _arrayWithHoles(arr){if(Array.isArray(arr))return arr}(arr)||function _iterableToArrayLimit(arr,i){var _arr=[],_n=!0,_d=!1,_e=void 0;try{for(var _s,_i=arr[Symbol.iterator]();!(_n=(_s=_i.next()).done)&&(_arr.push(_s.value),!i||_arr.length!==i);_n=!0);}catch(err){_d=!0,_e=err}finally{try{_n||null==_i.return||_i.return()}finally{if(_d)throw _e}}return _arr}(arr,i)||function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}var dispatchAction=function(store){return function(next){return function(action){var previousState=store.getState();action.type;var result=next(action);return Object(_storybook_addon_actions__WEBPACK_IMPORTED_MODULE_7__.action)('Dispatching "'.concat(action.type,'"'),{clearOnStoryChange:!0})({action:action,oldState:previousState,nextState:store.getState()}),result}}},combinedActions=Object(react_context_reducer__WEBPACK_IMPORTED_MODULE_8__.a)({store1:{Increment:Object(react_context_reducer__WEBPACK_IMPORTED_MODULE_8__.e)("store1/+"),Decrement:Object(react_context_reducer__WEBPACK_IMPORTED_MODULE_8__.e)("store1/-"),ResetAll:"reset"},store2:{Noop:"store2/noop",ResetAll:"reset"}}),CombinedReducer=Object(react_context_reducer__WEBPACK_IMPORTED_MODULE_8__.c)("CombinedReducer",Object(react_context_reducer__WEBPACK_IMPORTED_MODULE_8__.e)(Object(react_context_reducer__WEBPACK_IMPORTED_MODULE_8__.b)({store1:Object(react_context_reducer__WEBPACK_IMPORTED_MODULE_8__.e)(function(){var state=0<arguments.length&&void 0!==arguments[0]?arguments[0]:0,action=1<arguments.length?arguments[1]:void 0;return action.type===combinedActions.store1.Increment?++state:action.type===combinedActions.store1.Decrement?--state:action.type===combinedActions.store1.ResetAll?0:state},prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.number.isRequired),store2:Object(react_context_reducer__WEBPACK_IMPORTED_MODULE_8__.e)(function(state,action){return void 0===state||action.type===combinedActions.store2.ResetAll?0:++state},prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.number.isRequired)}),prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.shape({store1:prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.number.isRequired,store2:prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.number.isRequired})),[dispatchAction,Object(react_context_reducer__WEBPACK_IMPORTED_MODULE_8__.d)()]),RootReducer=Object(react_context_reducer__WEBPACK_IMPORTED_MODULE_8__.c)("RootReducer",function(){return 0<arguments.length&&void 0!==arguments[0]?arguments[0]:"react-context-reducer"},[dispatchAction,Object(react_context_reducer__WEBPACK_IMPORTED_MODULE_8__.d)()]),_ref=react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("div",null,react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("h1",null," Welcome to react-context-reducer examples!"),"These examples can are best seen in combination with ReduxDevTools.");Object(_storybook_react__WEBPACK_IMPORTED_MODULE_5__.storiesOf)("Welcome",module).add("to Storybook",function(){return _ref});var _ref2=react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(RootReducer.Provider,null,"Children");Object(_storybook_react__WEBPACK_IMPORTED_MODULE_5__.storiesOf)("Provider",module).add("RootReducer.Provider",function(){return _ref2});var _ref3=react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(RootReducer.Provider,null,react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(function(){return _slicedToArray(RootReducer.use(),1)[0]},null));Object(_storybook_react__WEBPACK_IMPORTED_MODULE_5__.storiesOf)("Consumers",module).add("RootReducer.use()",function(){return _ref3});var renderCount=0,_ref6=react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("br",null),_ref7=react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("br",null),_ref8=react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("br",null),CombinedComponent=CombinedReducer.connect(function(_ref4){var _ref5=_slicedToArray(_ref4,2),state=_ref5[0],dispatch=_ref5[1];return{store1:state.store1,store2:state.store2,dispatch:dispatch}},["store1","store2"])(function(props){var store1=props.store1,store2=props.store2,dispatch=props.dispatch;return Object(react__WEBPACK_IMPORTED_MODULE_4__.useEffect)(function(){renderCount=0},[]),renderCount++,react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("div",null,"Store 1: ",store1,react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("button",{onClick:function onClick(){return dispatch({type:combinedActions.store1.Increment})}},"+"),react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("button",{onClick:function onClick(){return dispatch({type:combinedActions.store1.Decrement})}},"-"),_ref6,"Store 2: ",store2,_ref7,react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("button",{onClick:function onClick(){return dispatch({type:combinedActions.store2.Noop})}},"no-op"),react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("button",{onClick:function onClick(){return dispatch({type:combinedActions.store1.ResetAll})}},"Reset All"),_ref8,"Render Count: ",renderCount)}),_ref9=react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(CombinedReducer.Provider,null,react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(CombinedComponent,null));Object(_storybook_react__WEBPACK_IMPORTED_MODULE_5__.storiesOf)("combineReducers",module).add("CombinedReducer.connect()",function(){return _ref9})}.call(this,__webpack_require__(132)(module))}},[[180,1,2]]]);
//# sourceMappingURL=main.cac5ca44984c3e36e260.bundle.js.map