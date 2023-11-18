import React, { useState } from 'react';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';
import { setUserData } from '../../redux/actions/authActions';
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoginModal from '../common/LoginModal';
import OTPModal from '../common/OTPModal';

interface SignupProps {
  onRequestClose: (modalIdentifier: string) => void;
}

interface UserData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Signup: React.FC<SignupProps> = ({ onRequestClose }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState<string | null>(null);
  const [signupModalOpen, setSignupModalOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [otpModalOpen, setOTPModalOpen] = useState(false); 

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSignup = async () => {
    try {
      setUsernameError(null);
      setEmailError(null);
      setPasswordError(null);
      setConfirmPasswordError(null);
  
      if (!username) {
        setUsernameError('Username is required');
        toast.error('Username is required');
        return;
      }
  
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
      } else if (!validatePasswordStrength(password)) {
        setPasswordError(
          'Password must be at least 8 characters and contain at least one uppercase letter, one lowercase letter, and one digit'
        );
        toast.error(
          'Password must be at least 8 characters and contain at least one uppercase letter, one lowercase letter, and one digit'
        );
        return;
      }
  
      if (password !== confirmPassword) {
        setConfirmPasswordError('Passwords do not match');
        toast.error('Passwords do not match');
        return;
      }
  
      const userData: UserData = { username, email, password, confirmPassword };
  
      api.setUserData({ email, username, password });
      dispatch(setUserData({ username, email }));
      // onRequestClose('signup');
      const otpsent = await api.sendOTP(email);
  
      // if (otpsent) {
      //   // OTP sent successfully, close the signup modal
      //   console.log('OTP sent successfully');
        
      //   onRequestClose('signup');
      //   // Open the OTP modal
      //   setOTPModalOpen(true);
      //   console.log('Opend  OTP modal');
        
      // }
      if (otpsent) {
        console.log('OTP sent successfully');
        // Open the OTP modal
        openOTPModal();
      } else {
        console.log('Failed to send OTP');
      }
  
    } catch (error: any) {
      console.error('Signup failed', error.message);
      toast.error(`Signup failed: ${error.message}`);
    }
  };
  
  const openOTPModal = () => {
    console.log('Opening OTP modal');
    setOTPModalOpen(true);
  };
  

  const togglePasswordVisibility = (field: string) => {
    if (field === 'password') {
      setShowPassword(!showPassword);
    } else if (field === 'confirmPassword') {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePasswordStrength = (password: string): boolean => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return passwordRegex.test(password);
  };

  const handleInputChange = (field: string, value: string) => {
    switch (field) {
      case 'username':
        setUsernameError(null);
        setUsername(value);
        break;
      case 'email':
        setEmailError(null);
        setEmail(value);
        break;
      case 'password':
        setPasswordError(null);
        setPassword(value);
        break;
      case 'confirmPassword':
        setConfirmPasswordError(null);
        setConfirmPassword(value);
        break;
      default:
        break;
    }
  };
  const handleSignupClick = () => {
    setSignupModalOpen(true);
  };
  const handleLoginClick = () => {
    setLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setLoginModalOpen(false);
  };
  return (
    <main className="w-full flex flex-col items-center justify-center px-4 my-0">
      <ToastContainer />
      <div className="max-w-sm w-full text-gray-600 border border-gray-300 shadow-md rounded-lg p-4">
        <div className="text-center ">
          <div className="mt-2">
            <h3 className="text-gray-800 text-1xl font-bold sm:text-2xl">Create Your Account</h3>
          </div>
        </div>
        <form onSubmit={(e) => e.preventDefault()} className="space-y-3">
          <div>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => handleInputChange('username', e.target.value)}
              className="w-full mt-1 px-3 py-2 text-gray-500 bg-transparent outline-none focus:ring focus:border-indigo-600 shadow-sm rounded-lg transition-all duration-300 border"
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="w-full mt-1 px-3 py-2 text-gray-500 bg-transparent outline-none focus:ring focus:border-indigo-600 shadow-sm rounded-lg transition-all duration-300 border"
            />
          </div>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              className="w-full mt-1 px-3 py-2 text-gray-500 bg-transparent outline-none focus:ring focus:border-indigo-600 shadow-sm rounded-lg transition-all duration-300 border"
            />
            <div
              className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
              onClick={() => togglePasswordVisibility('password')}
            >
              {showPassword ? (
                <svg
                  className="h-6 w-6 text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M6 12l2-2m0 0l4-4m-4 4l4 4m6-4v6m0 0l4 4m-4-4l-4-4" />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6 text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path d="M14.828 14.828A9.937 9.937 0 0017 12a9.937 9.937 0 00-2.172-6.828M10 2v2m0 16v2m-6-6h2m16 0h2M4.464 4.464l1.414 1.414m10.95 10.95l1.414 1.414M6 10H4m16 0h-2" />
                </svg>
              )}
            </div>
          </div>
          <div className="relative">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
              className="w-full mt-1 px-3 py-2 text-gray-500 bg-transparent outline-none focus:ring focus:border-indigo-600 shadow-sm rounded-lg transition-all duration-300 border"
              autoComplete="new-password"
            />
            <div
              className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
              onClick={() => togglePasswordVisibility('confirmPassword')}
            >
              {showConfirmPassword ? (
                <svg
                  className="h-6 w-6 text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M6 12l2-2m0 0l4-4m-4 4l4 4m6-4v6m0 0l4 4m-4-4l-4-4" />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6 text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path d="M14.828 14.828A9.937 9.937 0 0017 12a9.937 9.937 0 00-2.172-6.828M10 2v2m0 16v2m-6-6h2m16 0h2M4.464 4.464l1.414 1.414m10.95 10.95l1.414 1.414M6 10H4m16 0h-2" />
                </svg>
              )}
            </div>
          </div>

          <button
            className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:scale-105 duration-300 active:bg-indigo-600 rounded-lg duration-150"
            onClick={handleSignup}
          >
            Sign Up
          </button>
        </form>
        <button className="bg-white border py-2 w-full rounded-xl mt-2 flex justify-center items-center text-sm hover:scale-105 duration-300 text-[#002D74]">
          <img src={'/logo/googleLogo.png'} alt="Logo" style={{ width: '40px', height: '40px' }} />
          Sign Up with Google
        </button>
        <p className="text-center mt-2">
          Already have an account?{' '}
          <span
            onClick={handleLoginClick}
            className="cursor-pointer font-medium text-indigo-600 hover:text-indigo-500"
          >
            Sign in
          </span>
        </p>
      </div>
      <LoginModal isOpen={loginModalOpen} onRequestClose={closeLoginModal}></LoginModal>
      <OTPModal isOpen={otpModalOpen} onRequestClose={() => setOTPModalOpen(false)} />
    </main>
  );
};

export default Signup;
