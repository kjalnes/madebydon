import { LOGIN_SUCCESS,
         LOGOUT_SUCCESS } from '../constants/';

// authReducer
const loginSuccess = (user)=> ({
  type: LOGIN_SUCCESS,
  user: user
});

const logoutSuccess = () => ({
    type: LOGOUT_SUCCESS,
    user: null
});

export {
    loginSuccess,
    logoutSuccess
}
