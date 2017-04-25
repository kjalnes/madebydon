import React, { Component } from 'react';
import { login, logout } from '../reducers/authReducer';
import { connect } from 'react-redux';

class LoginForm extends Component {
    constructor({ login, logout, activeUser }) {
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
        this.props.login(this.state)
    }

    onLogoutSubmit(ev) {
        ev.preventDefault()
        this.setState({email: "", password: ""});
        this.props.logout()
    }

    render() {
        return (
            <div className="">
                { this.props.activeUser ?
                    <div>
                        <div className="container">
                            <div className="col-xs-12">
                                Hello <b>{this.props.activeUser.firstName}</b>! (not {this.props.activeUser.firstName}? <a onClick={ this.onLogoutSubmit }>Sign out</a>).<br />
                                From your account dashboard you can view your recent orders, manage your shipping and billing addresses and edit your password and account details. <br />
                                <button onClick={ this.onLogoutSubmit }>Logout</button>

                            </div>
                        </div>
                        <hr />
                        <div className='container'>
                            <div className='col-xs-12'>
                                <span className='custom-title-1'>MY ADDRESSES</span>
                                <p>The following addresses will be used on the checkout page by default.</p>
                            </div>
                            <div className='col-xs-6'>
                                <span className='custom-title-1'>BILLING ADDRESS</span><br />
                                {this.props.activeUser.firstName} <br />
                                5 Hanover Sq<br />
                                NY NY<br />
                                <a href="">Edit address</a><br />
                                [should open address form on click]

                            </div>
                            <div className='col-xs-6'>
                                <span className='custom-title-1'>SHIPPING ADDRESS</span><br />
                                {this.props.activeUser.firstName} <br />
                                5 Hanover Sq<br />
                                NY NY<br />
                                <a href="">Edit address</a>
                                <br />
                                [should open address form on click]
                            </div>
                        </div>


                    </div>
                  :
                    <div className='container'>
                        <form>
                            <div className="form-group">
                                <input onChange={ this.onInputChange.bind(null, 'email') } className="form-control" value={this.state.email} placeholder='email'/>
                            </div>
                            <div className="form-group">
                                <input onChange={ this.onInputChange.bind(null, 'password') } className="form-control" value={this.state.password} placeholder='password'/>
                            </div>
                            <button onClick={ this.onLoginSubmit }>Login</button>

                        </form>
                    </div>
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => (
    {
        activeUser: state.auth.user
    }
)

const mapDispatchToProps = (dispatch) => (
    {
        login: (credentials) =>  dispatch(login(credentials)),
        logout: () =>  dispatch(logout())
   }
)

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
