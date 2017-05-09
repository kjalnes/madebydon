import React from 'react';
import CompletedOrderLines from './CompletedOrderLines';

const UserOrderHistory = ({ completedOrders }) => {
    function getDate(dateStr) {
        return dateStr.slice(5,7) +'/'+ dateStr.slice(8,10) +'/' + dateStr.slice(0,4)
    }
    return (
        <div className='container'>
            { completedOrders.length ?
                <div>
                    <span className='custom-title-1'>My Order History</span>
                    {
                        completedOrders.map( order => {
                            return (
                                <div className='well' key={order.id}>
                                    <h4> Order Summary </h4><br/>
                                    Order date { getDate(order.updatedAt) }
                                    <CompletedOrderLines orderLines={order.orderlines} />
                                    Tax ${order.tax.toFixed(2)}<br/>
                                    Shipping ${order.shippingCost.toFixed(2)}<br/>
                                    <b>Order total ${order.total.toFixed(2)}</b><br/><br/>
                                    <i>Order transaction ID {order.confirmationId}</i>
                                </div>
                            )
                        })
                    }
                </div>
                :
                null
            }
        </div>
    )
}

export default UserOrderHistory;
