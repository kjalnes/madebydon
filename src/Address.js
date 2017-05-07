import React from 'react';

const Address = (props) => {
    const { activeUser, address } = props;
    return (
        <div>
            { activeUser.firstName } { activeUser.lastName } <br />
            { address ?
                <span>
                    { address.addressLine1 } <br />
                    { address.addressLine2 }<br />
                    { address.city }, { address.state }<br />
                    { address.zip } { address.country } <br />
                </span>
                : null
            }
        </div>
    )
}

export default Address;

