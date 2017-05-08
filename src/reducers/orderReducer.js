
import axios from 'axios';
import Scriptly from 'scriptly';
import store from '../store';
import {loadUser} from './authReducer';

/*** Constants ***/
// import {  } from '../constants/';
const LOAD_ORDER = 'LOAD_ORDER';
const LOAD_ERROR = 'LOAD_ERROR';
const COMPLETE_CHECKOUT = 'COMPLETE_CHECKOUT';
const CONFIRM_ORDER_SUCCESS = 'CONFIRM_ORDER_SUCCESS';
const LOAD_COMPLETED_ORDERS = 'LOAD_COMPLETED_ORDERS';

/*** Actions ***/
// import {  } from '../actions/login';
const loadOrderSuccess = (order) => ({
    type: LOAD_ORDER,
    order: order
});

const confirmOrderSuccess = (orders) => ({
    type: CONFIRM_ORDER_SUCCESS,
    order: orders.order,
    newOrder: orders.newOrder
});

const completedOrdersSuccess = (orders) => ({
    type: LOAD_COMPLETED_ORDERS,
    completedOrders: orders
});



/**** Methods ***/

const loadOrder = (orderId) => {
    console.log('loadOrder being called yall', orderId)
    return (dispatch) => {
        return axios.get(`/api/order/${orderId}`)
        .then( response => response.data )
        .then( order => {
            dispatch(loadOrderSuccess(order))
        })
        .catch(err => console.log('Error loadOrder:', err));
    }
}

/* loads all previous orders */
const loadCompletedOrders = (userId) => {
    return (dispatch) => {
        return axios.get(`/api/user/${userId}/orders`)
        .then( response => response.data )
        .then( orders => {
            dispatch(completedOrdersSuccess(orders))
        })
        .catch(err => console.log('Error loadCompletedOrders:', err));
    }
}


/* remover this from the auth reducer */
const saveShipping = (userInfo, orderId) => {
    return(dispatch) => {
        return axios.post(`/api/order/${orderId}/shipping`, { userInfo } )
            .then( response => response.data)
            .then( order => {
                dispatch(loadOrder(orderId))
        })
        .catch(err => console.log(err))
    }
};

const saveBilling = (userInfo, orderId) => {
    return(dispatch) => {
        return axios.post(`/api/order/${orderId}/billing`, { userInfo } )
            .then( response => response.data)
            .then( order => {
                dispatch(loadOrder(orderId))
        })
        .catch(err => console.log('error saveBilling', err))
    }
};



/* client sends CC directly to stripe, receives token if valid */
const createStripeToken = (card) => {
    return new Promise((res, rej) => {
        Stripe.setPublishableKey('pk_test_UC2pEf1LtfUlV6aQZVg0v9nY');
        Stripe.card.createToken(card, (status, response) => {
                    if(response.error) rej(response.error);
                    else res(response.id);
                });
    });
}

/* send client stripe token and orderId to our server */
/* in our server (order.js) we make async call with payment information and token to stripes server from our server */
/* stripe return confirmation nr and payment is complete */
const performCheckout = (order, token) => {
    console.log('order', order)
    console.log(`Using token (${token}) to purchase ${order.id} with a total????`);

    return axios.post(`/api/order/${order.id}/payment`, { token })
    .then( response =>  response.data)
    .then( data =>  {
        console.log('data', data)
        return data
    })


    // Axios POST to finish the order on the server
    // and posibily trigger the confirmation email
}

const completeCheckout = (order, payment) => {
    return(dispatch) => {
        return Scriptly.loadJavascript('https://js.stripe.com/v2/')
            .then(() => (createStripeToken(payment)))
            .then((token) => (performCheckout(order, token)))
            .then( data => {
                dispatch(loadUser(localStorage.getItem('token')))
                return dispatch(confirmOrderSuccess( data ))
            })
            .catch(err => {
                console.log('cascade error',err);
                return dispatch({type: LOAD_ERROR, message:err.message});
            });
    };
}

const confirmOrder = () => {
    return (dispatch) => {

    }
}


/*** Reducer ***/

const initialState = {message:''};

const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_ORDER:
            return {...state, order: action.order }
        case LOAD_ERROR:
            return {...state, message: action.message }
        case CONFIRM_ORDER_SUCCESS:
            return {...state, order: action.newOrder, completedOrders: state.completedOrders.concat([action.order]) }
        case LOAD_COMPLETED_ORDERS:
            return {...state, completedOrders: action.completedOrders }
    }
    return state
};


export {
    loadOrder,
    saveShipping,
    saveBilling,
    completeCheckout,
    loadCompletedOrders
};

export default orderReducer;


