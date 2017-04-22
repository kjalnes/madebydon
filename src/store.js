import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import productsReducer, { loadProducts} from './productsReducer';
import authReducer from './authReducer';

const combined = combineReducers({
  products: productsReducer,
  auth: authReducer
});

const store = createStore(combined, applyMiddleware(thunk));


store.dispatch(loadProducts());

export default store;
