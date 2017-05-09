import React from 'react';

const CompletedOrderLines = ({ orderLines }) => {
    return (
        <div>
            {  orderLines.map( (line, index) => {
                    return(
                        <div style={{'marginBottom': '15px'}} key={line.id}>
                            <ul className='order-list list-group' >
                                <li className='order-item'> Order Item {index+1} </li>
                                <li>{line.product.name} ${line.product.price}</li>
                                <li>Quantity {line.qty}</li>
                            </ul>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default CompletedOrderLines;
