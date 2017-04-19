import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import productsReducer, { loadProducts} from './productsReducer';


const combined = combineReducers({
  products: productsReducer,
});

const store = createStore(combined, applyMiddleware(thunk));


store.dispatch(loadProducts());

export default store;
