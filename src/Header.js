import React from 'react';
import { Link } from 'react-router';

const Header = ({activeUser, cartNum}) => {
  return (  <div className='container navigation'>
          <Link to='/' className='logo-link'><h1 className='logo-title'>Made by Don</h1></Link>
          <Link to='/'>Products</Link>
          { ' | ' }
          <Link to='/about'>About</Link>
          { ' | ' }
          { activeUser ?
            <Link to='login'>My Account</Link>
            :
            <Link to='login'>Login</Link> }

          { cartNum > 0 ?
            <span> { ' | ' }<Link to='cart'>Cart ({cartNum})</Link></span>
            :
            null
          }

          <hr />
      </div>
  )
}

export default Header;
