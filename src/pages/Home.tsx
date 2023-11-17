// Home.tsx

import React from 'react';
import Navbar from '../components/common/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import  {RootState}  from '../redux/store';


const Home: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

  console.log('User Data:', user)

  return (
    <div>
      <Navbar user={user} />
      Home
    </div>
  );
};

export default Home;
