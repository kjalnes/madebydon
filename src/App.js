import React from 'react';
import { connect } from 'react-redux';
import Header from './Header';

const App = ({ children, products, user })=> (
  <div className='container'>
    <Header user={user}/>
    <div className='content-container'>
      { children }
    </div>
  </div>
);

const mapStateToProps = ({ products, auth })=>(
  { products,
    user: auth.user
   }
);

export default connect(mapStateToProps)(App);
