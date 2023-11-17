// AvatarMenu.tsx
import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { UserData } from "../../types/authTypes";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from "../../redux/actions/authActions";

const AvatarMenu: React.FC<{ user: UserData }> = ({ user }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const profileRef = useRef<HTMLButtonElement | null>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/');
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

  const navigation = [
    { title: "Profile", path: "/profile" },
  ];

  return (
    <div className="relative ml-auto">
      {user && (
        <div className="relative">
          <button
            ref={profileRef}
            className="w-10 h-10 outline-none rounded-full ring-offset-2 ring-gray-200 block"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <img
              src={user.profileImage || "/logo/profile.png"}
              alt="User"
              className="w-full h-full rounded-full"
            />
          </button>
          

          {/* Dropdown content */}
          {menuOpen && (
            <ul className="bg-white top-14 right-0 mt-6 space-y-6 absolute border rounded-md w-52 shadow-md space-y-0 mt-0">
              <li><p className="block text-gray-600 hover:text-gray-900 p-3">{user.email}</p></li>
              {navigation.map((item, idx) => (
                <li key={idx}>
                  <NavLink
                    to={item.path}
                    className="block text-gray-600 hover:text-gray-900 p-3"
                  >
                    {item.title}
                  </NavLink>
                </li>
              ))}
              <button onClick={handleLogout} className="block w-full text-justify text-gray-600 hover:text-gray-900 border-t py-3 p-3">
                Logout
              </button>
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default AvatarMenu;
