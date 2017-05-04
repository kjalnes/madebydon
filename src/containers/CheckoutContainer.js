import React, { Component } from 'react';
import { Link } from 'react-router';
import CreateUserForm from '../CreateUserForm';
import { connect } from 'react-redux'
import CheckoutStep1 from '../CheckoutStep1';
import CheckoutStep2 from '../CheckoutStep2';
import { completeCheckout } from '../reducers/orderReducer';
import { clearCart } from '../reducers/cartReducer';


const CheckoutContainer = (props) =>  {

    const { activeUser, router, children, orderId, order, errMessage } = props;

    return (

        <div className='container'>
             {
                activeUser && children ?
                <div>
                    { React.cloneElement(children, { ...props })}
                </div>
            :
                <div>
                    <CreateUserForm router={ router } />
                    Shopped with Don before?
                    <Link to='/login?checkout=true'> Sign in here.</Link>
                </div>
            }
        </div>
    )
}

const mapStateToProps = (state) => (
    {
        activeUser: state.auth.user,
        orderId: state.order.order && state.order.order[0] && state.order.order[0].id,
        order: state.order.order && state.order.order[0],
        errMessage: state.order.message
    }
)

const mapDispatchToProps = (dispatch, ownProps) => {
    return (
        {
            saveCheckoutStep: (userInfo, orderId, axiosFn, nextPath) => {
                dispatch( axiosFn(userInfo, orderId) )
                .then( () => ownProps.router.push(`/checkout/${nextPath}`))
                .catch( err => console.log(err))
            },

            completeCheckout: (order, payment)=>{
                dispatch(completeCheckout(order, payment)) // we need to return a promise
                .then( response => {
                    console.log('response', response)
                    console.log('response.order', response.order)
                    console.log('resonse.newOrder', response.newOrder)
                    return dispatch(clearCart())
                })
                // we have to reset the order in redux and local store
                .then( () => ownProps.router.push(`/checkout/confirm`))
                .catch( err => console.log('error', err))
            }
        }
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutContainer);

/*
Checkout steps
1. Login or create user
2. shipping
3. billing and credit card
4. verify
*/
