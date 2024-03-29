// checkTokenExpiration.ts
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

const checkTokenExpiration = (token: any, logoutAction: any, navigate: any) => {
  const dispatch = useDispatch();

  if (!token) {
    return;
  }

  const decodedToken = jwtDecode(token);

  if (decodedToken && decodedToken.exp) {
    if (decodedToken.exp * 1000 < new Date().getTime()) {
      toast.warning("Sessions timeout, Please log in again");
      dispatch(logoutAction());
      navigate("/admin/login");
    }
  }
};

export default checkTokenExpiration;
