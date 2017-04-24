import axios from 'axios';

// Constants
import { LOAD_CART, REMOVE_FROM_CART } from '../constants/actions';


// Actions Creators
const loadCartSuccess = (cart) => ({
    type: LOAD_CART,
    cart: cart
});

const removeFromCartSuccess = (order) => ({
    type: REMOVE_FROM_CART,
    order: order
})


// Initial State
const initialState = {
    cartItems: []
};

// Methods
const loadCart = (orderId = 1) => {
    return (dispatcher) => {
        axios.get(`/api/order/${orderId}`)
            .then(response => response.data)
            .then(order => {
                dispatcher(loadCartSuccess(order));
            })
            .catch(err => console.log('loadCart err:', err));
    };
};

const removeFromCart = (orderId, product) => {
    return (dispatcher) => {
        axios.delete(`/api/order/${orderId}`, product)
            .then(response => response.data)
            .then(order => {
                dispatcher(removeFromCartSuccess(order));
            })
            .catch(err => console.log('removeFromCart err:', err));
    };
};




// Reducer
const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_CART:
            return Object.assign({}, state, { cartItems: action.cart[0].orderlines });
        default:
            return state;
    }
};

export { loadCart, removeFromCart };
export default cartReducer;
