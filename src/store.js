import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import productsReducer, { loadProducts } from './reducers/productsReducer';
import authReducer, { loadUser } from './reducers/authReducer';
import cartReducer, { saveState } from './reducers/cartReducer';
import checkoutReducer, { onSaveStep } from './reducers/checkoutReducer';

const combined = combineReducers({
  products: productsReducer,
  auth: authReducer,
  cart: cartReducer,
  checkout: checkoutReducer
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

// Cart
/* globally listens to any change in the redux store and saves
those changes in the cart to the local storage */
store.subscribe(() => {
  saveState(store.getState().cart);
});



export default store;
