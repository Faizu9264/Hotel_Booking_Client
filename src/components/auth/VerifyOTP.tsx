// // VerifyOTP.tsx
// import React, { useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import api from '../../services/api';
// import OTPModal from '../common/OTPModal';
// import { useDispatch, useSelector } from 'react-redux';
// import  {RootState}  from '../../redux/store';
// import { toast } from 'react-toastify';
// // import LoginModal from '../common/LoginModal';

// interface VerifyOTPProps {
//   onRequestClose: (modalIdentifier: string) => void;
// }

// const VerifyOTP: React.FC<VerifyOTPProps> = ({ onRequestClose }) => {
//   const dispatch = useDispatch();
//   const authState = useSelector((state: RootState) => state.auth);
//   const user = authState.user;
//   const [enteredOtp, setEnteredOtp] = useState('');
//   const [error, setError] = useState<string | null>(null);
//   const navigate = useNavigate();
//   const location = useLocation();

//   const handleVerify = async () => {
//     try {
//       console.log(user);
//       // const { email } = location.state as { email: string };

//       console.log(user.email, enteredOtp);
//       const response = await api.verifyOTP(enteredOtp);
//       // console.log('OTP verification successful', response);

//     const completed =  await api.completeSignup();
//       // dispatch(clearUserData());

//       if (completed && response) {   
//        toast.success('OTP verification successful')
//         navigate('/login',user.email);
//       } else {
//         setError('Invalid OTP. Please try again.');
//       }
//     } catch (error: any) {
//       setError(error.message || 'Error verifying OTP');
//     }
//   };

//   return (
//     <main className="w-full flex flex-col items-center justify-center px-4 my-5">
//       <div className="max-w-sm w-full text-gray-600 border border-gray-300 shadow-md rounded-lg p-4">
//         <div className="text-center pb-4">
//           <div className="mt-2">
//             <h3 className="text-gray-800 text-1xl font-bold sm:text-2xl">Verify OTP</h3>
//             <p className="mt-2 text-gray-600">
//               An OTP has been sent to {user.email}. Please enter the OTP to verify your account.
//             </p>
//           </div>
//         </div>
//         <form onSubmit={(e) => e.preventDefault()} className="space-y-3">
//           <div>
//             <input
//               type="text"
//               placeholder="Enter OTP"
//               required
//               value={enteredOtp}
//               onChange={(e) => setEnteredOtp(e.target.value)}
//               className="w-full mt-1 px-3 py-2 text-gray-500 bg-transparent outline-none focus:ring focus:border-indigo-600 shadow-sm rounded-lg transition-all duration-300 border"
//             />
//           </div>
//           {error && <p className="text-red-500 text-sm">{error}</p>}
//           <button
//             type="button"
//             onClick={handleVerify}
//             className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:scale-105 duration-300 active:bg-indigo-600 rounded-lg duration-150"
//           >
//             Verify OTP
//           </button>
//         </form>
//       </div>
//       {/* <LoginModal isOpen={loginModalOpen} onRequestClose={closeLoginModal}></LoginModal> */}
//     </main>
//   );
// };

// export default VerifyOTP;


import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import OTPModal from '../common/OTPModal';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { toast } from 'react-toastify';

interface VerifyOTPProps {
  onRequestClose: (modalIdentifier: string) => void;
}

const VerifyOTP: React.FC<VerifyOTPProps> = ({ onRequestClose }) => {
  const dispatch = useDispatch();
  const authState = useSelector((state: RootState) => state.auth);
  const user = authState.user;
  const [enteredOtp, setEnteredOtp] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isResending, setResending] = useState(false); // Add state to track resending status
  const navigate = useNavigate();
  const location = useLocation();

  const handleVerify = async () => {
    try {
      console.log(user);
      console.log(user.email, enteredOtp);
      const response = await api.verifyOTP(enteredOtp);

      const completed = await api.completeSignup();

      if (completed && response) {
        toast.success('OTP verification successful');
        navigate('/login', user.email);
      } else {
        setError('Invalid OTP. Please try again.');
      }
    } catch (error: any) {
      setError(error.message || 'Error verifying OTP');
    }
  };

  const handleResendOTP = async () => {
    try {
      setResending(true);
      await api.resendOTP(user.email);
      toast.success('OTP resent successfully');
      setResending(false);
    } catch (error) {
      console.error('Error resending OTP:', error);
      toast.error('Error resending OTP');
      setResending(false);
    }
  };

  return (
    <main className="w-full flex flex-col items-center justify-center px-4 my-5">
      <div className="max-w-sm w-full text-gray-600 border border-gray-300 shadow-md rounded-lg p-4">
        <div className="text-center pb-4">
          <div className="mt-2">
            <h3 className="text-gray-800 text-1xl font-bold sm:text-2xl">Verify OTP</h3>
            <p className="mt-2 text-gray-600">
              An OTP has been sent to {user.email}. Please enter the OTP to verify your account.
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
          <button
            type="button"
            onClick={handleResendOTP}
            disabled={isResending}
            className={`w-full px-4 py-2 text-white font-medium bg-gray-500 hover:bg-gray-600 ${
              isResending ? 'cursor-not-allowed' : 'hover:scale-105 active:bg-gray-600'
            } rounded-lg duration-150`}
          >
            {isResending ? 'Resending OTP...' : 'Resend OTP'}
          </button>
        </form>
      </div>
    </main>
  );
};

export default VerifyOTP;






