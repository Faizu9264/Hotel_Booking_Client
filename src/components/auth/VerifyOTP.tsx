// src/components/auth/VerifyOTP.tsx
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { useDispatch, useSelector } from 'react-redux';
import  {RootState}  from '../../redux/store';
// import { clearUserData } from '../../redux/actions/authActions'; 


const VerifyOTP: React.FC = () => {
  const dispatch = useDispatch();
  const authState = useSelector((state: RootState) => state.auth);
  const user = authState.user;

  const [enteredOtp, setEnteredOtp] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handleVerify = async () => {
    try {
      console.log(user);
      const { email } = location.state as { email: string };

      console.log(email, enteredOtp);
      
      // const isOtpValid = await api.verifyOTP(email, enteredOtp);
      const response = await api.verifyOTP(enteredOtp);
      console.log('OTP verification successful', response);

      // Send complete user data to the server after OTP verification
      await api.completeSignup();

      // Clear user data from Redux
      // dispatch(clearUserData());

      if (response) {
        navigate('/login');
      } else {
        setError('Invalid OTP. Please try again.');
      }
    } catch (error:any) {
      setError(error.message || 'Error verifying OTP');
    }
  };

  return (
    <main className="w-full flex flex-col items-center justify-center px-4 my-16">
      <div className="max-w-sm w-full text-gray-600 border border-gray-300 shadow-md rounded-lg p-4">
        <div className="text-center pb-4">
          <div className="mt-2">
            <h3 className="text-gray-800 text-1xl font-bold sm:text-2xl">Verify OTP</h3>
            <p className="mt-2 text-gray-600">
              An OTP has been sent to {location.state?.email}. Please enter the OTP to verify your account.
            </p>
          </div>
        </div>
        <form onSubmit={(e) => e.preventDefault()} className="space-y-3">
          <div>
            <input
              type="text"
              placeholder="Enter OTP"
              required
              value={enteredOtp}
              onChange={(e) => setEnteredOtp(e.target.value)}
              className="w-full mt-1 px-3 py-2 text-gray-500 bg-transparent outline-none focus:ring focus:border-indigo-600 shadow-sm rounded-lg transition-all duration-300 border"
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="button"
            onClick={handleVerify}
            className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:scale-105 duration-300 active:bg-indigo-600 rounded-lg duration-150"
          >
            Verify OTP
          </button>
        </form>
      </div>
    </main>
  );
};

export default VerifyOTP;
