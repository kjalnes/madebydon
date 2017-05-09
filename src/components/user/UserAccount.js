import React from 'react';
import UserOrderHistory from './UserOrderHistory';
import Address from './Address';

const UserAccount = (props) => {
    const { activeUser, onLogoutSubmit, order, completedOrders, lastOrderId } = props;
    const lastOrder = completedOrders ? completedOrders.find(order => order.id === lastOrderId) : null;

    const shippingAdr = lastOrder !== undefined ? lastOrder.shipping : null;
    const billingAdr = lastOrder !== undefined ? lastOrder.billing : null;


    return (
        <div>
            <div className="container">
                Hello <b>{ activeUser.firstName }</b>! (not { activeUser.firstName }?
                <a onClick={ onLogoutSubmit }> Sign out</a>).<br />
                From your account dashboard you can view your recent orders, manage your shipping and billing addresses and edit your password and account details. <br />
            </div>
            <hr />

            <div className='container'>
                <div className='col-xs-12'>
                    <span className='custom-title-1'>MY ADDRESSES</span>
                    <p>The following addresses will be used on the checkout page by default. You will have the oppurtunity to edit your addresses at chekout.</p>
                </div>
                <div className='col-xs-6'>
                    <span className='custom-title-1'>BILLING ADDRESS</span><br />
                    { lastOrder ?
                        <Address activeUser={ activeUser } address={ billingAdr } />
                        :
                        <span>You have no billing address saved.</span>
                    }

                </div>
                <div className='col-xs-6'>
                    <span className='custom-title-1'>SHIPPING ADDRESS</span><br />
                    { lastOrder ?
                        <Address activeUser={ activeUser } address={ shippingAdr } />
                        :
                        <span>You have no shipping address saved.</span>
                    }
                </div>
            </div>
            <hr />
            <UserOrderHistory completedOrders={ completedOrders } />
        </div>
    )
}

export default UserAccount;
