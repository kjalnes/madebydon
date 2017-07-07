import {
    LOAD_CART,
    REMOVE_FROM_CART,
    ADD_TO_CART,
    CLEAR_CART } from '../constants/';


const loadCartSuccess = (cart) => ({
    type: LOAD_CART,
    cart: cart
});

const removeFromCartSuccess = (productId) => ({
    type: REMOVE_FROM_CART,
    productId: productId
});

const addToCartSuccess = (orderId, product, qty, overwriteQty) => ({
    type: ADD_TO_CART,
    orderId: orderId,
    product: product,
    qty: qty,
    overwriteQty: overwriteQty
});

const clearCartSuccess = () => ({type: CLEAR_CART});

export {
    loadCartSuccess,
    removeFromCartSuccess,
    addToCartSuccess,
    clearCartSuccess
 }
