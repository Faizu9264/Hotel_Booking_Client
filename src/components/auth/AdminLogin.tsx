import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { setAdminData, setAdminLoginStatus } from '../../redux/actions/adminActions';

import api from '../../services/adminApi';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState<string | null>('Email is required');
  const [passwordError, setPasswordError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async () => {
    try {
      setEmailError(null);
      setPasswordError(null);

      if (!email) {
        setEmailError('Email is required' as any);
        toast.error('Email is required');
        return;
      }

      if (!password) {
        setPasswordError('Password is required' as any);
        toast.error('Password is required');
        return;
      }

      const admin = await api.adminLogin(email, password);
      const AdminDetails = admin.admin
      console.log('admin,',AdminDetails)
      dispatch(setAdminData(AdminDetails));
   
      if (admin.message === 'Admin login successful') {
        toast.success('Admin login successful');
        navigate('/admin/dashboard/mainDashboard');
        localStorage.setItem('adminData', JSON.stringify(AdminDetails ));
      }   if(admin){
        dispatch(setAdminLoginStatus(true));
       
       const isAdminLoggedInFromLocalStorage = localStorage.getItem('adminData') !== null;

      dispatch(setAdminLoginStatus(isAdminLoggedInFromLocalStorage));
  
      } else {
        toast.error('Invalid admin credentials. Please try again.');
      }
    } catch (error:any) {
      console.error('Admin login failed', error.message);
      toast.error(`Admin login failed: ${error.message}`);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <main className="w-full h-screen flex flex-col items-center justify-center px-4">
      <ToastContainer />
      <div className="max-w-sm w-full text-gray-600 border border-gray-300 shadow-md rounded-lg p-6">
        <div className="text-center pb-8">
          <div className="mt-5">
            <h3 className="text-gray-800 text-1xl font-bold sm:text-2xl">Admin Login</h3>
          </div>
        </div>
        <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
          <div>
            <label className="font-medium">Email</label>
            <input
              type="email"
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none focus:ring focus:border-indigo-600 shadow-sm rounded-lg transition-all duration-300 border"
              placeholder="Enter Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="relative">
            <label className="font-medium">Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none focus:ring focus:border-indigo-600 shadow-sm rounded-lg transition-all duration-300 border"
              placeholder="Enter Your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div
              className="absolute inset-y-0 right-0 pr-1 flex items-center cursor-pointer"
              onClick={togglePasswordVisibility}
              style={{ marginTop: '30px' }}
            >
              {showPassword ? (
                <svg
                  className="h-5 w-5 text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 12l2-2m0 0l4-4m-4 4l4 4" />
                </svg>
              ) : (
                <svg
  className="h-5 w-5 text-gray-500"
  xmlns="http://www.w3.org/2000/svg"
  fill="none"
  viewBox="0 0 24 24"
  stroke="currentColor"
>
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 12l2-2m0 0l4-4m-4 4l4 4" />
</svg>

              )}
            </div>
          </div>
          <button
            className="w-full px-2 py-1 text-white font-medium bg-indigo-600 hover:scale-105 duration-300 active:bg-indigo-600 rounded-lg duration-150"
            onClick={handleLogin}
          >
            Sign in
          </button>
        </form>
        <p className="text-center mt-3">
          Forgot password ?{' '}
          <span onClick={() => navigate('/')} className="cursor-pointer font-medium text-indigo-600 hover:text-indigo-500">
            Click
          </span>
        </p>
      </div>
    </main>
  );
};

export default AdminLogin;
