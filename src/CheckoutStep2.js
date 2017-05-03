import React, { Component } from 'react';
import { connect } from 'react-redux';

/*** Billing and Credit Card ***/

class CheckoutStep2 extends Component {
    constructor({ onSaveStep }) {
        super();
        this.state = { addressLine1: '', addressLine2: '', city: '', state: '', zip: '', country: '' };
        this.onInputChange = this.onInputChange.bind(this);
        this.onSaveStep = this.onSaveStep.bind(this);
    }

    onInputChange(key, ev) {
        this.setState({ [key]: ev.target.value })
    }

    onSaveStep(ev) {
        ev.preventDefault()
        this.props.onSaveStep()
    }

    render() {
        return (
            <div className='container'>
                <h3>Your billing address</h3>
                <form>
                    <div className="form-group">
                        <input onChange={ this.onInputChange.bind(null, 'addressLine1') } className="form-control" value={this.state.addressLine1} placeholder='Street address'/>
                    </div>
                    <div className="form-group">
                        <input onChange={ this.onInputChange.bind(null, 'addressLine2') } className="form-control" value={this.state.addressLine2} placeholder='Street address'/>
                    </div>
                    <div className="form-group">
                        <input onChange={ this.onInputChange.bind(null, 'city') } className="form-control" value={this.state.city} placeholder='City'/>
                    </div>
                    <div className="form-group">
                        <input onChange={ this.onInputChange.bind(null, 'zip') } className="form-control" value={this.state.zip} placeholder='Zip code'/>
                    </div>
                    <div className="form-group">
                        <input onChange={ this.onInputChange.bind(null, 'country') } className="form-control" value={this.state.country} placeholder='Country'/>
                    </div>
                    <button onClick={ this.onSaveStep }>Save shipping address</button>

                </form>
            </div>
        )
    }
}


export default CheckoutStep2;
