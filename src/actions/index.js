import { LOGIN_SUCCESS, LOGOUT_SUCCESS, LOAD_CART, REMOVE_FROM_CART } from '../constants/';
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

export { loginSuccess, logoutSuccess, loadCartSuccess, removeFromCartSuccess }
