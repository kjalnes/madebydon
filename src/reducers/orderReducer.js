
import axios from 'axios';
import Scriptly from 'scriptly';
import store from '../store';


/*** Constants ***/
// import {  } from '../constants/';
const LOAD_ORDER = 'LOAD_ORDER';
const LOAD_ERROR = 'LOAD_ERROR';
const COMPLETE_CHECKOUT = 'COMPLETE_CHECKOUT';
const CONFIRM_ORDER_SUCCESS = 'CONFIRM_ORDER_SUCCESS';

/*** Actions ***/
// import {  } from '../actions/login';
const loadOrderSuccess = (order) => ({
    type: LOAD_ORDER,
    order: order
});

const confirmOrderSuccess = (order) => ({
    type: CONFIRM_ORDER_SUCCESS,
    order: order
});

/**** Methods ***/

const loadOrder = (orderId) => {
    return (dispatch) => {
        return axios.get(`/api/order/${orderId}`)
        .then( response => response.data )
        .then( order => {
            dispatch(loadOrderSuccess(order))
        })
        .catch(err => console.log('Error loadOrder:', err));
    }
}


/* remover this from the auth reducer */
const saveShipping = (userInfo, orderId) => {
    return(dispatch) => {
        return axios.post(`/api/order/${orderId}/shipping`, { userInfo } )
            .then( response => response.data)
            .then( order => {
                return dispatch(loadOrderSuccess(order))
        })
        .catch(err => console.log(err))
    }
};

const saveBilling = (userInfo, orderId) => {
    return(dispatch) => {
        return axios.post(`/api/order/${orderId}/billing`, { userInfo } )
            .then( response => response.data)
            .then( order => {
                return dispatch(loadOrderSuccess(order))
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
    .then( response => {
        console.log('response from performCheckout',response)
        return response;
    })


    // Axios POST to finish the order on the server
    // and posibily trigger the confirmation email
}

const completeCheckout = (order, payment) => {

    return(dispatch) => {
        return Scriptly.loadJavascript('https://js.stripe.com/v2/')
            .then(() => (createStripeToken(payment)))
            .then((token) => (performCheckout(order, token)))
            .then((payload) => {
                return dispatch(confirmOrderSuccess(order))
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
            return {...state, order: action.order }
    }
    return state
};


export { loadOrder, saveShipping, saveBilling, completeCheckout };

export default orderReducer;


