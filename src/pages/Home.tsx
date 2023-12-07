// Home.tsx

import React,{useEffect} from 'react';
import Navbar from '../components/common/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import  {RootState}  from '../redux/store';
import MapScreen  from '../pages/map/ClusterMap'
import HomeScreen from './home/homeScreen';
import api from '../services/userApi';
import { setHotels } from '../redux/slices/hotelSlice';


const Home: React.FC = () => {
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.auth.user);


  return (
    <div >
      <Navbar user={user} />
     <HomeScreen/>
     {/* <MapScreen /> */}
    </div>
  );
};

export default Home;
