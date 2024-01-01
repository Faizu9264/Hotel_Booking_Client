//userListingTable.tsx;

import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Button, Card, CardBody, CardFooter, CardHeader, IconButton, Tooltip, Typography } from "@material-tailwind/react";
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../../../redux/store';
import adminApi from '../../../../services/adminApi';
import { Dispatch } from 'redux';
import { FaEdit, FaBan, FaCheckCircle } from 'react-icons/fa';
import { Socket,io } from 'socket.io-client';
// import { UserData } from '../../../../types/authTypes';


interface UserListingTableProps {}
export interface UserData {
  _id:string;
  username: string;
  email: string;
  password?: string;
  phoneNumber?:number;
  token?:string;
  isGoogle?:boolean
  confirmPassword?: string;
  profileImage?: string;
  blocked?: boolean;
}

export const UserListingTable: React.FC<UserListingTableProps> = () => {
  const dispatch: Dispatch<any> = useDispatch();
  const users: UserData[] = useSelector((state: RootState) => state.auth.users);
  const [selectedPage, setSelectedPage] = useState<number>(1);
  const [selectedUserDetails, setSelectedUserDetails] = useState<null | UserData>(null);
  
  const [searchUsername, setSearchUsername] = useState<string>('');
  const [searchEmail, setSearchEmail] = useState<string>('');

  const filteredUsers: UserData[] = users.filter(
    (user: UserData) =>
      user.username.toLowerCase().includes(searchUsername.toLowerCase()) &&
      user.email.toLowerCase().includes(searchEmail.toLowerCase())
  );
  const currentAdmin:any = localStorage.getItem('adminData');
  // console.log('currentAdmin ',currentAdmin );
  // const currentAdmin = JSON.parse(currentAdminString);
  
  const pageSize: number = 3;
  const navigate = useNavigate();
  const socket = useRef<Socket| null>(); 
 
  useEffect(()=>{ 
    if(!socket.current && currentAdmin){ 
      socket.current = io('http://localhost:5000') 
      socket.current.emit('addUser',(currentAdmin?._id)) 
    } 
  },[socket, currentAdmin])

  useEffect(() => {
    const fetchData = async () => {
      try {
        
        if (users.length <= 0) {
          dispatch(adminApi.getAllUsers());
        }
     
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, [dispatch]);

  const startIndex: number = (selectedPage - 1) * pageSize;
  const displayedUsers: UserData[] = filteredUsers.slice(startIndex, startIndex + pageSize);

  const handlePageClick = (pageNumber: number): void => {
    setSelectedPage(pageNumber);
  };

  const handleBlockUserClick = async (userId?: string): Promise<void> => {
    if (userId) {
      try {
        await dispatch(adminApi.blockUser(userId));
        console.log('socket.current',socket.current)
        if(socket.current){
          // socket.current.emit('join-room',userId)
          socket.current.emit('blocked',{userId:userId})
        }
      } catch (error) {
        console.error('Error blocking user:', error);
      }
    }
  };
  
  const handleUnblockUserClick = async (userId?: string): Promise<void> => {
    if (userId) {
      try {
        console.log('users',users)
        await dispatch(adminApi.unblockUser(userId));
      } catch (error) {
        console.error('Error unblocking user:', error);
      }
    }
  };
  


  return (
    <Card className="h-full w-full overflow-hidden" placeholder={'card'}>
      <CardHeader floated={false} shadow={false} className="rounded-none" placeholder={'cardHeader'}>
        <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <div>
          <Typography variant="h5" color="blue-gray" className="ml-3 mt-3" placeholder={'typography'}>
           Manage Users
           </Typography>
          </div>
          <div className="flex w-full shrink-0 gap-2 md:w-max">
            {/* Add a button for adding users if needed */}
          </div>
        </div>
        <div className="flex justify-between gap-2">
          <input
            type="text"
            placeholder="Search by Username"
            value={searchUsername}
            onChange={(e) => setSearchUsername(e.target.value)}
            className="border p-2 rounded-md ml-3 mb-2"
          />
          <input
            type="text"
            placeholder="Search by Email"
            value={searchEmail}
            onChange={(e) => setSearchEmail(e.target.value)}
            className="border p-2 rounded-md mr-3 mb-2"
          />
        </div>
      </CardHeader>
      <CardBody className="overflow-x-auto px-0" placeholder={'cardBody'}>
        <table className="w-full table-auto text-left">
          <thead>
            <tr>
              <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                  placeholder={'profileImage'}
                >
                  Profile Image
                </Typography>
              </th>
              <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                  placeholder={'username'}
                >
                  Username
                </Typography>
              </th>
              <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                  placeholder={'email'}
                >
                  Email
                </Typography>
              </th>
            <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                  placeholder={'phone'}
                >
                  Phone Number
                </Typography>
              </th>
              <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                  placeholder={'action'}
                >
                  Actions
                </Typography>
              </th>
            </tr>
          </thead>
          <tbody>
            {displayedUsers.map(({ _id, username, email, profileImage, phoneNumber,blocked }, index) => {
              const isLast = index === displayedUsers.length - 1;
              const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

              return (
                <tr key={_id}>
                  <td className={classes}>
                    <Avatar
                      src={profileImage || '/default-profile-image.jpg'} 
                      alt={username}
                      size="sm"
                      className="border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1"
                      style={{ width: '50px', height: '50px' }}
                      placeholder={'username'}
                    />
                  </td>
                  <td className={classes}>
                    <Typography variant="small" color="blue-gray" className="font-bold" placeholder={'username'}>
                      {username}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography variant="small" color="blue-gray" className="font-normal" placeholder={'email'}>
                      {email}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography variant="small" color="blue-gray" className="font-normal" placeholder={'phoneNumber'}>
                      {phoneNumber}
                    </Typography>
                  </td>
  {/* <Tooltip content="Edit User">
    <IconButton variant="text" onClick={() => handleEditUserClick(_id)}>
    <FaEdit className="h-4 w-4" />
    </IconButton>
  </Tooltip> */}
                <td className={classes}>
  <Tooltip content={blocked ? "Unblock User" : "Block User"}>
    <Button
      variant="outlined"
      onClick={() => (blocked ? handleUnblockUserClick(_id) : handleBlockUserClick(_id))}
      size="sm"
      className="flex items-center gap-1"
      placeholder={'block'}
    >
      {blocked ? <FaCheckCircle className="h-4 w-4" style={{ color: 'green' }} /> : <FaBan className="h-4 w-4" style={{ color: 'red' }} />}
      {blocked ? 'Unblock' : 'Block'}
    </Button>
  </Tooltip>
</td>


                </tr>
              );
            })}
          </tbody>
        </table>
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4" placeholder={'cardfooter'}>
        <Button placeholder={'previous'} variant="outlined" size="sm" disabled={selectedPage === 1} onClick={() => handlePageClick(selectedPage - 1)}>
          Previous
        </Button>
        <div className="flex items-center gap-2">
          {[...Array(Math.ceil(users.length / pageSize)).keys()].map((pageNumber) => (
            <Button
              key={pageNumber + 1}
              variant={pageNumber + 1 === selectedPage ? "filled" : "text"}
              color={pageNumber + 1 === selectedPage ? "blue" : "gray"}
              onClick={() => handlePageClick(pageNumber + 1)}
              className="rounded-full w-6 h-6 flex items-center justify-center cursor-pointer"
              placeholder={'pagenumber'}
            >
              {pageNumber + 1}
              
            </Button>
          ))}
        </div>
        <Button placeholder={'next'} variant="outlined" size="sm" disabled={startIndex + pageSize >= users.length} onClick={() => handlePageClick(selectedPage + 1)}>
          Next 
        </Button>
      </CardFooter>
    </Card>
  );
};

export default UserListingTable;
