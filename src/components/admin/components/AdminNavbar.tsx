import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutAdmin} from '../../../redux/actions/adminActions';
import { useNavigate } from 'react-router-dom';
import { setAdminData, setAdminLoginStatus } from '../../../redux/actions/adminActions';

const Navbar: React.FC = () => {
  const dispatch = useDispatch();
const navigate = useNavigate()
  const handleLogout = () => {
    dispatch(logoutAdmin());
  dispatch(setAdminLoginStatus(false));
  localStorage.removeItem('adminData');
  localStorage.removeItem('adminLoginStatus');
  localStorage.removeItem('AdminToken')
    navigate('/admin/login');
  };
  return (
    <nav className="bg-black shadow-500 p-4 flex justify-between items-center">
      <h1 className="text-white text-xl font-medium ">StayCation</h1>
      <div className="flex items-center gap-x-2">
  <FontAwesomeIcon icon={faUserCircle} className="w-6 h-6 text-white" />
  <div className="dropdown">
    {/* Dropdown content */}
    <div className="dropdown-content">
    <Link to="/admin/login" onClick={handleLogout} className='text-white'>
              Logout
            </Link>
    </div>
  </div>
</div>
    </nav>
  );
};

export default Navbar;
