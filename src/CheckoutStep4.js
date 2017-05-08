import React, { Component } from 'react';
import { connect } from 'react-redux';
import UserOrderHistory from './UserOrderHistory';

/*** Confirmed Order: Thank You Page ***/
const CheckoutStep4 = (props) => {
    const { order, completedOrders } = props;
    if(!completedOrders) return null

    const lastOrder = completedOrders[completedOrders.length-1];
    return (
        <div>
            <h3>Order Confirmation</h3>
            <p>Thank you for your purchase!</p>
            <UserOrderHistory completedOrders={ [lastOrder] } />
        </div>
    )
}

export default CheckoutStep4;
