import React from 'react';
import CartProducts from './CartProducts';
import CartTotals from './CartTotals';
import { connect } from 'react-redux';

const CartContainer = ({ activeUser }) => (
    <div className='container'>
        { activeUser ?
            <div>
                <CartProducts />
                <hr />
                <div className='row'>
                    <div className='col-xs-8'>
                    </div>
                    <div className='col-xs-4'>
                        <CartTotals />
                    </div>
                </div>
            </div>
            : 'Cart is empty'
        }
    </div>
)

const mapStateToProps = (state) => (
  {
    activeUser: state.auth.user
  }
)


export default connect(mapStateToProps)(CartContainer);
