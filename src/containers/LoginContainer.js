import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login, logout } from '../redux/reducers/authReducer';
import UserAccount from '../components/user/UserAccount';

class LoginContainer extends Component {
    constructor({ login, logout, activeUser, router, order, completedOrders }) {
        super();
        this.state = { email: '', password: '' };
        this.onInputChange = this.onInputChange.bind(this);
        this.onLoginSubmit = this.onLoginSubmit.bind(this);
        this.onLogoutSubmit = this.onLogoutSubmit.bind(this);
    }

    onInputChange(key, ev) {
        this.setState({ [key]: ev.target.value })
    }

    onLoginSubmit(ev) {
        ev.preventDefault()
        const checkingOut = this.props.location.query.checkout;
        const credentials = this.state;
        const router = this.props.router;

        this.props.login(credentials, checkingOut, router)
    }

    onLogoutSubmit(ev) {
        ev.preventDefault()
        this.setState({email: "", password: ""});
        this.props.logout()
    }

    render() {
        return (
            <div className='container'>
                { this.props.activeUser && this.props.order ?
                    <UserAccount
                        activeUser={ this.props.activeUser }
                        onLogoutSubmit={ this.onLogoutSubmit }
                        order= { this.props.order }
                        completedOrders = { this.props.completedOrders }
                        lastOrderId = {this.props.lastOrderId}
                    />
                  :
                    <div>
                        <h3>Guest Account</h3>
                        <form className='custom-form well'>
                            <span className='custom-title-1'>Sign in here to see your past orders.</span>
                            <div className="form-group">
                                <input
                                    onChange={ this.onInputChange.bind(null, 'email') }
                                    className="form-control"
                                    value={this.state.email}
                                    placeholder='email'/>
                            </div>
                            <div className="form-group">
                                <input
                                    onChange={ this.onInputChange.bind(null, 'password') }
                                    className="form-control"
                                    value={this.state.password}
                                    placeholder='password'
                                    type='password'/>
                            </div>
                            <button onClick={ this.onLoginSubmit } className='custom-button-1'>Login</button>
                        </form>
                    </div>
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => (
    {
        activeUser: state.auth.user,
        order: state.order.order,
        completedOrders: state.order.completedOrders,
        lastOrderId: state.order.lastOrderId
    }
)

const mapDispatchToProps = (dispatch) => (
    {
        login: (credentials, checkingOut, router) =>  dispatch(login(credentials))
                                .then( () => {
                                    if(checkingOut) router.push('/checkout/shipping')
                                }),
        logout: () => dispatch(logout())
   }
)

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
