import React, { Component } from 'react';

/*** Confirm Order Page ***/
class CheckoutStep3 extends Component {
    constructor(props) {
        super(props);
        this.state = { card: '', exp: '', cvc: '' };
        this.onSubmit = this.onSubmit.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
    }

    componentDidMount() {
        //Put here the code to move back if this is the wrong route.
    }

    onInputChange(key, ev) {
        this.setState({ [key]: ev.target.value });
    }

    onSubmit(event) {
        event.preventDefault();

        // Validate the infomation on the client only.

        console.log(this.state);

        const splitExp = this.state.exp.split('-');
        const payment = {
            number: this.state.card,
            exp_month: splitExp[1],
            exp_year: splitExp[0],
            cvc: this.state.cvc
        };

        console.log('is valid until here', payment);

        console.log('I have the order', this.props.order);
        
        // Submit the order to stripe with the CC card to get the token
        // for that card.
        this.props.completeCheckout(this.props.order,payment);

    }

    render() {
        return (
            <div className='container'>
                {(this.props.order)?this.props.order.message: ''}
                <form onSubmit={this.onSubmit}>
                    <div className="panel-body">
                        <div className="form-group">
                            <label htmlFor="cardNumberInput">Card Number</label>
                            <input type="text" className="form-control" id="cardNumberInput" placeholder="4242 4242 4242 4242" onChange={this.onInputChange.bind(null, 'card')} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="expInput">Expiration Date</label>
                            <input type="month" className="form-control" id="expInput" placeholder="12/2017" onChange={this.onInputChange.bind(null, 'exp')} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="cvcInput">CVC</label>
                            <input type="number" className="form-control" id="cvcInput" placeholder="123" onChange={this.onInputChange.bind(null, 'cvc')} />
                        </div>
                    </div>
                    <button>Place my order</button>
                </form>
            </div>
        );
    }
}


export default CheckoutStep3;
