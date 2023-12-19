import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setHotels } from '../../redux/slices/hotelSlice';
import api from '../../services/userApi';
import { RootState } from '../../redux/store';


const Footer = () => {
  const dispatch = useDispatch();
  const hotels = useSelector((state: RootState) => state.hotel.hotels);
  const handleViewHotels = async () => {
    if (hotels.length <= 0) {
      try {
        const response = await api.getAllHotels();
        dispatch(setHotels(response as any));
      } catch (error) {
        console.error('Error fetching hotel data:', error);
      }
    }
  };
  return (
    <footer className="bg-cyan-950 p-4 text-white py-6">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Footer Section 1 */}
          <div>
            <h2 className="text-2xl font-bold mb-4">StayCation</h2>
            <p className="text-sm">Your go-to platform for booking hotels and rooms.</p>
          </div>

          {/* Footer Section 2 */}
          <div>
            <h2 className="text-xl font-bold mb-4">Quick Links</h2>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-gray-300">Home</Link></li>
              <li>
            <Link to="/user/view-hotels" className="hover:text-gray-300" onClick={handleViewHotels}>
              Hotels
            </Link>
          </li>
              <li><Link to="/user/view-rooms" className="hover:text-gray-300">Rooms</Link></li>
              <li><Link to="/user/about" className="hover:text-gray-300">About</Link></li>
              <li><Link to="/user/contact" className="hover:text-gray-300">Contact</Link></li>
            </ul>
          </div>

          {/* Footer Section 3 */}
          <div>
            <h2 className="text-xl font-bold mb-4">Contact Us</h2>
            <p className="text-sm">123 Street, City</p>
            <p className="text-sm">info@staycation.com</p>
          </div>

          {/* Footer Section 4 */}
          <div>
            <h2 className="text-xl font-bold mb-4">Follow Us</h2>
            <div className="flex space-x-4">
              <Link to="#" className="text-lg hover:text-gray-300"><i className="fab fa-facebook"></i></Link>
              <Link to="#" className="text-lg hover:text-gray-300"><i className="fab fa-twitter"></i></Link>
              <Link to="#" className="text-lg hover:text-gray-300"><i className="fab fa-instagram"></i></Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
