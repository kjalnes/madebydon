import React from 'react';

const CompletedOrderLines = ({ orderLines}) => {
    return (
        <div>
            {  orderLines.map( (line, index) => {
                    return(
                        <ul className='order-list list-group' key={line.id}>
                            <li className='order-item'> Order Item {index+1} </li>
                            <li> <a href="">{line.product.name}</a> ${line.product.price}</li>
                            <li>Quantity {line.qty}</li>
                        </ul>
                    )
                })
            }
        </div>
    )
}

export default CompletedOrderLines;
