import React, { Component } from 'react';
import { connect } from 'react-redux'
import { createUser } from './reducers/authReducer';

class CreateUserForm extends Component {
    constructor({ createUser, router }) {
        super();
        this.state = { firstName: '', lastName: '', email: '', password: '' };
        this.onInputChange = this.onInputChange.bind(this);
        this.onCreateSubmit = this.onCreateSubmit.bind(this);
    }

    onInputChange(key, ev) {
        this.setState({ [key]: ev.target.value })
    }

    onCreateSubmit(ev) {
        ev.preventDefault()
        const userInfo = this.state;
        const router = this.props.router;
        // validate on client side here
        this.props.createUser(userInfo, router)
    }

    render() {
        return (
            <div className='container'>
                <h3>Create your user profile</h3>
                <form>
                    <div className="form-group">
                        <input onChange={ this.onInputChange.bind(null, 'firstName') } className="form-control" value={this.state.firstName} placeholder='First name'/>
                    </div>
                    <div className="form-group">
                        <input onChange={ this.onInputChange.bind(null, 'lastName') } className="form-control" value={this.state.lastName} placeholder='Last name'/>
                    </div>
                    <div className="form-group">
                        <input onChange={ this.onInputChange.bind(null, 'email') } className="form-control" value={this.state.email} placeholder='email'/>
                    </div>
                    <div className="form-group">
                        <input onChange={ this.onInputChange.bind(null, 'password') } className="form-control" value={this.state.password} placeholder='password'/>
                    </div>
                    <button onClick={ this.onCreateSubmit }>Create account</button>
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => (
    {
        createUser: (userInfo, router) => dispatch(createUser(userInfo))
                                            .then( () => {
                                                router.push('/checkout/shipping')
                                            })
                                            .catch( err => console.log(err))
    }
)



export default connect(null, mapDispatchToProps)(CreateUserForm);

