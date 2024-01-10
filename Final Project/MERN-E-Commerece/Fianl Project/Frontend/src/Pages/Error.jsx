import React from 'react';
import Layout from '../Components/Layout/Layout';
import { Link } from 'react-router-dom';

const Error = () => {
  const backgroundImageUrl = 'https://i.pinimg.com/originals/07/1e/69/071e69f707665dd8ccae1429878e0800.jpg';

  const backgroundStyle = {
    backgroundImage: `url(${backgroundImageUrl})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh',
  };

  return (
    <>
      <div className='flex items-center min-h-[20vh] justify-center' style={backgroundStyle}>
        <div className='w-full max-w-xl bg-black bg-opacity-75 p-8 rounded-md text-center'>
          <div className='text-6xl font-bold text-orange-500 font-orbitron mb-5'>GAME OVER</div>
          <p className='text-lg text-gray-300'>
            Unfortunately, something went wrong. Please try again later.
          </p>
          <Link to={'/'}><button className='text-white mt-5 hover:bg-orange-400  p-2 bg-orange-500 rounded-md'>Back to home</button></Link>
          {/* Add additional content or links as needed */}
        </div>
      </div>
    </>
  );
};

export default Error;