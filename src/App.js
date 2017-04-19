import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

const App = ({ children, products })=> (
  <div className='container'>
    <h1>React Redux Template</h1>
    <div className='container'>
    <Link to='/'>Home</Link>
    { ' | ' }
    <Link to='/products'>Products ({ products.length})</Link>
    </div>
    { children }
  </div> 
);

const mapStateToProps = ({ products})=>(
  { products }
);

export default connect(mapStateToProps)(App);
