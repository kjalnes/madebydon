import React from 'react';

const BillingAddress = (props) => {
    const { activeUser, order } = props;
    return (
        <div>
            { activeUser.firstName } { activeUser.lastName } <br />
            { order.billing.addressLine1 } <br />
            { order.billing.addressLine2 }<br />
            { order.billing.city }, { order.billing.state }<br />
            { order.billing.zip } { order.billing.country } <br />
        </div>
    )
}

export default BillingAddress;
