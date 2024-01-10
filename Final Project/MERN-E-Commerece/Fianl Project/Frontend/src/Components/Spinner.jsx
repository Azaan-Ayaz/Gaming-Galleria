import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Spinner = ({path = "login"}) => {
  const [count, setCount] = useState( 3 );
  const navigate = useNavigate();
  const location = useLocation()

  useEffect(() => {
    const Interval = setInterval(() => {
      setCount((prevState) => --prevState);
    }, 1000);
    count === 0 && navigate(`/${path}`,
    {
      state: location.pathname
    });
    return () => clearInterval(Interval);
  }, [count, navigate, location]);

  return (
    <div className='flex justify-center items-center h-screen'>
      <div className="d-flex flex-column align-items-center">
        <div className="text-3xl mb-2">Redirecting to you in {count} seconds</div>
        <div className="spinner-border" role="status">
          <span className="visually-hidden flex justify-center">Loading...</span>
        </div>
      </div>
    </div>
  );
};

export default Spinner;
