import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import productsReducer, { loadProducts } from './productsReducer';
import authReducer, {loadUser} from './reducers/authReducer';
import cartReducer from './reducers/cartReducer';

const combined = combineReducers({
  products: productsReducer,
  auth: authReducer,
  cart: cartReducer
});

const store = createStore(combined, applyMiddleware(thunk));


// Initial Load of data
// Products
store.dispatch(loadProducts());

// User
const token = localStorage.getItem('token');
if (token) {
  store.dispatch(loadUser(token))
}




export default store;
