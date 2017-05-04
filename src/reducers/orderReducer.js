import axios from 'axios';
import store from '../store';

/*** Constants ***/
// import {  } from '../constants/';
const LOAD_ORDER = 'LOAD_ORDER';

/*** Actions ***/
// import {  } from '../actions/login';
const loadOrderSuccess = (order) => ({
    type: LOAD_ORDER,
    order: order
});


/**** Methods ***/

const loadOrder = (orderId) => {
    return (dispatch) => {
        return axios.get(`/api/order/${orderId}`)
        .then( response => response.data )
        .then( order => {
            console.log('order loaded', order)
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



/*** Reducer ***/

const initialState = {};

const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_ORDER:
            return {...state, order: action.order }
    }
    return state
};


export { loadOrder, saveShipping, saveBilling };

export default orderReducer;


