import React from 'react';

const UserInfo = (props) => {
    const { activeUser, onLogoutSubmit, order } = props;

    return (
        <div>
            <div className="container">
                Hello <b>{ activeUser.firstName }</b>! (not { activeUser.firstName }? <a onClick={ onLogoutSubmit }>Sign out</a>).<br />
                From your account dashboard you can view your recent orders, manage your shipping and billing addresses and edit your password and account details. <br />
            </div>
            <hr />
            <div className='container'>
                <div className='col-xs-12'>
                    <span className='custom-title-1'>MY ADDRESSES</span>
                    <p>The following addresses will be used on the checkout page by default.</p>
                </div>
                <div className='col-xs-6'>
                    <span className='custom-title-1'>BILLING ADDRESS</span><br />
                    { order.billing ?
                        <div>
                            { activeUser.firstName } { activeUser.lastName } <br />
                            { order.billing.addressLine1 } <br />
                            { order.billing.addressLine2 }<br />
                            { order.billing.city }, { order.billing.state }<br />
                            { order.billing.zip } { order.billing.country } <br />
                            <a href="">Edit address</a>
                            <br />
                            [should open address form on click]
                        </div>
                        :
                        <span>You have no billing address saved.</span>
                    }

                </div>
                <div className='col-xs-6'>
                    <span className='custom-title-1'>SHIPPING ADDRESS</span><br />
                    { order.shipping ?
                        <div>
                            { activeUser.firstName } { activeUser.lastName } <br />
                            { order.shipping.addressLine1 } <br />
                            { order.shipping.addressLine2 }<br />
                            { order.shipping.city }, { order.shipping.state }<br />
                            { order.shipping.zip } { order.shipping.country } <br />
                            <a href="">Edit address</a>
                            <br />
                            [should open address form on click]
                        </div>
                        :
                        <span>You have no shipping address saved.</span>
                    }
                </div>
            </div>
        </div>
    )
}

export default UserInfo;
