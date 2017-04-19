import axios from 'axios';
const LOAD_PRODUCTS_SUCCESS = 'LOAD_PRODUCTS_SUCCESS';
const DESTROY_PRODUCT_SUCCESS = 'DESTROY_PRODUCT_SUCCESS';

const loadProductsSuccess = (products)=> ({
  type: LOAD_PRODUCTS_SUCCESS,
  products: products
});

const loadProducts = ()=> {
  return (dispatch)=> {
    return axios.get('/api/products')
      .then(response => dispatch(loadProductsSuccess(response.data)));
  };
};

const destroyProductSuccess = (product)=> ({
  type: DESTROY_PRODUCT_SUCCESS,
  product: product
});

const destroyProduct = (product)=> {
  return (dispatch)=> {
    return axios.delete(`/api/products/${product.id}`)
      .then(response => dispatch(destroyProductSuccess(product)));
  };
};



export {
  destroyProduct,
  loadProducts
};


const productsReducer = (state=[], action)=> {
  switch(action.type){
    case LOAD_PRODUCTS_SUCCESS:
      state = action.products;
      break;
    case DESTROY_PRODUCT_SUCCESS:
      state = state.filter(product=> product.id != action.product.id);
      break;
  }
  return state;
};

export default productsReducer;
