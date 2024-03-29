import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { setUserData } from "../../redux/actions/authActions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import api from "../../services/userApi";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

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
  const userData = useSelector((state: RootState) => state.auth.user);

  const initializeGoogleOneTap = () => {
    window.google.accounts.id.initialize({
      client_id: import.meta.env.VITE_GOOGLE_ONETAP,
      callback: handleResponse,
    });
    setIsInitialized(true);
  };

  const handleResponse = async (response: any) => {
    try {
      const token = response.credential;
      const decodedToken: DecodedToken = jwtDecode(token);

      const {
        sub,
        email,
        given_name: username,
        picture: profileImage,
      } = decodedToken;
      const _id = sub;

      localStorage.setItem(
        "userData",
        JSON.stringify({
          _id,
          email,
          username,
          profileImage,
          token,
          isGoogle: true,
        })
      );
      const apiResponse = await api.googleLogin(
        _id,
        email,
        username,
        profileImage,
        token,
        true
      );
      if (apiResponse) {
        dispatch(setUserData(apiResponse.user));
      }

      if (userData?.blocked) {
        toast.error("Your account hasbeen blocked");
        navigate("/login");
      } else {
        if (apiResponse.message === "Login successful") {
          toast.success("Login successful");
          navigate("/");
        } else if (apiResponse.message === "Signup successful") {
          toast.success("Signup successful");
          navigate("/");
        } else {
          toast.error("Unexpected response from the server");
        }
      }
    } catch (error: any) {
      console.error("Error during Google One Tap login:", error);
      toast.error(`Error during Google One Tap login: ${error.message}`);
      setDisabled(false);
    }
  };

  const handleGoogleLogin = () => {
    setDisabled(true);

    if (!isInitialized) {
      initializeGoogleOneTap();
    }

    try {
      window.google.accounts.id.prompt((notification: any) => {
        if (notification.isNotDisplayed()) {
          throw new Error("Try to clear the cookies or try again later");
        }
        if (
          notification.isSkippedMoment() ||
          notification.isDismissedMoment()
        ) {
          setDisabled(false);
        }
      });
    } catch (error: any) {
      console.error("Error during Google One Tap login:", error);
      toast.error(`Error during Google One Tap login: ${error.message}`);
      setDisabled(false);
    }
  };

  useEffect(() => {
    initializeGoogleOneTap();
  }, []);

  return (
    <button
      disabled={disable}
      onClick={handleGoogleLogin}
      className="bg-white border py-1 w-full rounded-xl mt-3 flex justify-center items-center text-sm hover:scale-105 duration-300 text-[#002D74]"
    >
      <img
        src={"/logo/googleLogo.png"}
        alt="Logo"
        style={{ width: "30px", height: "30px" }}
      />
      Sign in with Google
    </button>
  );
};

export default GoogleOneTapButton;
