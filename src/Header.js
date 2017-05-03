import React from 'react';
import { Link } from 'react-router';

const Header = ({user, cartNum}) => {
  console.log('cartNum', cartNum)

  return (  <div className='container navigation'>
          <h1 className='logo-title'>Made by Don</h1>
          <Link to='/'>Home</Link>
          { ' | ' }
          <Link to='/products'>Products</Link>
          { ' | ' }
          { user ?
            <Link to='login'>My profile</Link>
            :
            <Link to='login'>Login</Link> }

          { cartNum > 0 ?
            <span> { ' | ' }<Link to='cart'>Cart ({cartNum})</Link></span>
            :
            null
          }
      </div>
  )
}

export default Header;
