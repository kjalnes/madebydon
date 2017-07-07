import axios from 'axios';

/*** Constants ***/
import {
  LOAD_PRODUCTS_SUCCESS,
  SELECT_PRODUCT_SUCCESS,
  DESELECT_PRODUCT_SUCCESS } from '../constants/'


/*** Actions ***/
import {
  loadProductsSuccess,
  selectProductSuccess,
  deSelectProductSuccess } from '../actions/products'


/*** Methods ***/

const loadProducts = () => {
  return (dispatch) => {
    return axios.get('/api/products')
      .then(response => dispatch(loadProductsSuccess(response.data)));
  };
};

const selectProduct = (product) => {
  return (dispatch) => {
    dispatch(selectProductSuccess(product));
  };
};

const deSelectProduct = () => {
  return (dispatch) => {
    dispatch(deSelectProductSuccess());
  };
};

/*** Reducer ***/

const productsReducer = (state = { list: [], selectedProduct: undefined }, action) => {
  switch (action.type) {
    case LOAD_PRODUCTS_SUCCESS:
      state = { ...state, list: action.products };
      break;
    case SELECT_PRODUCT_SUCCESS:
      state = { ...state, selectedProduct: action.product };
      break;
    case DESELECT_PRODUCT_SUCCESS:
      state = { ...state, selectedProduct: null };
      break;
  }
  return state;
};

export { loadProducts, selectProduct, deSelectProduct };
export default productsReducer;
