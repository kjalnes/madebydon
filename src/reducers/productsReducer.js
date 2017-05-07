import axios from 'axios';
const LOAD_PRODUCTS_SUCCESS = 'LOAD_PRODUCTS_SUCCESS';
const SELECT_PRODUCT_SUCCESS = 'SELECT_PRODUCT_SUCCESS';
const DESELECT_PRODUCT_SUCCESS = 'DESELECT_PRODUCT_SUCCESS';

const loadProductsSuccess = (products) => ({
  type: LOAD_PRODUCTS_SUCCESS,
  products: products
});

const loadProducts = () => {
  return (dispatch) => {
    return axios.get('/api/products')
      .then(response => dispatch(loadProductsSuccess(response.data)));
  };
};


const selectProductSuccess = (product) => ({
  type: SELECT_PRODUCT_SUCCESS,
  product: product
});

const selectProduct = (product) => {
  return (dispatch) => {
    dispatch(selectProductSuccess(product));
  };
};


const deSelectProductSuccess = () => ({
  type: SELECT_PRODUCT_SUCCESS
});

const deSelectProduct = () => {
  return (dispatch) => {
    dispatch(deSelectProductSuccess());
  };
};




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
