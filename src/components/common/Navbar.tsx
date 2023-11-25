import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { UserData } from "../../types/authTypes";
import { Link } from "react-router-dom";
import { RootState } from '../../redux/store';
import AvatarMenu from "./AvatarMenu"; 
import { useNavigate } from 'react-router-dom';
import { logoutUser } from "../../redux/actions/authActions";
import { useDispatch, useSelector } from 'react-redux';
import { setLoginStatus } from '../../redux/actions/authActions';
const Navbar: React.FC<{ user: UserData }> = ({ user }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    dispatch(setLoginStatus(false));
    navigate('/');
  };
  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };
  const handleLoginButtonClick = () => {
    navigate('/user/login')
  };


  const handleSignupButtonClick = () => {
    navigate('/user/signup')
  };



  
  
  return (
    <nav className="bg-blue-500 p-4">
    <div className="container mx-auto flex justify-between items-center">
      <div className="flex items-center">
        <Link to="/" className="text-white text-lg font-bold">
          StayCation
        </Link>
      </div>

      <div className="hidden md:flex items-center space-x-4 flex-grow">
        <div className="flex justify-center space-x-4 flex-grow"> 
          <NavLink to="/" className="text-white hover:text-gray-300 transition duration-300">
            Home
          </NavLink>
          <NavLink to="/user/about" className="text-white hover:text-gray-300 transition duration-300">
            About
          </NavLink>
          <NavLink to="/user/contact" className="text-white hover:text-gray-300 transition duration-300">
            Contact
          </NavLink>
        </div>

        {user&&isLoggedIn ? (
          <>
            <AvatarMenu user={user} />
          </>
        ) : (
          <div className="flex space-x-4 items-center">
          <button onClick={handleSignupButtonClick} className="text-blue-500 hover:text-gray-500 transition duration-300 bg-white p-2 rounded border border-gray-300">
            Sign Up
          </button>
          <button onClick={handleLoginButtonClick}  className="text-blue-500 hover:text-gray-500 transition duration-300 bg-white p-2 rounded border border-gray-300">
            Log In
          </button>
        </div>       
        )}
      </div>


        <div className="md:hidden flex items-center">
          {user&&isLoggedIn ? (
            <>
              <img
                src={user.profileImage || "/logo/profile.png"}
                alt="User Profile"
                className="w-8 h-8 rounded-full border-2 border-white"
              />
             
            </>
          )
           : (
            <div className="flex space-x-4">
              {/* <NavLink to="/signup" className="text-white hover:text-gray-300 transition duration-300">
                Sign Up
              </NavLink>
              <NavLink to="/login" className="text-white hover:text-gray-300 transition duration-300">
                Log In
              </NavLink> */}
            </div>
          )}

          <button onClick={handleMenuToggle} className="text-white focus:outline-none ml-4">
            {menuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-blue-500">
          <div className="container mx-auto py-2">
            <NavLink to="/" className="block text-white hover:text-gray-300 transition duration-300 py-2">
              Home
            </NavLink>
            <NavLink to="/user/about" className="block text-white hover:text-gray-300 transition duration-300 py-2">
              About
            </NavLink>
            <NavLink to="/user/contact" className="block text-white hover:text-gray-300 transition duration-300 py-2">
              Contact
            </NavLink>
            {user&&isLoggedIn && (
              <>
                <NavLink to="/user/profile" className="block text-white hover:text-gray-300 transition duration-300 py-2">
                  Profile
                </NavLink>
                <NavLink to="" onClick={handleLogout} className="block text-white hover:text-gray-300 transition duration-300 py-2">
                  Logout
                </NavLink>
              </>
            )}
            {!user && (
              <>
               <button  onClick={handleSignupButtonClick} className="block text-white hover:text-gray-300 transition duration-300 py-2">
        Sign Up
      </button>
                <div className="flex space-x-4 items-center">
          <button onClick={handleLoginButtonClick}  className="block text-white hover:text-gray-300 transition duration-300 py-2" >
            Log In
          </button>
        </div>
              </>
            )}
          </div>
        </div>
      )}
      {/* <SignupModal isOpen={signupModalOpen} onRequestClose={handleSignupModalClose} />
      <LoginModal isOpen={loginModalOpen} onRequestClose={handleLoginModalClose} /> */}
    </nav>
  );
};

export default Navbar;
