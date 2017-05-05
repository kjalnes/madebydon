import React from 'react';
import CompletedOrderLines from './CompletedOrderLines';

const UserOrderHistory = ({ completedOrders }) => {

    function getDate(dateStr) {
        return dateStr.slice(5,7) +'/'+ dateStr.slice(8,10) +'/' + dateStr.slice(0,4)
    }

    return (
        <div className='container'>
            <span className='custom-title-1'>My Order History</span>
            {
                completedOrders.map( order => {
                    return (
                        <div className='well' key={order.id}>
                            <b> Order Summary </b><br/>
                            Order date { getDate(order.updatedAt) }
                            <CompletedOrderLines orderLines={ order.orderlines } />
                            <b>Order total $ { order.amount }</b><br/>
                            Order confirmation id {order.confirmationId}
                        </div>
                    )
                })
            }
        </div>
    )
}

export default UserOrderHistory;
