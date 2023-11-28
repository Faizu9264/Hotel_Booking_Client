import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { useDispatch, useSelector } from 'react-redux';
import { setUserData } from '../../redux/actions/authActions';
import { setLoginStatus } from '../../redux/actions/authActions';
import { RootState } from '../../redux/store';
import GoogleOneTapButton from './GoogleOneTapButton';

// interface LoginProps {
//   onRequestClose: (modalIdentifier: string) => void;
// }

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userData = useSelector((state: RootState) => state.auth.user);
  const userEmail = userData?.email;
  
  const handleLogin = async () => {
    try {
      setEmailError(null);
      setPasswordError(null);

      if (!email) {
        setEmailError('Email is required');
        toast.error('Email is required');
        return;
      } else if (!validateEmail(email)) {
        setEmailError('Invalid email format');
        toast.error('Invalid email format');
        return;
      }

      if (!password) {
        setPasswordError('Password is required');
        toast.error('Password is required');
        return;
      }
      
      const user = await api.login(email, password);
      dispatch(setUserData({ email, ...user }));
      if (user.message === 'Login successful') {
        toast.success('Login successful');
        navigate('/');
        dispatch(setLoginStatus(true));
      } else {
        toast.error('Invalid credentials. Please try again.');
      }
    } catch (error: any) {
      console.error('Login failed', error.message);
      toast.error(`Login failed: ${error.message}`);
    }
  };  

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
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
          <h3 className="text-gray-800 text-1xl font-bold sm:text-2xl">Log in to your account</h3>
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
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14.828 14.828A9.937 9.937 0 0017 12a9.937 9.937 0 00-2.172-6.828M10 2v2m0 16v2m-6-6h2m16 0h-2M4.464 4.464l1.414 1.414m10.95 10.95l1.414 1.414M6 10H4m16 0h-2"
                />
              </svg>
            )}
          </div>
        </div>
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-x-2">
            <input
              type="checkbox"
              id="remember-me-checkbox"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
              className="checkbox-item peer hidden"
            />
            <label
              htmlFor="remember-me-checkbox"
              className="relative flex w-4 h-4 bg-white peer-checked:bg-indigo-600 rounded-md border ring-offset-1 ring-indigo-600 duration-150 peer-active:ring cursor-pointer after:absolute after:inset-x-0 after:top-[2px] after:m-auto after:w-1 after:h-1 after:border-r-1 after:border-b-1 after:border-white after:rotate-45"
            ></label>
            <span>Remember me</span>
          </div>
          <Link to="/forgot-password" className="text-center text-indigo-600 hover:text-indigo-500">
            Forgot Password?
          </Link>
        </div>
        <button
          className="w-full px-2 py-1 text-white font-medium bg-indigo-600 hover:scale-105 duration-300 active:bg-indigo-600 rounded-lg duration-150"
          onClick={handleLogin }>
          Sign in
        </button>
      </form>
      <GoogleOneTapButton/>
      <p className="text-center mt-3">
        Don't have an account?{' '}
        <span  onClick={() => navigate('/user/signup')}className="cursor-pointer font-medium text-indigo-600 hover:text-indigo-500">Sign up</span>
      </p>
    </div>
  </main>
  );
};

export default Login;
