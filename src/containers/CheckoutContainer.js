import React from 'react';
import { Link } from 'react-router';
import CreateUserForm from '../CreateUserForm';

const CheckoutContainer = () => {
    return (
        <div className='container'>
            <CreateUserForm />


            Shopped with us before?
            <Link to='/login'> Sign in here</Link>
        </div>
    )
}

export default CheckoutContainer;
