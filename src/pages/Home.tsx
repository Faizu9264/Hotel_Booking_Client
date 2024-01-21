// Home.tsx
import React, { useState } from "react";
import Navbar from "../components/common/Navbar";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import HomeScreen from "./home/homeScreen";
import Footer from "../components/common/Footer";

const Home: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [isProfileModalOpen, setProfileModalOpen] = useState(false);

  const handleOpenProfileModal = () => {
    setProfileModalOpen(true);
  };

  return (
    <div>
      <Navbar user={user} />
      <div className="mb-0">
        <HomeScreen handleOpenProfileModal={handleOpenProfileModal} />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
