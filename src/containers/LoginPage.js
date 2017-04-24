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
            <div className="well">
                { this.props.activeUser ?
                    <div>
                        Hello {this.props.activeUser.firstName}! <br /> From your account dashboard you can view your recent orders, manage your shipping and billing addresses and edit your password and account details.
                        <br />
                        <button onClick={ this.onLogoutSubmit }>Logout</button>
                    </div>
                  :
                    <form>
                        <div className="form-group">
                            <input onChange={ this.onInputChange.bind(null, 'email') } className="form-control" value={this.state.email} placeholder='email'/>
                        </div>
                        <div className="form-group">
                            <input onChange={ this.onInputChange.bind(null, 'password') } className="form-control" value={this.state.password} placeholder='password'/>
                        </div>
                        <button onClick={ this.onLoginSubmit }>Login</button>

                    </form>
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
