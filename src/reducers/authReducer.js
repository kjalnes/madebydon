import axios from 'axios';
import { loadCart, clearCart } from './cartReducer';
import store from '../store';

/*** Constants ***/
import { LOGIN_SUCCESS, LOGOUT_SUCCESS } from '../constants/';

/*** Actions ***/
import { loginSuccess, logoutSuccess } from '../actions/login';
import { loadState } from './cartReducer';


/**** Methods ***/

// Load the user from the token
const loadUser = (token) => {
    return (dispatch) => {
        if (token) {
            axios.get(`/api/session/${token}`)
                .then(response => response.data)
                .then(user => {
                    dispatch(loginSuccess(user))
                    return user.orders[0].id
                })
                .then((orderId)=>{
                    dispatch(loadCart(orderId));
                })
                .catch( err => console.log(err));
        }
    };
};

const login = (credentials) => {
    return (dispatch) => {
        axios.post('/api/session', credentials)
            .then(response => response.data)
            .then(data => {
                localStorage.setItem('token', data.token);
                dispatch(loadUser(data.token));
            })
            .catch(err => console.log(err));
    }
}

const logout = () => {
    return (dispatcher) => {
        localStorage.clear(); // Clear the token and the cart
        dispatcher(logoutSuccess()); // how to chain them?
        dispatcher(clearCart());
    }
};

const createUser = (userInfo) => {
    const cart = loadState();
    return(dispatch) => {
        axios.post('/api/user', { userInfo, cart } )
        .then( response => response.data)
        .then( user => {
          dispatch(login({ email: user.email, password: user.password }))
      })
        .catch(err => console.log(err))
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


