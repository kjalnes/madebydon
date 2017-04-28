import { LOGIN_SUCCESS, LOGOUT_SUCCESS, LOAD_CART, REMOVE_FROM_CART, ADD_TO_CART } from '../constants/';
// authReducer
const loginSuccess = (user)=> ({
  type: LOGIN_SUCCESS,
  user: user
});

const logoutSuccess = () => ({
    type: LOGOUT_SUCCESS,
    user: null
});

// cartReducer
const loadCartSuccess = (cart) => ({
    type: LOAD_CART,
    cart: cart
});

const removeFromCartSuccess = (productId) => ({
    type: REMOVE_FROM_CART,
    productId: productId
});

const addToCartSuccess = (orderId, product, qty) => ({
    type: ADD_TO_CART,
    orderId: orderId,
    product: product,
    qty: qty
});

export { loginSuccess, logoutSuccess, loadCartSuccess, removeFromCartSuccess, addToCartSuccess }
