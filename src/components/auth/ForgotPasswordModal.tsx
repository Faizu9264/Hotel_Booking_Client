import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../../services/userApi";

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onOtpVerification: (email: string) => void;
}

const ForgotPasswordModal: React.FC<ForgotPasswordModalProps> = ({
  isOpen,
  onRequestClose,
  onOtpVerification,
}) => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);

  const handleForgotPassword = async () => {
    if (!email) {
      setEmailError("Email is required");
      toast.error("Email is required");
      return;
    } else if (!validateEmail(email)) {
      setEmailError("Invalid email format");
      toast.error("Invalid email format");
      return;
    }
    try {
      await api.forgotPassword(email);
      toast.success("Password reset email sent successfully");
      onRequestClose();
      onOtpVerification(email);
    } catch (error) {
      console.error("Error sending forgot password email:", error);
      toast.error("Error sending forgot password email");
    }
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <div
      className={`fixed inset-0 ${
        isOpen ? "flex" : "hidden"
      } items-center justify-center bg-black bg-opacity-25`}
    >
      <ToastContainer />
      <div className="bg-white w-96 p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-6">Forgot Password</h2>
        <form onSubmit={(e) => e.preventDefault()} className="space-y-3">
          <div className="mb-4">
            <label className="block text-gray-600 text-sm">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 px-3 py-2 text-gray-700 bg-gray-200 rounded-lg transition-all duration-300 border"
            />
            {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
          </div>
          <button
            type="button"
            onClick={handleForgotPassword}
            className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-700 rounded-lg duration-150"
          >
            Submit
          </button>
        </form>
        <button
          type="button"
          onClick={onRequestClose}
          className="mt-4 text-gray-500 hover:text-gray-700"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ForgotPasswordModal;
