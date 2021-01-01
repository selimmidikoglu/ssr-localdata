import { applyMiddleware, createStore, combineReducers} from 'redux';
import {businessReducer} from './reducers/businessReducer';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
let RootReducer = combineReducers({
    businessReducer: businessReducer
})

const store = createStore(RootReducer,composeWithDevTools(applyMiddleware(thunk)))


export default store;