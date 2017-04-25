import axios from 'axios';
import { loadCartSuccess, removeFromCartSuccess } from '../actions/';

// Constants
import { LOAD_CART, REMOVE_FROM_CART } from '../constants/';


// Initial State
const initialState = {
    order: 0,
    cartItems: []
};

// Methods
const loadCart = (orderId) => {
    return (dispatcher) => {
        axios.get(`/api/order/${orderId}`)
            .then(response => response.data)
            .then(order => {
                dispatcher(loadCartSuccess(order));
            })
            .catch(err => console.log('Error loadCart:', err));
    };
};

const removeFromCart = (orderId, productId) => {
    console.log('remove', orderId, productId)
    return (dispatch) => {
        axios.delete(`/api/order/${orderId}/${productId}`)
            .then(() => {
                dispatch(removeFromCartSuccess(productId));
            })
            .catch(err => console.log('Error: removeFromCart', err));
    };
};


const addToCart = (orderId, productId, qty = 1) => {
    console.log('addToCart', orderId);
    return (dispatch) => {
        console.log(`POST to /api/order/${orderId}/`);
        axios.post(`/api/order/${orderId}/`, { qty: qty, productId: productId })
            .then(response => response.data)
            .then(order => {
                dispatch(loadCartSuccess(order));
            })
            .catch(err => console.log('Error: addToCart', err));
    };
};




// Reducer
const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_CART:
            return Object.assign({}, state, { order: action.cart[0].id, cartItems: action.cart[0].orderlines });
        case REMOVE_FROM_CART:
            return Object.assign({}, state,
                {
                    cartItems: state.cartItems.filter(item => item.productId !== action.productId)
                });
        default:
            return state;
    }
};

export { loadCart, removeFromCart, addToCart };
export default cartReducer;
