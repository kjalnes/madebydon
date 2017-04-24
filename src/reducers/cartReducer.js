import axios from 'axios';
import { loadCartSuccess, removeFromCartSuccess } from '../actions/';

// Constants
import { LOAD_CART, REMOVE_FROM_CART } from '../constants/';





// Initial State
const initialState = {
    cartItems: []
};

// Methods
const loadCart = (orderId) => {
    console.log('orderId', orderId)
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
