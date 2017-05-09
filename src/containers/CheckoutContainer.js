import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import CreateUserForm from '../components/user/CreateUserForm';
import { completeCheckout } from '../reducers/orderReducer';
import { clearCart } from '../reducers/cartReducer';


const CheckoutContainer = (props) => {

    const {
        activeUser,
        router,
        children,
        orderId,
        order,
        errMessage,
        completedOrders,
        errAuth } = props;

    return (

        <div className='container'>
            {
                activeUser && children ?
                    <div>
                        {React.cloneElement(children, { ...props })}
                    </div>
                    :
                    <div>
                        <CreateUserForm router={router} errAuth={errAuth} />
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
        errMessage: state.order.message,
        completedOrders: state.order.completedOrders,
        errAuth: state.auth.errMsg,
        lastOrderId: state.order.lastOrderId

    }
)

const mapDispatchToProps = (dispatch, ownProps) => {
    return (
        {
            saveCheckoutStep: (userInfo, orderId, axiosFn, nextPath) => {
                dispatch(axiosFn(userInfo, orderId))
                    .then((action) => {
                        if (!action) ownProps.router.push(`/checkout/${nextPath}`);
                    })
                    .catch(err => console.log('error saveCheckoutStep: ',err))
            },

            completeCheckout: (order, payment) => {
                dispatch(completeCheckout(order, payment)) // we need to return a promise
                    .then(response => {
                        if (response.order && response.newOrder) {
                            dispatch(clearCart())
                            ownProps.router.push(`/checkout/complete`)
                        }
                    })
                    .catch(err => console.log('error completeCheckout:', err))
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
