import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

const App = ({ children, products, user })=> (
  <div className='container'>
    <h1>React Redux Template</h1>
    <div className='container'>
    <Link to='/'>Home</Link>
    { ' | ' }
    <Link to='/products'>Products ({ products.length})</Link>
    { ' | ' }
    { user ?
      <Link to='login'>Your Profile</Link> :
      <Link to='login'>Login</Link> }
    </div>
    { children }
  </div>
);

const mapStateToProps = ({ products, auth })=>(
  { products,
    user: auth.user

   }
);

export default connect(mapStateToProps)(App);
