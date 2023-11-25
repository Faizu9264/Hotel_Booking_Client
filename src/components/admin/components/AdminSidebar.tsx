import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faUser,
  faBuilding,
  faCalendar,
  faTag,
  faGift,
  faPhotoVideo,
  faArrowLeft,
  faUserCircle,
} from '@fortawesome/free-solid-svg-icons';
import Navbar from './AdminNavbar';
import HotelListingTable from './Hotel/HotelListingTable';
// import AddLocation from './location/AddLocation';
import AddHotel from './Hotel/AddHotel'
import { useLocation } from 'react-router-dom';

const Sidebar: React.FC = () => {
  const [open, setOpen] = useState(true);
  const [selectedMenu, setSelectedMenu] = useState("Dashboard");
  const location = useLocation();

  const Menus = [
    { title: "Dashboard", icon: faHome, route: "/admin/dashboard/" },
    { title: "Users", icon: faUser, route: "/admin/dashboard/users" },
    { title: "Hotels", icon: faBuilding, route: "/admin/dashboard/hotels" },
    { title: "Rooms", icon: faBuilding, route: "/admin/dashboard/rooms" },
    { title: "Bookings", icon: faCalendar, route: "/admin/dashboard/bookings" },
    { title: "Coupons", icon: faTag, route: "/admin/dashboard/coupons" },
    { title: "Offers", icon: faGift, route: "/admin/dashboard/offers" },
    { title: "Banners", icon: faPhotoVideo, route: "/admin/dashboard/banners" },
  ];

  const handleMenuClick = (title: string) => {
    setSelectedMenu(title);
  };

  return (
    <div className="flex">
      <div
        className={`${
          open ? "w-70" : "w-20 "
        } bg-black h-screen p-5  pt-8 relative duration-300`}
      >
        <FontAwesomeIcon
          icon={faArrowLeft}
          className={`absolute cursor-pointer -right-3 top-9 w-7 text-white
            border-dark-purple border-2 rounded-full  ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
        />
        <div className="flex gap-x-4 items-center">
          <FontAwesomeIcon
            icon={faUserCircle}
            className={`cursor-pointer duration-500 text-white ${
              open && "rotate-[360deg]"
            }`}
          />
          <h1
            className={`text-white origin-left font-medium text-xl duration-200 ${
              !open && "scale-0"
            }`}
          >
            {selectedMenu}
          </h1>
        </div>
        <ul className="pt-6">
  {Menus.map((Menu, index) => (
    <li
      key={index}
      className={`flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 mt-5
        ${
          selectedMenu === Menu.title
            ? "bg-gray-700 text-white"
            : "hover:bg-light-white"
        }`}
      onClick={() => handleMenuClick(Menu.title)}
    >
      <Link to={Menu.route} className="flex items-center gap-x-2">
        <FontAwesomeIcon icon={Menu.icon} className="w-6 h-6" />
        <span className={`${!open && "hidden"} origin-left duration-200  mt-auto`}>
          {Menu.title}
        </span>
      </Link>
    </li>
  ))}
</ul>

      </div>
      <div className="h-screen flex-1 bg-gray-300">
        <Navbar />
        <div className='mt-2 ml-2 mr-2 mb-2'>
        {location.pathname === "/admin/dashboard/hotels" && <HotelListingTable />}
            {location.pathname === "/admin/dashboard/addHotel" && <AddHotel/>}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;