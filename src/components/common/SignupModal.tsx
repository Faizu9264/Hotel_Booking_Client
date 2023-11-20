// // src/components/common/SignupModal.tsx
// import React from 'react';
// import Modal from 'react-modal';
// import Signup from '../auth/Signup';

// interface SignupModalProps {
//   isOpen: boolean;
//   onRequestClose: (modalIdentifier: string) => void;
//   children?: React.ReactNode;
// }

// Modal.setAppElement('#root');

// const SignupModal: React.FC<SignupModalProps> = ({ isOpen, onRequestClose, children }) => {

  
//   return (
//     <Modal
//       isOpen={isOpen}
//       onRequestClose={() => onRequestClose('signup')}
//       contentLabel="Signup Modal"
//       overlayClassName="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
//       className="relative bg-white rounded-md shadow-md max-w-md w-full p-0 md:p-4"
//     >
//       <div className="w-full max-w-md mx-auto">
//         <div className="flex items-center justify-between border-b rounded-t ">
//           <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
//             Create Your Account
//           </h3>
//           <button
//             type="button"
//             className="text-gray-400 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex items-center justify-center dark:hover:bg-gray-200 dark:hover:text-gray-900"
//             onClick={() => onRequestClose('signup')}
//           >
//              <svg
//               className="w-4 h-4"
//               aria-hidden="true"
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 14 14"
//             >
//               <path
//                 stroke="currentColor"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
//               />
//             </svg>
//           </button>
//         </div>
//         <div className="p-4 md:p-5">
//           {/* Pass onRequestClose to the Signup component */}
//           <Signup onRequestClose={() => onRequestClose('signup')} />
//         </div>
//       </div>
//     </Modal>
//   );
// };

// export default SignupModal;
