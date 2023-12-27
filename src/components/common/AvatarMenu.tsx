// AvatarMenu.tsx
import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { UserData } from "../../types/authTypes";
import { useNavigate } from 'react-router-dom';
import { logoutUser } from "../../redux/actions/authActions";
import UserProfileModal from '../user/UserProfileModal';
import { RootState } from '../../redux/store';
import { useDispatch ,useSelector} from "react-redux";



const AvatarMenu: React.FC<{ user: UserData }> = ({ user }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const profileRef = useRef<HTMLButtonElement | null>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state: RootState) => state.auth.user);
  const [isProfileModalOpen, setProfileModalOpen] = useState(false);

  const handleOpenProfileModal = () => {
    setProfileModalOpen(true);
  };


  const handleLogout = () => {
    localStorage.removeItem('userData');
    dispatch(logoutUser());
    navigate('/');
  };

  const handleBookings = () => {
    console.log('heyyy');
  };
  

  const handleCloseProfileModal = () => {
    setProfileModalOpen(false);
  };

  useEffect(() => {
    const handleDropDown = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("click", handleDropDown);

    return () => {
      document.removeEventListener("click", handleDropDown);
    };
  }, []);

  return (
    <div className="relative ml-auto">
      {userData && (
        <div className="relative">
          <button
            ref={profileRef}
            className="w-10 h-10 outline-none rounded-full ring-offset-2 ring-gray-200 block"
            onClick={() => {
           
              setMenuOpen(!menuOpen)}} 
          >
            <img
              src={userData.profileImage || "/logo/profile.png"}
              alt="User"
              className="w-full h-full rounded-full"
            />
          </button>

          {/* Dropdown content */}
          {menuOpen && (
            <ul className="bg-white top-14 right-0 mt-0 space-y-6 absolute border rounded-md w-52 shadow-md space-y-0 mt-0" style={{ zIndex: '2000' }}>
              <li><p className="block text-gray-600 hover:text-gray-900 p-3">{userData.username ? userData.username : userData.email}</p></li>
              <li>
                <NavLink
                  to=""
                  className="block text-gray-600 hover:text-gray-900 p-3"
                  onClick={() => {   handleOpenProfileModal()
                    setMenuOpen(false)}} 
                >
                  Profile
                </NavLink>
                <NavLink
                  to="/user/bookings"
                  className="block text-gray-600 hover:text-gray-900 p-3"
                  onClick={handleBookings} 
                >
                  MyBookings
                </NavLink>
              </li>
              <button onClick={handleLogout} className="block w-full text-justify text-gray-600 hover:text-gray-900 border-t py-3 p-3">
                Logout
              </button>
            </ul>
          )}
        </div>
      )}
     {isProfileModalOpen && <UserProfileModal user={userData} isOpen={isProfileModalOpen} onClose={handleCloseProfileModal} />}

    </div>
  );
};

export default AvatarMenu;
