import React, { useState } from "react";
import VerifyOTP from "../auth/VerifyOTP";
import Modal from "react-modal";

interface OTPModalProps {
  isOpen: boolean;
  onRequestClose: (modalIdentifier: string) => void;
  email?: string;
  isForgotPassword?: boolean;
  children?: React.ReactNode;
}
Modal.setAppElement("#root");

const OTPModal: React.FC<OTPModalProps> = ({
  isOpen,
  onRequestClose,
  email,
  isForgotPassword,
}) => {

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => onRequestClose("otp")}
      contentLabel="OTP Verification Modal"
      overlayClassName="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      className="relative bg-white rounded-md shadow-md max-w-md w-full p-0 md:p-4"
    >
      <div className="absolute top-4 right-4">
        <button
          type="button"
          className="text-gray-400 hover:text-gray-900 rounded-lg text-sm w-8  flex items-center justify-center dark:hover:bg-gray-200 dark:hover:text-gray-900"
          onClick={() => onRequestClose("otp")}
          style={{ marginTop: "0px", marginRight: "-14px" }}
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
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
          <span className="sr-only">Close modal</span>
        </button>
      </div>
      <VerifyOTP
        onRequestClose={() => onRequestClose("otp")}
        email={email}
        isForgotPassword={isForgotPassword}
      />
    </Modal>
  );
};

export default OTPModal;
