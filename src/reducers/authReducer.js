import axios from 'axios';
import { loadCart, clearCart } from './cartReducer';
import { loadOrder, loadCompletedOrders } from './orderReducer';
import store from '../store';

/*** Constants ***/
import { LOGIN_SUCCESS, LOGOUT_SUCCESS } from '../constants/';
const CREATE_USER_FAILURE = 'CREATE_USER_FAILURE';

/*** Actions ***/
import { loginSuccess, logoutSuccess } from '../actions/login';
import { loadState } from './cartReducer';


/**** Methods ***/

// Load the user from the token
// Load order, completed order and cart
const loadUser = (token) => {
    return (dispatch) => {
        if (token) {
            axios.get(`/api/session/${token}`)
                .then( response => response.data)
                .then( user => {
                    dispatch(loginSuccess(user));
                    dispatch(loadCompletedOrders(user.id));
                    dispatch(loadCart(user.orders[0].id));
                    dispatch(loadOrder(user.orders[0].id));
                    // return user.orders[0].id
                })
                // .then( orderId => {
                    // dispatch(loadCart(orderId));
                    // dispatch(loadOrder(orderId));
                // })
                .catch( err => console.log(err));
        }
    };
};

const login = (credentials) => {
    return (dispatch) => {
        return axios.post('/api/session', credentials)
            .then(response => response.data)
            .then(data => {
                localStorage.setItem('token', data.token);
                dispatch(loadUser(data.token));
            })
            .catch(err => console.log(err));
    }
}

const logout = () => {
    return (dispatch) => {
        localStorage.clear();
        dispatch(logoutSuccess());
        dispatch(clearCart());
    }
};

const createUser = (userInfo) => {
    const cart = loadState();
    return(dispatch) => {
        return axios.post('/api/user', { userInfo, cart } )
            .then( response => response.data)
            .then( user => {
              dispatch(login({ email: user.email, password: user.password }))
        })
        .catch(err => {
            // dispatch({type: CREATE_USER_FAILURE, errMsg: err.message })
                dispatch({type: CREATE_USER_FAILURE, errMsg: 'Create user failed. Check that the informaiton you have provided is valid' })
            console.log('login failed, this is the err', err)
        })
    }
};



/*** Reducer ***/

const initialState = {};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {...state, user: action.user }
        case LOGOUT_SUCCESS:
            return {...state, user: null }
        case CREATE_USER_FAILURE:
            return {...state, errMsg: action.errMsg }
    }
    return state
};


export {
    login,
    logout,
    loadUser,
    createUser
};

export default authReducer;


