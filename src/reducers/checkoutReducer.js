import axios from 'axios';

/*** Constants ***/
import { ON_SAVE_STEP_SUCCESS } from '../constants/';

/*** Actions ***/
import { onSaveStepSuccess } from '../actions/checkout';


/*** Methods ***/
const onSaveStep = () => {
      return (dispatch) => {
        console.log('going to the next step!!')
        return dispatch(onSaveStepSuccess());
    }
}

/*** Reducer ***/
const initialState = {
    checkoutStep: 1
}

const checkoutReducer = (state = initialState, action) => {
    switch (action.type) {
        case ON_SAVE_STEP_SUCCESS:
            return { ...state, checkoutStep: state.checkoutStep + 1 }
        default:
            return state
    }
}

export default checkoutReducer;
export { onSaveStep };
