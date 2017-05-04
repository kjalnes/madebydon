import React, { Component } from 'react';
import { login, logout } from '../reducers/authReducer';
import { connect } from 'react-redux';
import UserInfo from '../UserInfo';

class LoginContainer extends Component {
    constructor({ login, logout, activeUser, router, order }) {
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
                    <UserInfo
                        activeUser={ this.props.activeUser }
                        onLogoutSubmit={ this.onLogoutSubmit }
                        order= { this.props.order }
                    />
                  :
                    <form>
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
                                placeholder='password'/>
                        </div>
                        <button onClick={ this.onLoginSubmit }>Login</button>
                    </form>
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => ({ activeUser: state.auth.user, order: state.order.order })

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
