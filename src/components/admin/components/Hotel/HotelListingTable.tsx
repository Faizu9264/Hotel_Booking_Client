


import React, { useEffect, useMemo, useState } from 'react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { getHotels } from '../../../../redux/actions/hotelActions';
import  selectHotels  from '../../../../redux/reducers/hotelReducer';
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  IconButton,
  Input,
  Tooltip,
  Typography,
} from "@material-tailwind/react";
import { ArrowDownTrayIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { PencilIcon } from "@heroicons/react/24/solid";
import { useNavigate } from 'react-router-dom';

// Dummy data for testing
const dummyHotels = [
  {
    _id: '1',
    uName: 'John Doe',
    title: 'Hotel ABC',
    description: 'A wonderful hotel',
    lng: '-74.0059',
    lat: '40.7128',
    images: ['https://placekitten.com/200/300'],
    uPhoto: 'https://placekitten.com/50/50',
    createdAt: '2023-01-01T12:00:00Z',
  },
  {
    _id: '2',
    uName: 'John Doe',
    title: 'Hotel ABC',
    description: 'A wonderful hotel',
    lng: '-74.0059',
    lat: '40.7128',
    images: ['https://placekitten.com/200/300'],
    uPhoto: 'https://placekitten.com/50/50',
    createdAt: '2023-01-01T12:00:00Z',
  },
  {
    _id: '3', 
    uName: 'John Doe',
    title: 'Hotel ABC',
    description: 'A wonderful hotel',
    lng: '-74.0059',
    lat: '40.7128',
    images: ['https://placekitten.com/200/300'],
    uPhoto: 'https://placekitten.com/50/50',
    createdAt: '2023-01-01T12:00:00Z',
  },
];


export const HotelListingTable: React.FC = () => {
  const dispatch = useDispatch();
  // Use dummy data for testing
  const hotels = useSelector(() => dummyHotels);
  const [selectedPage, setSelectedPage] = useState(1);
  const [pageSize, setPageSize] = useState(3);
  const navigate = useNavigate()
  useEffect(() => {
    // dispatch(getHotels() as any); 
  }, [dispatch]);
  const handleAddHotelsClick = () => {
   navigate('/admin/dashboard/addHotel');
  };
  return (
    <Card className="h-full w-full overflow-hidden">
    <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <div>
            <Typography variant="h5" color="blue-gray" className='ml-3 mt-3'>
              Manage Hotels
            </Typography>
          
          </div>
          <div className="flex w-full shrink-0 gap-2 md:w-max">
          <div className="w-full md:w-72">
            <Input
              label="Search" className='mt-3'
              icon={<MagnifyingGlassIcon className="h-5 w-5 mt-5  ml-2" />}
              crossOrigin="anonymous"
            />
          </div>
            <Button  onClick={handleAddHotelsClick}  className="flex items-center gap-3 text-black mt-3 mr-3" variant="outlined"  size="sm">
              AddHotels
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardBody className="overflow-x-auto px-0">
      <table className="w-full table-auto text-left">
          <thead>
            <tr>
              <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  Photo
                </Typography>
              </th>
              <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  Name
                </Typography>
              </th>
              <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  Description
                </Typography>
              </th>
              <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  Longitude
                </Typography>
              </th>
              <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  Latitude
                </Typography>
              </th>
              <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  Created At
                </Typography>
              </th>
              <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                <Typography
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
          {hotels.map(
  ({ _id, uName, title, description, lng, lat, uPhoto, createdAt }, index) => {
    const isLast = index === hotels.length - 1;
    const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

    return (
      <tr key={_id}>
        <td className={classes}>
          <Avatar
            src={uPhoto}
            alt={title}
            size="md"
            className="border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1"
          />
        </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-bold"
                      >
                        {uName}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {description}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {lng}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {lat}
                      </Typography>
                    </td>
                    
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {moment(createdAt).format('YYYY-MM-DD HH:mm:ss')}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Tooltip content="Edit Hotel">
                        <IconButton variant="text">
                          <PencilIcon className="h-4 w-4" />
                        </IconButton>
                      </Tooltip>
                    </td>
                  </tr>
                );
              },
            )}
          </tbody>
        </table>
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
  <Button variant="outlined" size="sm">
    Previous
  </Button>
  <div className="flex items-center gap-2">
  {[1, 2, 3, 4, 5].map((pageNumber) => (
            <div
              key={pageNumber}
              className={`${
                pageNumber === selectedPage
                  ? 'bg-blue-gray-400 text-white'
                  : 'bg-white text-black'
              } rounded-full w-6 h-6 flex items-center justify-center cursor-pointer`}
              onClick={() => setSelectedPage(pageNumber)}
            >
              {pageNumber}
            </div>
          ))}
      </div>
  <Button variant="outlined" size="sm">
    Next
  </Button>
</CardFooter>

    </Card>
  );
};

export default HotelListingTable;




