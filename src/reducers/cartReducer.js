import axios from 'axios';
import { loadCartSuccess, removeFromCartSuccess, addToCartSuccess } from '../actions/';

// Constants
import { LOAD_CART, REMOVE_FROM_CART, ADD_TO_CART } from '../constants/';


// Initial State
const initialState = {
    cartItems: [] // array of orderline objects
};


// Methods

// Load the state of
// the cart from localstorage
const loadState = () => {
    try {
        const serializedState = localStorage.getItem('cart');
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return undefined;
    }

}

// Save the cart state 
// to localStorage
const saveState = (state) => {
    try {
        const serializeState = JSON.stringify(state);
        localStorage.setItem('cart', serializeState)
    } catch (err) {
        //do nothing
    }
}

// Load Cart
// from localStorage
const loadCart = (orderId) => {

    if (orderId === 0) {
        return (dispatch) => {
            const cart = loadState();
            dispatch(loadCartSuccess(cart));
            return Promise.resolve();
        }
    }

    return (dispatch) => {
        axios.get(`/api/order/${orderId}`)
            .then(response => response.data)
            .then(order => {
                dispatch(loadCartSuccess(order));
            })
            .catch(err => console.log('Error loadCart:', err));
    };
};


// Remove items 
// from the cart
const removeFromCart = (orderId, productId) => {
    // Check if Anonymous
    if (orderId === 0) {
        // Run local
        return (dispatch) => {
            dispatch(removeFromCartSuccess(productId));
            return Promise.resolve();
        };
    }
    // Load logged user cart
    return (dispatch) => {
        axios.delete(`/api/order/${orderId}/${productId}`)
            .then(() => {
                dispatch(removeFromCartSuccess(productId));
            })
            .catch(err => console.log('Error: removeFromCart', err));
    };
};

// Add items to 
// the cart
const addToCart = (orderId, product, qty = 1) => {
    console.log('addToCart', orderId)
    // Check if Anonymous
    if (orderId === 0) {
        // Run local
        return (dispatch) => {
            dispatch(addToCartSuccess(orderId, product, qty));
            return Promise.resolve();
        };
    }
    // Load logged user cart
    return (dispatch) => {
        axios.post(`/api/order/${orderId}/`, { qty: qty, product })
            .then(response => response.data)
            .then((response) => {
                console.log('response from the server', response);
                dispatch(addToCartSuccess(orderId, product, qty))
            })
            .catch(err => console.log('Error: addToCart', err));
    };
};



// Reducer
const cartReducer = (state = loadState() || initialState, action) => {
    switch (action.type) {
        case LOAD_CART:
            return { ...state, cartItems: action.cart[0].orderlines }
        case REMOVE_FROM_CART:
            return { ...state, cartItems: state.cartItems.filter(item => item.productId !== action.productId) }
        case ADD_TO_CART:
            let cartItems;
            let productExistsInCart = state.cartItems.some(item => item.productId === action.product.id) // boolean
            if (productExistsInCart) {
                cartItems = state.cartItems.map(_item => {
                    if (_item.productId === action.product.id) {
                        _item.qty += action.qty
                    }
                    return _item
                })
            } else {
                cartItems = state.cartItems.concat([{
                    orderId: action.orderId,
                    qty: action.qty,
                    product: action.product,
                    productId: action.product.id
                }])
            }
            return { ...state, cartItems }
        default:
            return state;
    }
};

export { loadCart, removeFromCart, addToCart, loadState, saveState };
export default cartReducer;
