
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import { setUserData } from '../../redux/actions/authActions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

declare global {
  interface Window {
    google: any;
  }
}

interface DecodedToken {
  sub: string;
  email: string;
  given_name: string;
  picture: string;
}

const GoogleOneTapButton: React.FC = () => {
  const dispatch = useDispatch();
  const [disable, setDisabled] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const navigate = useNavigate();

  const initializeGoogleOneTap = () => {
    console.log('Initializing Google One Tap...');
    window.google.accounts.id.initialize({
      client_id: import.meta.env.VITE_GOOGLE_ONETAP,
      callback: handleResponse,
    });
    console.log('Google One Tap initialized successfully!');
    setIsInitialized(true);
  };

//     console.log('Google One Tap response:', response);
  
//     try {
//       const token = response.credential;
//       const decodedToken: DecodedToken = jwtDecode(token);
//       console.log('Decoded Token:', decodedToken);
  
//       const { sub: email, given_name: username, picture: profileImage } = decodedToken;
//       console.log('User Details:', { email, username, profileImage });
  
//       dispatch(setUserData({ email, username, profileImage, token, isGoogle: true }));
//       navigate('/');
//     } catch (error) {
//       console.error('Error decoding token:', error);
//       toast.error('Error decoding token');
//     }
//   };
  

const handleResponse = async (response: any) => {
    console.log('Google One Tap response:', response);
  
    try {
      const token = response.credential;
      const decodedToken: DecodedToken = jwtDecode(token);
      console.log('Decoded Token:', decodedToken);
  
      const { sub:id, email, given_name: username, picture: profileImage } = decodedToken;
      dispatch(setUserData({id, email, username, profileImage, token, isGoogle: true }));
      console.log('User Details:', { email, username, profileImage });
  

      const apiResponse = await api.googleLogin(email, username,token, true);
  
      if (apiResponse.message === 'Login successful') {
        toast.success('Login successful');
        navigate('/');
      } else if (apiResponse.message === 'Signup successful') {
        toast.success('Signup successful');
        navigate('/');
      } else {
        toast.error('Unexpected response from the server');
      }
    } catch (error:any) {
      console.error('Error during Google One Tap login:', error);
      toast.error(`Error during Google One Tap login: ${error.message}`);
      setDisabled(false);
    }
  };
  

  const handleGoogleLogin = () => {
    console.log('Google button clicked');
    setDisabled(true);

    if (!isInitialized) {
      initializeGoogleOneTap();
    }

    try {
        window.google.accounts.id.prompt((notification: any) => {
          console.log('Google One Tap notification:', notification);
      
          if (notification.isNotDisplayed()) {
            throw new Error('Try to clear the cookies or try again later');
          }
          if (notification.isSkippedMoment() || notification.isDismissedMoment()) {
            setDisabled(false);
          }
        });
      } catch (error:any) {
        console.error('Error during Google One Tap login:', error);
        toast.error(`Error during Google One Tap login: ${error.message}`);
        setDisabled(false);
      }
      
  };

  useEffect(() => {
    // Initialize Google One Tap when the component mounts
    initializeGoogleOneTap();
  }, []);

  return (
    <button disabled={disable} onClick={handleGoogleLogin}  className="bg-white border py-1 w-full rounded-xl mt-3 flex justify-center items-center text-sm hover:scale-105 duration-300 text-[#002D74]">
     <img src={'/logo/googleLogo.png'} alt="Logo" style={{ width: '30px', height: '30px' }} />
      Sign in with Google
    </button>
  );
};

export default GoogleOneTapButton;


