import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Layout from './../../Components/Layout/Layout';
import { CiLock } from 'react-icons/ci';
import { IoPersonSharp } from 'react-icons/io5';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { useAuth } from '../../context/auth';

const ForgotPassword = () => {
  const backgroundImageUrl =
    'https://rare-gallery.com/uploads/posts/585295-blue-controller.jpg';

  const backgroundStyle = {
    backgroundImage: `url(${backgroundImageUrl})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  const borderVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.75 } },
  };

  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [answer, setNewAnswer] = useState('');
//   const { setAuth } = useAuth(); // Destructuring the setAuth function
  const navigate = useNavigate();

  const loginSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8080/forgot-password', {
        email,
        newPassword,
        answer
      });
      if (res.data.success) {
        toast.success(res.data.message);
        
        setTimeout(() => navigate('/login'), 1000);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error('Login failed:', error);
      toast.error('Login failed. Something went wrong.');
    }
  };

  return (
    <Layout title={'Forgot Password'}>
      <div className='flex items-center justify-center min-h-[85vh]' style={backgroundStyle}>
        <motion.div
          className='w-96 h-[65vh] rounded-md flex flex-col items-center bg-black bg-opacity-75 p-8'
          initial='hidden'
          animate='visible'
          variants={borderVariants}
        >
          <div className='text-[34px] underline text-orange-500 font-orbitron font-semibold'>Reset Password</div>
          <form className='mt-2 w-full max-w-md' onSubmit={loginSubmit}>
            <div className='mb-4'>
              <label htmlFor='Email' className='text-orange-500 text-lg font-semibold mb-2 flex items-center'>
                <IoPersonSharp className='w-5 h-5 mr-1 flex align-text-bottom' />Email
              </label>
              <input
                type='email'
                required
                className='border-2 rounded-md p-2 w-full'
                placeholder='Enter your email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className='mb-4'>
              <label htmlFor='Email' className='text-orange-500 text-lg font-semibold mb-2 flex items-center'>
                <IoPersonSharp className='w-5 h-5 mr-1 flex align-text-bottom' />Answer
              </label>
              <input
                type='text'
                required
                className='border-2 rounded-md p-2 w-full'
                placeholder='Enter your answer'
                value={answer}
                onChange={(e) => setNewAnswer(e.target.value)}
              />
            </div>
            <div className='mb-6'>
              <label htmlFor='Password' className='text-orange-500 flex text-lg font-semibold mb-2 items-center'>
                <CiLock className='w-5 h-5 mr-1 flex align-text-bottom' />
                New Password
              </label>
              <input
                type='password'
                id = "Answer"
                required
                className='border-2 rounded-md p-2 w-full'
                placeholder='Enter your new password'
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div className='flex justify-center'>
              <button className='bg-orange-500 text-white text-2xl p-2 rounded-md font-semibold hover:bg-orange-800 mt-4 w-96 transition duration-300'
              onClick={()=>{navigate("/login")}}>
                Reset
              </button>
            </div>
          </form>
        </motion.div>
      </div>
      <ToastContainer />
    </Layout>
  );
};

export default ForgotPassword;
