import React, { Component } from 'react';
import { Link } from 'react-router';
import CreateUserForm from '../CreateUserForm';
import { connect } from 'react-redux'
import CheckoutStep1 from '../CheckoutStep1';
import CheckoutStep2 from '../CheckoutStep2';


const CheckoutContainer = (props) =>  {

    const { activeUser, router, children, orderId } = props;

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
        orderId: state.order.order && state.order.order[0] && state.order.order[0].id
    }
)

const mapDispatchToProps = (dispatch, ownProps) => {
    return (
        {
            saveCheckoutStep: (userInfo, orderId, axiosFn, nextPath) => {
                dispatch( axiosFn(userInfo, orderId) )
                .then( () => ownProps.router.push(`/checkout/${nextPath}`))
                .catch( err => console.log(err))
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
