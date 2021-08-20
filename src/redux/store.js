// 引入createStore，专门用于创建redux中最为核心的store对象
import {createStore, applyMiddleware} from 'redux';

// 引入为Count组件服务的reducer
import reducer from './reducers';
//引入redux-thunk，用于支持异步action
import thunk from 'redux-thunk';
// 暴露store
//引入redux-devtools-extension
import {composeWithDevTools} from 'redux-devtools-extension';
// import hardSet from "redux-persist/lib/stateReconciler/hardSet";

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));
export default store;
