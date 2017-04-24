import axios from 'axios';

// Constants
import { LOAD_CART } from '../constants/actions';


// Actions Creators
const loadCartSuccess = (cart) => ({
    type: LOAD_CART,
    cart: cart
});

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

// Reducer
const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_CART:
            console.log('Cart loaded', action.cart[0]);
            state =  Object.assign({}, state, { cartItems: action.cart[0].orderlines });
            console.log('new+state=',state);
            return state;
        default:
            return state;
    }
};

export { loadCart };
export default cartReducer;
