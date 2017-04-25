import axios from 'axios';
import { loadCart } from './cartReducer';
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
                    dispatcher(loginSuccess(user));
                    store.dispatch(loadCart(user.orders[0].id));
                });
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
        console.assert('localStorage clear');
        localStorage.clear();
        return dispatcher(logoutSuccess())
    }
}


const initialState = { session: !!sessionStorage.jwt };

const authReducer = (state = initialState, action) => {
    console.log('authReducer', state);
    console.log('token', localStorage.getItem('token'));
    switch (action.type) {
        case LOGIN_SUCCESS:
            return Object.assign({}, state, { user: action.user })
        case LOGOUT_SUCCESS:
            return Object.assign({}, state, { user: null })
    }
    return state
}

export { login, logout, loadUser };
export default authReducer;


