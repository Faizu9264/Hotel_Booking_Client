import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../../services/userApi";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { toast } from "react-toastify";
import NewPasswordModal from "./NewPasswordModal";
interface VerifyOTPProps {
  onRequestClose: (modalIdentifier: string) => void;
  email?: string;
  isForgotPassword?: boolean;
}

const VerifyOTP: React.FC<VerifyOTPProps> = ({
  onRequestClose,
  email,
  isForgotPassword,
}) => {
  const authState = useSelector((state: RootState) => state.auth);
  const user = authState.user;
  const [enteredOtp, setEnteredOtp] = useState("");
  const [showNewPasswordModal, setShowNewPasswordModal] = useState(false);

  const [error, setError] = useState<string | null>(null);
  const [isResending, setResending] = useState(false);
  const [countdown, setCountdown] = useState(120);
  const navigate = useNavigate();

  useEffect(() => {
    let countdownTimer: NodeJS.Timeout;

    if (countdown > 0) {
      countdownTimer = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    }

    return () => {
      clearInterval(countdownTimer);
    };
  }, [countdown]);

  const handleVerify = async () => {
    try {
      const response = await api.verifyOTP(enteredOtp);
      if (isForgotPassword) {
        if (response) {
          toast.success("OTP verification successful");
          setShowNewPasswordModal(true);
        } else {
          setError("Invalid OTP. Please try again.");
        }
      } else {
        const completed = await api.completeSignup();

        if (completed && response) {
          toast.success("OTP verification successful");
          onRequestClose("otp");
          navigate("/login", user.email);
        } else {
          setError("Invalid OTP. Please try again.");
        }
      }
    } catch (error: any) {
      setError(error.message || "Error verifying OTP");
    }
  };

  const handleResendOTP = async () => {
    try {
      if (!isResending && countdown === 0) {
        setResending(true);
        await api.resendOTP(user.email);
        toast.success("OTP resent successfully");
        setResending(false);
        setCountdown(120);
      }
    } catch (error) {
      console.error("Error resending OTP:", error);
      toast.error("Error resending OTP");
      setResending(false);
    }
  };
  const handleClose = async () => {
    onRequestClose("otp");
    setShowNewPasswordModal(false);
  };
  return (
    <main className="w-full flex flex-col items-center justify-center px-4 my-5">
      <div className="max-w-sm w-full text-gray-600 border border-gray-300 shadow-md rounded-lg p-4">
        <div className="text-center pb-4">
          <div className="mt-2">
            <h3 className="text-gray-800 text-1xl font-bold sm:text-2xl">
              Verify OTP
            </h3>
            <p className="mt-2 text-gray-600">
              An OTP has been sent to{" "}
              <span className="font-semibold" style={{ color: "blue" }}>
                {user?.email || email}
              </span>
              . Please enter the OTP to verify your account.
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
            disabled={isResending || countdown > 0}
            className={`w-full px-4 py-2 text-white font-medium bg-gray-500 hover:bg-gray-600 ${
              isResending || countdown > 0
                ? "cursor-not-allowed"
                : "hover:scale-105 active:bg-gray-600"
            } rounded-lg duration-150`}
          >
            {isResending
              ? "Resending OTP..."
              : countdown > 0
              ? `Resend OTP (${countdown}s)`
              : "Resend OTP"}
          </button>
        </form>
      </div>
      {showNewPasswordModal && (
        <NewPasswordModal
          isOpen={showNewPasswordModal}
          onRequestClose={() => handleClose()}
          email={user?.email || email || ""}
        />
      )}
    </main>
  );
};

export default VerifyOTP;
