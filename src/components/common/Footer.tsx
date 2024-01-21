import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setHotels } from "../../redux/slices/hotelSlice";
import api from "../../services/userApi";
import { RootState } from "../../redux/store";
import SupportEngine from "../supportEngine/SupportEngine";

// import TwitterIcon from "./path/to/twitter-icon.png";
// import InstagramIcon from "./path/to/instagram-icon.png";
// import LinkedinIcon from "./path/to/linkedin-icon.png";
// import GithubIcon from "./path/to/github-icon.png";
const Footer = () => {
  const dispatch = useDispatch();
  const hotels = useSelector((state: RootState) => state.hotel.hotels);
  const handleViewHotels = async () => {
    if (hotels.length <= 0) {
      try {
        const response = await api.getAllHotels();
        dispatch(setHotels(response as any));
      } catch (error) {
        console.error("Error fetching hotel data:", error);
      }
    }
  };
  return (
    <>
      <SupportEngine />

      <footer
        className="bg-cyan-950 p-4 text-white py-6"
        style={{ clear: "both", marginTop: "25px" }}
      >
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h2 className="text-2xl font-bold mb-4">StayCation</h2>
              <p className="text-sm">
                Your go-to platform for booking hotels and rooms.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-4">Quick Links</h2>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="hover:text-gray-300">
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/view-hotels"
                    className="hover:text-gray-300"
                    onClick={handleViewHotels}
                  >
                    Hotels
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-4">Contact Us</h2>
              <p className="text-sm">123 Street, City</p>
              <p className="text-sm">info@staycation.com</p>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-4">Follow Us</h2>
              <div className="flex space-x-8">
                <a
                  href="https://www.facebook.com/faizu.fazz.90?mibextid=b1r3HaZxQ2aOKKJt"
                  className="text-lg hover:text-gray-300"
                  rel="noopener noreferrer"
                >
                  <img src="/png/facebook.png" alt="facebook" />
                </a>
                <a
                  href="https://twitter.com/RonexDEVIL"
                  className="text-lg hover:text-gray-300"
                  rel="noopener noreferrer"
                >
                  <img src="/png/twitter.png" alt="twitter" />
                </a>
                <a
                  href="https://www.instagram.com/faizu_rahman__?igsh=MTQwb200eHZxc215aQ=="
                  className="text-lg hover:text-gray-300"
                  rel="noopener noreferrer"
                >
                  <img src="/png/instagram.png" alt="instagram" />
                </a>
                <a
                  href="https://www.linkedin.com/in/faizu-rahman-a496aa256?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                  className="text-lg hover:text-gray-300"
                  rel="noopener noreferrer"
                >
                  <img src="/png/linkedin.png" alt="linkedin" />
                </a>
                <a
                  href="https://github.com/Faizu9264"
                  className="text-lg hover:text-gray-300"
                  rel="noopener noreferrer"
                >
                  <img src="/png/github.png" alt="github" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
