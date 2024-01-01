import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Button, Card, CardBody, CardFooter, CardHeader, IconButton, Tooltip, Typography } from "@material-tailwind/react";
import { PencilIcon } from "@heroicons/react/24/solid";
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../../../redux/store'; 
import adminApi from '../../../../services/adminApi';

import { Dispatch } from 'redux';
// import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";

// Import other necessary dependencies

export const RoomListingTable: React.FC = () => {
    const dispatch: Dispatch<any> = useDispatch();
    const rooms = useSelector((state: RootState) => state.rooms.rooms);
    const [selectedPage, setSelectedPage] = useState(1);
    const [selectedRoomDetails, setSelectedRoomDetails] = useState(null);
    const [searchRoomType, setSearchRoomType] = useState('');
    const [searchHotelName, setSearchHotelName] = useState('');
  
    const pageSize = 3;
    const navigate = useNavigate();
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          if(rooms.length<=0){
            dispatch(adminApi.getAllRooms());
           }
         
        } catch (error) {
          console.error('Error fetching room data:', error);
        }
      };
  
      fetchData();
    }, []);
  
    const startIndex = (selectedPage - 1) * pageSize;
    const filteredRooms = rooms.filter(
      (room) =>
        room.roomType.toLowerCase().includes(searchRoomType.toLowerCase()) &&
        room.hotelName.toLowerCase().includes(searchHotelName.toLowerCase())
    );
  
    const displayedRooms = filteredRooms.slice(startIndex, startIndex + pageSize);
       console.log('displayedRooms',displayedRooms);
       
    const handleAddRoomsClick = () => {
      navigate('/admin/dashboard/addRoom');
    };
  
    const handlePageClick = (pageNumber: number) => {
      setSelectedPage(pageNumber);
    };
  
    const handleEditRoomClick = (roomId: string) => {
      const selectedRoom = rooms.find((room) => room._id === roomId);
      setSelectedRoomDetails(selectedRoom);
  
      navigate(`/admin/dashboard/editRoom?roomId=${roomId}`);
    };
  
    return (
      <Card className="h-full w-full overflow-hidden" placeholder={'card'}>
        <CardHeader floated={false} shadow={false} className="rounded-none" placeholder={'cardHeader'}>
          <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
            <div>
              <Typography variant="h5" color="blue-gray" className='ml-3 mt-3' placeholder={'typography'}>
                Manage Rooms
              </Typography>
            </div>
            <div className="flex w-full shrink-0 gap-2 md:w-max">
              <Button placeholder={'addrooms'} onClick={handleAddRoomsClick} className="flex items-center gap-3 text-black mt-3 mr-3" variant="outlined" size="sm">
                Add Rooms
              </Button>
            </div>
            
          </div>
          <div className="flex justify-between gap-2">
        <input
          type="text"
          placeholder="Search by Room Type"
          value={searchRoomType}
          onChange={(e) => setSearchRoomType(e.target.value)}
          className="border p-2 rounded-md ml-3 mb-2"
        />
        <input
          type="text"
          placeholder="Search by Hotel Name"
          value={searchHotelName}
          onChange={(e) => setSearchHotelName(e.target.value)}
          className="border p-2 rounded-md mr-3 mb-2"
        />
      </div>
        </CardHeader>
        <CardBody className="overflow-x-auto px-0" placeholder={'card body'}>
          <table className="w-full table-auto text-left">
            <thead>
              <tr>
                <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                    placeholder={'typography'}
                  >
                    Photo
                  </Typography>
                </th>
                <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                    placeholder={'typography'}
                  >
                    Room Type
                  </Typography>
                </th>
                <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                    placeholder={'typography'}
                  >
                   HotelName
                  </Typography>
                </th>
                {/* Add other headers for MaxPeople, AddedOn, RoomsCount, etc. */}
                <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                    placeholder={'typography'}
                  >
                    Max People
                  </Typography>
                </th>
                {/* Add other headers for AddedOn, RoomsCount, etc. */}
                <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                    placeholder={'typography'}
                  >
                    Added On
                  </Typography>
                </th>
                {/* Add other headers for RoomsCount, etc. */}
                <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                    placeholder={'typography'}
                  >
                    Rooms Count
                  </Typography>
                </th>
                <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                    placeholder={'typography'}
                  >
                   Amenities
                  </Typography>
                </th>
                {/* Add other headers for Actions */}
                <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                    placeholder={'typography'}
                  >
                    Actions
                  </Typography>
                </th>
              </tr>
            </thead>
            <tbody>
              {displayedRooms.map(({ _id,hotelName,amenities,roomType,maxPeople,createdAt,roomsCount, images }, index) => {
                const isLast = index === displayedRooms.length - 1;
                const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
  
                return (
                  <tr key={_id}>
                    <td className={classes}>
                      <Avatar
                        src={images[0]}
                        alt='RoomImage'
                        size="sm"
                        className="border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1"
                        style={{ width: '50px', height: '50px' }}
                        placeholder={'avatar'}
                      />
                    </td>
                    <td className={classes}>
                      <Typography  placeholder={'typography'} variant="small" color="blue-gray" className="font-bold">
                        {roomType}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography  placeholder={'typography'} variant="small" color="blue-gray" className="font-bold">
                        {hotelName}
                      </Typography>
                    </td>
                    {/* Add other cells for MaxPeople, AddedOn, RoomsCount, etc. */}
                    <td className={classes}>
                      <Typography  placeholder={'typography'} variant="small" color="blue-gray" className="font-normal">
                        {maxPeople}
                      </Typography>
                    </td>
                    {/* Add other cells for AddedOn, RoomsCount, etc. */}
                    <td className={classes}>
                    <Typography  placeholder={'typography'} variant="small" color="blue-gray" className="font-normal">
                       {new Date(createdAt).toLocaleString('en-US', {
                         year: 'numeric',
                         month: 'long',
                         day: 'numeric',
                         hour: 'numeric',
                         minute: 'numeric',
                        })}
                      </Typography>
                    </td>

                    {/* Add other cells for RoomsCount, etc. */}
                    <td className={classes}>
                      <Typography  placeholder={'typography'} variant="small" color="blue-gray" className="font-normal">
                        {roomsCount}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography  placeholder={'typography'} variant="small" color="blue-gray" className="font-normal">
                        {amenities}
                      </Typography>
                    </td>
                    {/* Add other cells for Actions */}
                    <td className={classes}>
                      <Tooltip content="Edit Room">
                        <IconButton  placeholder={'typography'} variant="text" onClick={() => handleEditRoomClick(_id)}>
                          <PencilIcon className="h-4 w-4" />
                        </IconButton>
                      </Tooltip>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardBody>
        <CardFooter  placeholder={'card footer'} className="flex items-center justify-between border-t border-blue-gray-50 p-4">
          <Button  placeholder={'previous'} variant="outlined" size="sm" disabled={selectedPage === 1} onClick={() => handlePageClick(selectedPage - 1)}>
            Previous
          </Button>
          <div className="flex items-center gap-2">
            {[...Array(Math.ceil(rooms.length / pageSize)).keys()].map((pageNumber) => (
              <Button
              placeholder={'page number'}
                key={pageNumber + 1}
                variant={pageNumber + 1 === selectedPage ? "filled" : "text"}
                color={pageNumber + 1 === selectedPage ? "blue" : "gray"}
                onClick={() => handlePageClick(pageNumber + 1)}
                className="rounded-full w-6 h-6 flex items-center justify-center cursor-pointer"
              >
                {pageNumber + 1}
              </Button>
            ))}
          </div>
          <Button  placeholder={'next'} variant="outlined" size="sm" disabled={startIndex + pageSize >= rooms.length} onClick={() => handlePageClick(selectedPage + 1)}>
            Next
          </Button>
        </CardFooter>
      </Card>
    );
  };
  
  export default RoomListingTable;
  