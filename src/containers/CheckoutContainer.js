import React, { Component } from 'react';
import { Link } from 'react-router';
import CreateUserForm from '../CreateUserForm';
import { connect } from 'react-redux'
import CheckoutStep1 from '../CheckoutStep1';
import CheckoutStep2 from '../CheckoutStep2';
import { onSaveStep } from '../reducers/checkoutReducer';


const CheckoutContainer = (props) =>  {
    const { activeUser, router, checkoutStep, onSaveStep } = props;
    return (

        <div className='container'>

            { activeUser ?
                <div>
                    {
                        (checkoutStep === 1) ?
                            <CheckoutStep1 onSaveStep= { onSaveStep } /> : null
                    }
                    {
                        (checkoutStep === 2) ?
                            <CheckoutStep2 onSaveStep= { onSaveStep } /> : null
                    }

                </div>
            :
                <div>
                    <CreateUserForm router={ router } />
                    Shopped with Don before?
                    <Link to='/login'> Sign in here.</Link>
                </div>
            }
        </div>
    )
}

const mapStateToProps = (state) => (
    {
        activeUser: state.auth.user,
        checkoutStep: state.checkout.checkoutStep
    }
)

const mapDispatchToProps = (dispatch) => (
    {
        onSaveStep: () => dispatch(onSaveStep())
    }
)



export default connect(mapStateToProps, mapDispatchToProps)(CheckoutContainer);

/*
Checkout steps
1. Login or create user
2. shipping
3. billing and credit card
4. verify
*/
