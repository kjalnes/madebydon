import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import productsReducer, { loadProducts} from './productsReducer';
import authReducer from './reducers/authReducer';
import cartReducer, { loadCart } from './reducers/cartReducer';

const combined = combineReducers({
  products: productsReducer,
  auth: authReducer,
  cart: cartReducer
});

const store = createStore(combined, applyMiddleware(thunk));

store.dispatch(loadProducts());

export default store;
