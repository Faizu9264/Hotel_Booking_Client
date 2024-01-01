// Home.tsx
import React,{useEffect,useState} from 'react';
import Navbar from '../components/common/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import  {RootState}  from '../redux/store';
import MapScreen  from '../pages/map/ClusterMap'
import HomeScreen from './home/homeScreen';
import { setHotels } from '../redux/slices/hotelSlice';
import Footer from '../components/common/Footer'
import useCheckToken from '../services/tokenUtils';


const Home: React.FC = () => {
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.auth.user);
  const [isProfileModalOpen, setProfileModalOpen] = useState(false);
    // useCheckToken()
 
  const handleOpenProfileModal = () => {
    setProfileModalOpen(true);
  };

  return (
    <div >
      <Navbar user={user} />

      <HomeScreen handleOpenProfileModal={handleOpenProfileModal}/>
      <Footer/>
    </div>
  );
};

export default Home;
