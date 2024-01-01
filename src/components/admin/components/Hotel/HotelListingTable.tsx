


import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Button, Card, CardBody, CardFooter, CardHeader, IconButton, Tooltip, Typography } from "@material-tailwind/react";
import { PencilIcon } from "@heroicons/react/24/solid";
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../../../redux/store'; 
import adminApi from '../../../../services/adminApi';

import { Dispatch } from 'redux';
// import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";

export const HotelListingTable: React.FC = () => {
  const dispatch: Dispatch<any> = useDispatch();
  const hotels = useSelector((state: RootState) => state.hotel.hotels);
  const [selectedPage, setSelectedPage] = useState(1);
  const [selectedHotelDetails, setSelectedHotelDetails] = useState(null); 
  const [searchHotelName, setSearchHotelName] = useState('');
  const [searchLocation, setSearchLocation] = useState('');

  const filteredHotels = hotels.filter(
    (hotel) =>
      hotel.details.hotelName.toLowerCase().includes(searchHotelName.toLowerCase()) &&
      hotel.details.location.toLowerCase().includes(searchLocation.toLowerCase())
  );
  
  const pageSize = 3;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (hotels.length <= 0) {
          dispatch(adminApi.getAllHotels());
       }
        
      } catch (error) {
        console.error('Error fetching hotel data:', error);
      }
    };

    fetchData();
  }, []);

  const startIndex = (selectedPage - 1) * pageSize;
  const displayedHotels = filteredHotels.slice(startIndex, startIndex + pageSize);

  const handleAddHotelsClick = () => {
    navigate('/admin/dashboard/addHotel');
  };

  const handlePageClick = (pageNumber: number) => {
    setSelectedPage(pageNumber);
  };
  const handleEditHotelClick = (hotelId: string) => {
    const selectedHotel = hotels.find((hotel) => hotel._id === hotelId);
    setSelectedHotelDetails(selectedHotel);

    navigate(`/admin/dashboard/editHotel?hotelId=${hotelId}`);
  };
  return (
    <Card className="h-full w-full overflow-hidden"  placeholder={'card'}>
      <CardHeader floated={false} shadow={false} className="rounded-none"  placeholder={'cardHeader'}>
        <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <div>
            <Typography variant="h5" color="blue-gray" className='ml-3 mt-3'  placeholder={'typography'}>
              Manage Hotels
            </Typography>
          </div>
          <div className="flex w-full shrink-0 gap-2 md:w-max">
            <Button  placeholder={'typography'} onClick={handleAddHotelsClick} className="flex items-center gap-3 text-black mt-3 mr-3" variant="outlined" size="sm">
              Add Hotels
            </Button>
          </div>
        </div>
        <div className="flex justify-between gap-2">
        <input
  type="text"
  placeholder="Search by Hotel Name"
  value={searchHotelName}
  onChange={(e) => {
    setSearchHotelName(e.target.value);
    console.log('Search Hotel Name:', e.target.value);
  }}
  className="border p-2 rounded-md ml-3 mb-2"
/>
<input
  type="text"
  placeholder="Search by Location"
  value={searchLocation}
  onChange={(e) => {
    setSearchLocation(e.target.value);
    console.log('Search Location:', e.target.value);
  }}
  className="border p-2 rounded-md mr-3 mb-2"
/>

        </div>
      </CardHeader>
      <CardBody className="overflow-x-auto px-0"  placeholder={'typography'}>
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
                 placeholder={'typography'}
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  Name
                </Typography>
              </th>
              <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                <Typography
                 placeholder={'typography'}
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  Location
                </Typography>
              </th>
              <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                <Typography
                 placeholder={'typography'}
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  Min Rent
                </Typography>
              </th>
              <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                <Typography
                 placeholder={'typography'}
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  Contact No
                </Typography>
              </th>
              <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                <Typography
                 placeholder={'typography'}
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  Email Address
                </Typography>
              </th>
              <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                <Typography
                 placeholder={'typography'}
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  Description
                </Typography>
              </th>
             
              <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                <Typography
                 placeholder={'typography'}
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  Actions
                </Typography>
              </th>
            </tr>
          </thead>
          <tbody>
            {displayedHotels.map(({ _id, details, location, images }, index) => {
              const isLast = index === displayedHotels.length - 1;
              const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";


              return (
                <tr key={_id}>
                <td className={classes}>
                  <Avatar
                   placeholder={'avatar'}
                    src={images[0]} 
                    alt={details.hotelName}
                    size="sm" 
                    className="border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1"
                    style={{ width: '50px', height: '50px' }}
                  />
                </td>
                  <td className={classes}>
                    <Typography  placeholder={'typography'} variant="small" color="blue-gray" className="font-bold">
                      {details.hotelName}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography  placeholder={'typography'} variant="small" color="blue-gray" className="font-normal">
                      {details.location}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography  placeholder={'typography'} variant="small" color="blue-gray" className="font-normal">
                      {details.minRent}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography  placeholder={'typography'} variant="small" color="blue-gray" className="font-normal">
                      {details.contactNo}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography  placeholder={'typography'} variant="small" color="blue-gray" className="font-normal">
                      {details.emailAddress}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography placeholder={'typography'} variant="small" color="blue-gray" className="font-normal">
                      {details.description}
                    </Typography>
                  </td>
                  
                  <td className={classes}>
              <Tooltip content="Edit Hotel">
                <IconButton  placeholder={'typography'} variant="text" onClick={() => handleEditHotelClick(_id)}>
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
      <CardFooter  placeholder={'cardfooter'} className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Button  placeholder={'previous'} variant="outlined" size="sm" disabled={selectedPage === 1} onClick={() => handlePageClick(selectedPage - 1)}>
          Previous
        </Button>
        <div className="flex items-center gap-2">
          {[...Array(Math.ceil(hotels.length / pageSize)).keys()].map((pageNumber) => (
            <Button
            placeholder={'pagenumber'}
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
        <Button  placeholder={'next'} variant="outlined" size="sm" disabled={startIndex + pageSize >= hotels.length} onClick={() => handlePageClick(selectedPage + 1)}>
          Next 
        </Button>
      </CardFooter>
    </Card>
  );
};

export default HotelListingTable;
