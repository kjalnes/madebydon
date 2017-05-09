
import axios from 'axios';
import Scriptly from 'scriptly';
import store from '../store';
import { loadUser } from './authReducer';

/*** Constants ***/
import {
    LOAD_ORDER,
    LOAD_ERROR,
    COMPLETE_CHECKOUT,
    CONFIRM_ORDER_SUCCESS,
    LOAD_COMPLETED_ORDERS } from '../constants/';


/*** Actions ***/
import {
  loadOrderSuccess,
  confirmOrderSuccess,
  completedOrdersSuccess } from '../actions/order';


/*** Methods ***/

const loadOrder = (orderId) => {
    return (dispatch) => {
        return axios.get(`/api/order/${orderId}`)
            .then(response => response.data)
            .then(order => {
                dispatch(loadOrderSuccess(order))
            })
            .catch(err => console.log('Error loadOrder:', err));
    }
}

/* loads all previous orders */
const loadCompletedOrders = (userId) => {
    return (dispatch) => {
        return axios.get(`/api/user/${userId}/orders`)
            .then(response => response.data)
            .then(orders => {
                dispatch(completedOrdersSuccess(orders))
            })
            .catch(err => console.log('Error loadCompletedOrders:', err));
    }
}


/* remover this from the auth reducer */
const saveShipping = (userInfo, orderId) => {
    return (dispatch) => {
        return axios.post(`/api/order/${orderId}/shipping`, { userInfo })
            .then(response => response.data)
            .then(order => {
                return dispatch(loadOrder(orderId))
            })
            .catch(err => {
                return dispatch({ type: LOAD_ERROR, message: err.response.data.msg });
            })
    }
};

const saveBilling = (userInfo, orderId) => {
    return (dispatch) => {
        return axios.post(`/api/order/${orderId}/billing`, { userInfo })
            .then(response => response.data)
            .then(order => {
                return dispatch(loadOrder(orderId))
            })
            .catch(err => {
                return dispatch({ type: LOAD_ERROR, message: err.response.data.msg });
            })
    }
};



/* client sends CC directly to stripe, receives token if valid */
const createStripeToken = (card) => {
    return new Promise((res, rej) => {
        Stripe.setPublishableKey('pk_test_UC2pEf1LtfUlV6aQZVg0v9nY');
        Stripe.card.createToken(card, (status, response) => {
            if (response.error) rej(response.error);
            else res(response.id);
        });
    });
}

/* send client stripe token and orderId to our server */
/* in our server (order.js) we make async call with payment information and token to stripes server from our server */
/* stripe return confirmation nr and payment is complete */
const performCheckout = (order, token) => {
    return axios.post(`/api/order/${order.id}/payment`, { token })
        .then(response => response.data)
        .then(data => {
            return data
        })


    // Axios POST to finish the order on the server
    // and posibily trigger the confirmation email
}

const completeCheckout = (order, payment) => {
    return (dispatch) => {
        return Scriptly.loadJavascript('https://js.stripe.com/v2/')
            .then(() => (createStripeToken(payment)))
            .then((token) => (performCheckout(order, token)))
            .then(data => {
                dispatch(loadUser(localStorage.getItem('token')))
                return dispatch(confirmOrderSuccess(data))
            })
            .catch(err => {
                return dispatch({ type: LOAD_ERROR, message: err.message });
            });
    };
}

const confirmOrder = () => {
    return (dispatch) => {

    }
}


/*** Reducer ***/

const initialState = { message: '' };

const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_ORDER:
            return { ...state, order: action.order, message: '' }
        case LOAD_ERROR:
            return { ...state, message: action.message }
        case CONFIRM_ORDER_SUCCESS:
            return { ...state, order: action.newOrder, completedOrders: state.completedOrders.concat([action.order]), lastOrderId: action.order.id, message: ''  }
        case LOAD_COMPLETED_ORDERS:
            return { ...state, completedOrders: action.completedOrders, message: ''  }
    }
    return state
};


export { loadOrder, saveShipping, saveBilling, completeCheckout, loadCompletedOrders };
export default orderReducer;


