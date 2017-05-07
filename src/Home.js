import React from 'react';
import ProductListContainer from './containers/productListContainer';

const Home = ()=> {
  return (
    <div className='container'>
        <div className='text-center'>
            <span className='custom-title-2'>DON MAKE HANDMADE LEATHER BAGS AND NOBODY HELPS HIM.</span>
        </div>
        <hr />
        <ProductListContainer />
    </div>
  );
};

export default Home;
