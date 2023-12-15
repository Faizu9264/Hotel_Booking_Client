
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
 import { RootState } from "../redux/store";
import { jwtDecode } from "jwt-decode";
import { logoutUser } from "../redux/actions/authActions";
import { logoutAdmin } from "../redux/actions/adminActions";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const useCheckToken = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const warningShownRef = useRef(false);
  const currentUserToken = localStorage.getItem("UserToken");
  const currentAdminToken = localStorage.getItem("AdminToken");

  useEffect(() => {
    let token;
    let logoutAction;

    if (currentUserToken) {
      token = currentUserToken;
      console.log('Usertoken',token)
      logoutAction = logoutUser;
    } else if (currentAdminToken) {
      token = currentAdminToken;
      console.log('Admintoken',token)
      logoutAction = logoutAdmin;
    } else {
     console.log('no token');
     
      return;
    }

    const decodedToken: any = jwtDecode(token);
    console.log('decodedToken.exp ',decodedToken.exp );
    
    if (
      decodedToken.exp * 1000 < new Date().getTime() &&
      !warningShownRef.current
    ) {
      warningShownRef.current = true;
      toast.warning("Sessions timeout, Please log in again");
      dispatch(logoutAction());
      if (logoutAction === logoutAdmin) {
        navigate("/admin/login");
      }else if(logoutAction == logoutUser){
        navigate("/user/login");
      }
    }
  }, [currentUserToken, currentAdminToken, dispatch, navigate]);

  return null;
};

export default useCheckToken;