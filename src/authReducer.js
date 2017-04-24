import axios from 'axios';
import { loadCart } from './reducers/cartReducer';
import  store  from './store';
import { LOGIN_SUCCESS, LOGOUT_SUCCESS } from './constants/';
import { loginSuccess, logoutSuccess } from './actions/';



const login = ( credentials ) => {
    return( dispatcher ) => {
        axios.post('/api/session', credentials)
        .then( response => response.data )
        .then( data => {
            localStorage.setItem('token', data.token)
            axios.get(`/api/session/${data.token}`)
            .then( response => response.data)
            .then( user => {
                console.log('loginSuccess', loginSuccess)
                // console.log('user from login fn ', user)
                dispatcher(loginSuccess(user))
                store.dispatch(loadCart(user.orders[0].id))
            })
        })
        .catch( err => console.log(err))
    }
}

const logout = () => {
    return (dispatcher) => {
        localStorage.clear();
        return dispatcher(logoutSuccess())
    }
}

const authReducer = (state={}, action) => {
    switch(action.type) {
        case LOGIN_SUCCESS:
            return Object.assign({}, state, { user: action.user })
        case LOGOUT_SUCCESS:
            return Object.assign({}, state, { user: null})
    }
    return state
}

export { login, logout };
export default authReducer;


