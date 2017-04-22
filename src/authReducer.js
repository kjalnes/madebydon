import axios from 'axios';

// CONSTANTS
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

// ACTIONS
const loginSuccess = (user)=> ({
  type: LOGIN_SUCCESS,
  user: user
});

const logoutSuccess = () => ({
    type: LOGOUT_SUCCESS,
    user: null
});

const login = ( credentials ) => {
    return( dispatcher ) => {
        axios.post('/api/session', credentials)
        .then( response => response.data )
        .then( data => {
            localStorage.setItem('token', data.token)
            axios.get(`/api/session/${data.token}`)
            .then( response => response.data)
            .then( user => {
                dispatcher(loginSuccess(user))
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


