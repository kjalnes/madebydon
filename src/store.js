import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import productsReducer, { loadProducts } from './reducers/productsReducer';
import authReducer, {loadUser} from './reducers/authReducer';
import cartReducer from './reducers/cartReducer';

const combined = combineReducers({
  products: productsReducer,
  auth: authReducer,
  cart: cartReducer
});

/*
 * download the redux devtools chrome extension for this to work - https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en
*/
const reduxDevtools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
let store;

if (reduxDevtools) {
    store = createStore(combined, reduxDevtools(applyMiddleware(thunk)));
} else {
    store = createStore(combined, applyMiddleware(thunk));
}

// Initial Load of data
// Products
store.dispatch(loadProducts());

// User
const token = localStorage.getItem('token');
if (token) {
  store.dispatch(loadUser(token))
}




export default store;
