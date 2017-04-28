import axios from 'axios';
import { loadCartSuccess, removeFromCartSuccess, addToCartSuccess } from '../actions/';

// Constants
import { LOAD_CART, REMOVE_FROM_CART, ADD_TO_CART } from '../constants/';


// Initial State
const initialState = {
    orderId: 0,
    cartItems: [] // array of orderline objects
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
    return (dispatch) => {
        axios.delete(`/api/order/${orderId}/${productId}`)
            .then(() => {
                dispatch(removeFromCartSuccess(productId));
            })
            .catch(err => console.log('Error: removeFromCart', err));
    };
};


const addToCart = (orderId, product, qty = 1) => {
    return (dispatch) => {
        axios.post(`/api/order/${orderId}/`, { qty: qty, product })
            .then(response => response.data)
            .then( () => {
                dispatch(addToCartSuccess(orderId, product, qty))
                // dispatch(loadCartSuccess(order));
            })
            .catch(err => console.log('Error: addToCart', err));
    };
};


// Reducer
const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_CART:
            return {...state, orderId: action.cart[0].id, cartItems: action.cart[0].orderlines }
        case REMOVE_FROM_CART:
            return {...state, cartItems: state.cartItems.filter(item => item.productId !== action.productId)}
        case ADD_TO_CART:
            const item = {  orderId: action.orderId,
                            qty: action.qty,
                            product: action.product,
                            productId: action.product.id
                        }
            return {...state, cartItems: state.cartItems.concat(item) }
        default:
            return state;
    }
};

export { loadCart, removeFromCart, addToCart };
export default cartReducer;
