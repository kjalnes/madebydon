import axios from 'axios';
import { loadCart, clearCart } from './cartReducer';
import store from '../store';
import { LOGIN_SUCCESS, LOGOUT_SUCCESS } from '../constants/';
import { loginSuccess, logoutSuccess } from '../actions/';

// Load the user from the token
const loadUser = (token) => {
    return (dispatcher) => {
        if (token) {
            axios.get(`/api/session/${token}`)
                .then(response => response.data)
                .then(user => {
                    dispatcher(loginSuccess(user))
                    // console.log('user cart id ',user.orders[0].id );
                    return user.orders[0].id
                })
                .then((orderId)=>{
                    console.log('orderid', orderId)
                    dispatcher(loadCart(orderId));
                })
                .catch( err => console.log(err));
        }
    };
};

const login = (credentials) => {
    return (dispatcher) => {
        axios.post('/api/session', credentials)
            .then(response => response.data)
            .then(data => {
                localStorage.setItem('token', data.token);
                dispatcher(loadUser(data.token));
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
}

// api/user
const createUser = (userInfo, cart) => {
    return(dispatch) => {
        axios.post('/api/user',  userInfo )
        .then( response => response.data)
        .then( user => {
            // user is created in database but login breaks because of
            // the include in our session.js file line 35 breaks...
            // We have to create order and orderlines based on localstate cart
            // currently being passed as argument
          dispatch(login({ email: user.email, password: user.password }))
      })
        .catch(err => console.log(err))
    }
}


const initialState = {};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {...state, user: action.user }
        case LOGOUT_SUCCESS:
            return {...state, user: null }
    }
    return state
}

export { login, logout, loadUser, createUser };
export default authReducer;


