import React, { useState, useEffect, useRef } from "react";
import { Button } from "@mui/material";
import { NavLink } from "react-router-dom";
import { UserData } from "../../types/authTypes";
import { Link } from "react-router-dom";
import { RootState } from "../../redux/store";
import AvatarMenu from "./AvatarMenu";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../redux/actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import { setLoginStatus } from "../../redux/actions/authActions";
import { setUserData } from "../../redux/actions/authActions";
import UserProfileModal from "../user/UserProfileModal";
import { Socket, io } from "socket.io-client";
import api from "../../services/userApi";
import { setHotels } from "../../redux/slices/hotelSlice";
import { TravelExplore } from "@mui/icons-material";

import "./navbar.css";

const Navbar: React.FC<{ user: UserData }> = ({ user }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isProfileModalOpen, setProfileModalOpen] = useState(false);
  const dispatch = useDispatch();

  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const userData = useSelector((state: RootState) => state.auth.user);
  const hotels = useSelector((state: RootState) => state.hotel.hotels);
  const navigate = useNavigate();

  const handleOpenProfileModal = () => {
    setProfileModalOpen(true);
  };

  const handleCloseProfileModal = () => {
    setProfileModalOpen(false);
  };
  useEffect(() => {
    const fetchData = async () => {
      const isUserLoggedInFromLocalStorage =
        localStorage.getItem("userData") !== null;
      dispatch(setLoginStatus(isUserLoggedInFromLocalStorage));

      if (isUserLoggedInFromLocalStorage) {
        const userData = JSON.parse(localStorage.getItem("userData") || "");
        dispatch(setUserData(userData));
      }
    };

    fetchData();
  }, []);

  const socket = useRef<Socket | null>();
  useEffect(() => {
    if (!socket.current && userData) {
      socket.current = io("http://localhost:5000");
      socket.current.emit("addUser", userData?.userId);
      socket.current.on("getUser", (data) => {
      });
      socket.current.on("responseIsBlocked", (data: { blocked: boolean }) => {
        if (data.blocked) {
          dispatch(logoutUser());
        }
      });
    }
  }, [socket, userData]);

  const handleLogout = () => {
    localStorage.removeItem("userData");
    dispatch(logoutUser());
    dispatch(setLoginStatus(false));
    navigate("/");
  };
  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };
  const handleLoginButtonClick = () => {
    navigate("/login");
  };

  const handleViewHotels = async () => {
    if (hotels.length <= 0) {
      const response = await api.getAllHotels();
      dispatch(setHotels(response as any));
    }
    navigate("/view-hotels");
  };
  const handleSignupButtonClick = () => {
    navigate("/signup");
  };
  const handleFindHotels = async () => {
    try {
      if (hotels.length <= 0) {
        const response = await api.getAllHotels();
        dispatch(setHotels(response as any));
      }
      navigate("/find-hotels");
    } catch (error) {
      console.error("Error fetching hotel data:", error);
    }
  };

  return (
    <nav className="bg-cyan-950 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="text-white text-lg font-bold">
            StayCation
          </Link>
        </div>
        <div className="ml-5">
          <Button
            variant="outlined"
            onClick={handleFindHotels}
            sx={{ borderColor: "white", color: "white" }}
            endIcon={<TravelExplore />}
          >
            Find Hotels
          </Button>
        </div>
        <div className="hidden md:flex items-center space-x-4 flex-grow">
          <div className="flex justify-center space-x-4 flex-grow">
            <NavLink
              to="/"
              className={`text-white hover:text-gray-300 transition duration-300 ${
                window.location.pathname === "/"
                  ? "border-b-2 border-white"
                  : ""
              }`}
            >
              Home
            </NavLink>
            <NavLink
              to="/view-hotels"
              onClick={handleViewHotels}
              className={`text-white hover:text-gray-300 transition duration-300 ${
                window.location.pathname === "/view-hotels"
                  ? "border-b-2 border-white"
                  : ""
              }`}
            >
              Hotels
            </NavLink>
          </div>

          {userData && isLoggedIn ? (
            <>
              <AvatarMenu user={userData} />
            </>
          ) : (
            <div className="flex space-x-4 items-center">
              <button
                onClick={handleSignupButtonClick}
                className="text-blue-500 hover:text-gray-500 transition duration-300 bg-white p-2 rounded border border-gray-300"
              >
                Sign Up
              </button>
              <button
                onClick={handleLoginButtonClick}
                className="text-blue-500 hover:text-gray-500 transition duration-300 bg-white p-2 rounded border border-gray-300"
              >
                Log In
              </button>
            </div>
          )}
        </div>

        <div className="md:hidden flex items-center">
          {userData && isLoggedIn ? (
            <>
              <AvatarMenu user={userData} />
            </>
          ) : (
            <div className="flex space-x-4"></div>
          )}

          <button
            onClick={handleMenuToggle}
            className="text-white focus:outline-none ml-4"
          >
            {menuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden ">
          <div className="container mx-auto py-2">
            <NavLink
              to="/"
              className={`block text-white hover:text-gray-300 transition duration-300 py-2 ${
                window.location.pathname === "/" ? "text-gray-300" : ""
              }`}
            >
              Home
            </NavLink>

            {userData && isLoggedIn && (
              <>
                <NavLink
                  to=""
                  onClick={handleOpenProfileModal}
                  className={`block text-white hover:text-gray-300 transition duration-300 py-2 ${
                    window.location.pathname === "/profile"
                      ? "text-gray-300"
                      : ""
                  }`}
                >
                  Profile
                </NavLink>
                <NavLink
                  to=""
                  onClick={handleLogout}
                  className={`block text-white hover:text-gray-300 transition duration-300 py-2 ${
                    window.location.pathname === "/" ? "text-gray-300" : ""
                  }`}
                >
                  Logout
                </NavLink>
              </>
            )}
            {!user && (
              <>
                <button
                  onClick={handleSignupButtonClick}
                  className="block text-white hover:text-gray-300 transition duration-300 py-2"
                >
                  Sign Up
                </button>
                <div className="flex space-x-4 items-center">
                  <button
                    onClick={handleLoginButtonClick}
                    className="block text-white hover:text-gray-300 transition duration-300 py-2"
                  >
                    Log In
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
      {isProfileModalOpen && (
        <UserProfileModal
          user={userData}
          isOpen={isProfileModalOpen}
          onClose={handleCloseProfileModal}
        />
      )}
    </nav>
  );
};

export default Navbar;
