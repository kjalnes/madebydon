import React, { Component } from 'react';
import { Link } from 'react-router';
import CreateUserForm from '../CreateUserForm';
import { connect } from 'react-redux'

const CheckoutContainer = (props) =>  {
    const { activeUser, router } = props;
    return (
        <div className='container'>
            { activeUser ?
                <div>
                    [show billing and shipping address form component(s)... Not created yet]
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
        activeUser: state.auth.user
    }
)

export default connect(mapStateToProps)(CheckoutContainer);
