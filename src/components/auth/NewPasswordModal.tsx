import React, { useState } from "react";
import Modal from "react-modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../../services/userApi";

interface NewPasswordModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  email: string;
}

const NewPasswordModal: React.FC<NewPasswordModalProps> = ({
  isOpen,
  onRequestClose,
  email,
}) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const renderEyeIcon = (isVisible: boolean) => {
    return isVisible ? (
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
          d="M6 12l2-2m0 0l4-4m-4 4l4 4"
        />
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
    );
  };

  const handleSetNewPassword = async () => {
    try {
      setError(null);

      if (!newPassword) {
        setError("New Password is required");
        toast.error("New Password is required");
        return;
      }

      if (newPassword !== confirmPassword) {
        setError("Passwords do not match");
        toast.error("Passwords do not match");
        return;
      }
      const response = await api.setNewPassword(email, newPassword);

      if (response) {
        toast.success("New password set successfully");
        onRequestClose();
      } else {
        setError("Error setting new password");
        toast.error("Error setting new password");
      }
    } catch (error) {
      setError("Error setting new password");
      toast.error("Error setting new password");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="New Password Modal"
      overlayClassName="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      className="relative bg-white rounded-md shadow-md max-w-md w-full p-4"
    >
      <div className="absolute top-4 right-4">
        <ToastContainer />
        <button
          type="button"
          className="text-gray-400 hover:text-gray-900 rounded-lg text-sm w-8 flex items-center justify-center dark:hover:bg-gray-200 dark:hover:text-gray-900"
          onClick={onRequestClose}
        >
          <svg
            className="w-4 h-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
          <span className="sr-only">Close modal</span>
        </button>
      </div>
      <form onSubmit={(e) => e.preventDefault()} className="space-y-10">
        <div className="mb-4 text-center">
          <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">
            Update Password
          </h3>
        </div>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter New Password"
            required
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full mt-1 px-4 py-2 text-gray-500 bg-transparent outline-none focus:ring focus:border-indigo-600 shadow-sm rounded-lg transition-all duration-300 border p-2"
          />
          <div
            className="absolute inset-y-0 right-0 pr-2 flex items-center cursor-pointer"
            onClick={togglePasswordVisibility}
          >
            {renderEyeIcon(showPassword)}
          </div>
        </div>
        <div className="relative">
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm New Password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full mt-1 px-4 py-2 text-gray-500 bg-transparent outline-none focus:ring focus:border-indigo-600 shadow-sm rounded-lg transition-all duration-300 border p-2"
          />
          <div
            className="absolute inset-y-0 right-0 pr-2 flex items-center cursor-pointer"
            onClick={toggleConfirmPasswordVisibility}
          >
            {renderEyeIcon(showConfirmPassword)}
          </div>
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          type="button"
          onClick={handleSetNewPassword}
          className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:scale-105 duration-300 active:bg-indigo-600 rounded-lg duration-150"
        >
          Set New Password
        </button>
      </form>
    </Modal>
  );
};

export default NewPasswordModal;
