(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{185:function(module,exports,__webpack_require__){__webpack_require__(186),__webpack_require__(271),module.exports=__webpack_require__(272)},272:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),function(module){__webpack_require__(9),__webpack_require__(15),__webpack_require__(12),__webpack_require__(16);var _storybook_react__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__(45),req=__webpack_require__(334);Object(_storybook_react__WEBPACK_IMPORTED_MODULE_4__.configure)(function loadStories(){req.keys().forEach(function(filename){return req(filename)})},module)}.call(this,__webpack_require__(139)(module))},334:function(module,exports,__webpack_require__){var map={"./index.stories.js":335};function webpackContext(req){var id=webpackContextResolve(req);return __webpack_require__(id)}function webpackContextResolve(req){if(!__webpack_require__.o(map,req)){var e=new Error("Cannot find module '"+req+"'");throw e.code="MODULE_NOT_FOUND",e}return map[req]}webpackContext.keys=function webpackContextKeys(){return Object.keys(map)},webpackContext.resolve=webpackContextResolve,module.exports=webpackContext,webpackContext.id=334},335:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),function(module){__webpack_require__(22),__webpack_require__(17),__webpack_require__(9),__webpack_require__(20);var react__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__(2),react__WEBPACK_IMPORTED_MODULE_4___default=__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__),_storybook_react__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__(45),react_context_reducer__WEBPACK_IMPORTED_MODULE_8__=(__webpack_require__(336),__webpack_require__(406),__webpack_require__(82));function _slicedToArray(arr,i){return function _arrayWithHoles(arr){if(Array.isArray(arr))return arr}(arr)||function _iterableToArrayLimit(arr,i){var _arr=[],_n=!0,_d=!1,_e=void 0;try{for(var _s,_i=arr[Symbol.iterator]();!(_n=(_s=_i.next()).done)&&(_arr.push(_s.value),!i||_arr.length!==i);_n=!0);}catch(err){_d=!0,_e=err}finally{try{_n||null==_i.return||_i.return()}finally{if(_d)throw _e}}return _arr}(arr,i)||function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}var RootReducer=Object(react_context_reducer__WEBPACK_IMPORTED_MODULE_8__.a)("RootReducer",function(){var state=0<arguments.length&&void 0!==arguments[0]?arguments[0]:"react-context-reducer";1<arguments.length&&arguments[1];return state});Object(react_context_reducer__WEBPACK_IMPORTED_MODULE_8__.b)(RootReducer);var _ref=react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("div",null,react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("h1",null," Welcome to react-context-reducer examples!"),"These examples can are best seen in combination with ReduxDevTools.");Object(_storybook_react__WEBPACK_IMPORTED_MODULE_5__.storiesOf)("Welcome",module).add("to Storybook",function(){return _ref});var _ref2=react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(RootReducer.Provider,null,"Children"),_ref3=react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("div",null,"Children");Object(_storybook_react__WEBPACK_IMPORTED_MODULE_5__.storiesOf)("Provider",module).add("RootReducer.Provider",function(){return _ref2}).add("withContextProviders()(...)",Object(react_context_reducer__WEBPACK_IMPORTED_MODULE_8__.c)()(function(){return _ref3}));var _ref4=react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(RootReducer.Provider,null,react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(function(){var _RootReducer$use2=_slicedToArray(RootReducer.use(),2),state=_RootReducer$use2[0];_RootReducer$use2[1];return state},null));Object(_storybook_react__WEBPACK_IMPORTED_MODULE_5__.storiesOf)("Consumers",module).add("RootReducer.use()",function(){return _ref4})}.call(this,__webpack_require__(139)(module))},82:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__(16);var registeredContexts={},registerContext=function(decoratedContext){registeredContexts[decoratedContext.contextKey]=decoratedContext},getContext=function(contextKey){return registeredContexts[contextKey]},react=(__webpack_require__(73),__webpack_require__(17),__webpack_require__(9),__webpack_require__(15),__webpack_require__(12),__webpack_require__(29),__webpack_require__(0),__webpack_require__(2)),react_default=__webpack_require__.n(react);function _defineProperty(obj,key,value){return key in obj?Object.defineProperty(obj,key,{value:value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}var core_contextDecorator=function(contextKey,Context,Provider){var decoratedContext=function _objectSpread(target){for(var i=1;i<arguments.length;i++){var source=null==arguments[i]?{}:arguments[i],ownKeys=Object.keys(source);"function"==typeof Object.getOwnPropertySymbols&&(ownKeys=ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym){return Object.getOwnPropertyDescriptor(source,sym).enumerable}))),ownKeys.forEach(function(key){_defineProperty(target,key,source[key])})}return target}({},3<arguments.length&&void 0!==arguments[3]?arguments[3]:{},{contextKey:contextKey,Context:Context,connect:function connect(){var mapStoreToProps=0<arguments.length&&void 0!==arguments[0]?arguments[0]:function(){};return function(WrappedComponent){return function(props){var value=decoratedContext.use();return react_default.a.createElement(WrappedComponent,mapStoreToProps(value,props))}}},use:function use(){return Object(react.useContext)(Context)},Provider:Provider});return decoratedContext},recursiveProvider=function(WrappedComponent,contextKeys){if(0===contextKeys.length)return function(props){return react_default.a.createElement(WrappedComponent,props)};var contextKey=contextKeys.pop(),Provider=getContext(contextKey).Provider,Component=recursiveProvider(WrappedComponent,contextKeys);return function(props){return react_default.a.createElement(Provider,null,react_default.a.createElement(Component,props))}},withContextProviders=function(contextKeys){return function(WrappedComponent){return recursiveProvider(WrappedComponent,contextKeys||Object.keys(function(contextKeys){if(!contextKeys)return registeredContexts;var stores={};return contextKeys.forEach(function(contextKey){stores[contextKey]=getContext(contextKey)}),stores}()))}},prop_types=(__webpack_require__(20),__webpack_require__(56),__webpack_require__(67),__webpack_require__(68),__webpack_require__(69),__webpack_require__(22),__webpack_require__(415),__webpack_require__(57),__webpack_require__(184)),prop_types_default=__webpack_require__.n(prop_types);__webpack_require__(40);function ReduxDevToolsMiddleWare_defineProperty(obj,key,value){return key in obj?Object.defineProperty(obj,key,{value:value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}var reduxDevToolsActions_ReplaceState="@@REPLACE_STATE",defaultConfig={features:{dispatch:!0,persist:!1,reorder:!1,skip:!0,jump:!0,import:!1,export:!1,test:!1}},ReduxDevToolsMiddleWare=function(store,reducer){var options=2<arguments.length&&void 0!==arguments[2]?arguments[2]:{};if(window.__REDUX_DEVTOOLS_EXTENSION__){var extension=window.__REDUX_DEVTOOLS_EXTENSION__.connect(function ReduxDevToolsMiddleWare_objectSpread(target){for(var i=1;i<arguments.length;i++){var source=null==arguments[i]?{}:arguments[i],ownKeys=Object.keys(source);"function"==typeof Object.getOwnPropertySymbols&&(ownKeys=ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym){return Object.getOwnPropertyDescriptor(source,sym).enumerable}))),ownKeys.forEach(function(key){ReduxDevToolsMiddleWare_defineProperty(target,key,source[key])})}return target}({},defaultConfig,options));return extension.init(store.getState()),extension.subscribe(function(message){if("DISPATCH"===message.type&&message.payload)switch(message.payload.type){case"TOGGLE_ACTION":case"JUMP_TO_ACTION":case"JUMP_TO_STATE":var state=JSON.parse(message.state);store.dispatch({type:reduxDevToolsActions_ReplaceState,data:state})}}),function(state,action){var nextState=action.type===reduxDevToolsActions_ReplaceState?action.data:reducer(state,action);return action.type===reduxDevToolsActions_ReplaceState?nextState:(extension.send(action,nextState),nextState)}}return function(state,action){var nextState=reducer(state,action);return console.log("Action Triggered: ".concat(action.type," [").concat(options.name||"","]"),action),nextState}};function _toConsumableArray(arr){return function _arrayWithoutHoles(arr){if(Array.isArray(arr)){for(var i=0,arr2=Array(arr.length);i<arr.length;i++)arr2[i]=arr[i];return arr2}}(arr)||function _iterableToArray(iter){if(Symbol.iterator in Object(iter)||"[object Arguments]"===Object.prototype.toString.call(iter))return Array.from(iter)}(arr)||function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}function _slicedToArray(arr,i){return function _arrayWithHoles(arr){if(Array.isArray(arr))return arr}(arr)||function _iterableToArrayLimit(arr,i){var _arr=[],_n=!0,_d=!1,_e=void 0;try{for(var _s,_i=arr[Symbol.iterator]();!(_n=(_s=_i.next()).done)&&(_arr.push(_s.value),!i||_arr.length!==i);_n=!0);}catch(err){_d=!0,_e=err}finally{try{_n||null==_i.return||_i.return()}finally{if(_d)throw _e}}return _arr}(arr,i)||function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}var contextReducer_createContextReducer=function(contextKey,reducer){var middlewares=!!(2<arguments.length&&void 0!==arguments[2])&&arguments[2],Context=Object(react.createContext)(),initialState=reducer(void 0,{type:"@@INIT"}),WrappedContext=core_contextDecorator(contextKey,Context,function(){},{getInitialState:function getInitialState(){return initialState},getState:function getState(){return initialState},dispatch:function dispatch(){}}),enhancedReducer=ReduxDevToolsMiddleWare({getState:WrappedContext.getState,dispatch:function dispatch(action){return WrappedContext.dispatch(action)}},reducer,{name:contextKey});return WrappedContext.Provider=function(props){var value=useReducerStore(WrappedContext,enhancedReducer,initialState,middlewares);return react_default.a.createElement(Context.Provider,{value:value},props.children)},WrappedContext.Provider.propTypes={children:prop_types_default.a.any},WrappedContext},useReducerStore=function(WrappedContext,reducer,initialState,middlewares){var _useReducer2=_slicedToArray(Object(react.useReducer)(reducer,initialState),2),state=_useReducer2[0],_dispatch=_useReducer2[1],enhancedDispatch=_dispatch;if(middlewares&&Array.isArray(middlewares)&&middlewares.length){var middlewareAPI={getState:function getState(){return state},dispatch:function dispatch(action){return _dispatch(action)}},chain=middlewares.map(function(middleware){return middleware(middlewareAPI)});enhancedDispatch=compose.apply(void 0,_toConsumableArray(chain))(_dispatch)}return WrappedContext.getState=function(){return state},WrappedContext.dispatch=function(action){return enhancedDispatch(action)},[state,function(action){return enhancedDispatch(action)}]},compose=function(){for(var _len=arguments.length,funcs=Array(_len),_key=0;_key<_len;_key++)funcs[_key]=arguments[_key];return function(x){return funcs.reduceRight(function(composed,f){return f(composed)},x)}};__webpack_require__.d(__webpack_exports__,"b",function(){return registerContext}),__webpack_require__.d(__webpack_exports__,"c",function(){return withContextProviders}),__webpack_require__.d(__webpack_exports__,"a",function(){return contextReducer_createContextReducer})}},[[185,1,2]]]);
//# sourceMappingURL=main.de9e52ef1f1f17af277f.bundle.js.map