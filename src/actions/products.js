import {
  LOAD_PRODUCTS_SUCCESS,
  SELECT_PRODUCT_SUCCESS,
  DESELECT_PRODUCT_SUCCESS } from '../constants/'

const loadProductsSuccess = (products) => ({
  type: LOAD_PRODUCTS_SUCCESS,
  products: products
});

const selectProductSuccess = (product) => ({
  type: SELECT_PRODUCT_SUCCESS,
  product: product
});

const deSelectProductSuccess = () => ({
  type: SELECT_PRODUCT_SUCCESS
});


export {
    loadProductsSuccess,
    selectProductSuccess,
    deSelectProductSuccess
}
