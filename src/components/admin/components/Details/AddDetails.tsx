// import {
//     FormControl,
//     FormControlLabel,
//     InputAdornment,
//     Radio,
//     RadioGroup,
//     Stack,
//     TextField,
//   } from '@mui/material';
//   import { useState, ChangeEvent } from 'react';
//   import { useValue } from '../../../../context/ContextProvider';
//   import InfoField from './InfoField';
  
//   const AddDetails = () => {
//     const {
//       state: {
//         details: { title, description, price },
//       },
//       dispatch,
//     } = useValue();
//     const [costType, setCostType] = useState<number>(price ? 1 : 0);
  
//     const handleCostTypeChange = (e: ChangeEvent<HTMLInputElement>) => {
//       const costType = Number(e.target.value);
//       setCostType(costType);
//       if (costType === 0) {
//         dispatch({ type: 'UPDATE_DETAILS', payload: { price: 0 } });
//       } else {
//         dispatch({ type: 'UPDATE_DETAILS', payload: { price: 15 } });
//       }
//     };
  
//     const handlePriceChange = (e: ChangeEvent<HTMLInputElement>) => {
//       dispatch({ type: 'UPDATE_DETAILS', payload: { price: e.target.value } });
//     };
  
//     return (
//       <Stack
//         sx={{
//           alignItems: 'center',
//           '& .MuiTextField-root': { width: '100%', maxWidth: 500, m: 1 },
//         }}
//       >
//         <FormControl>
//           <RadioGroup
//             name="costType"
//             value={costType}
//             row
//             onChange={handleCostTypeChange}
//           >
//             <FormControlLabel value={0} control={<Radio />} label="Free Stay" />
//             <FormControlLabel value={1} control={<Radio />} label="Nominal Fee" />
//             {Boolean(costType) && (
//               <TextField
//                 sx={{ width: '7ch !important' }}
//                 variant="standard"
//                 InputProps={{
//                   startAdornment: (
//                     <InputAdornment position="start">$</InputAdornment>
//                   ),
//                 }}
//                 inputProps={{ type: 'number', min: 1, max: 50 }}
//                 value={price}
//                 onChange={handlePriceChange}
//                 name="price"
//               />
//             )}
//           </RadioGroup>
//         </FormControl>
//         <InfoField
//           mainProps={{ name: 'title', label: 'Title', value: title }}
//           minLength={5}
//         />
//         <InfoField
//           mainProps={{
//             name: 'description',
//             label: 'Description',
//             value: description,
//           }}
//           minLength={10}
//           optionalProps={{ multiline: true, rows: 4 }}
//         />
//       </Stack>
//     );
//   };
  
//   export default AddDetails;
  

import React, { useState, ChangeEvent } from 'react';
import {
  Stack,
  TextField,
  FormControlLabel,
  RadioGroup,
  Radio,
  InputAdornment,
  FormControl,
  Box,
} from '@mui/material';
import { useValue } from '../../../../context/ContextProvider';
import InfoField from './InfoField';

const AddDetails = () => {
  const {
    state: {
      details: { hotelName, location, contactNo, emailAddress, minRent, description },
    },
    dispatch,
  } = useValue();

  const handleMinRentChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'UPDATE_DETAILS', payload: { minRent: e.target.value } });
  };

  const handleHotelNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'UPDATE_DETAILS', payload: { hotelName: e.target.value } });
  };

  const handleContactNoChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'UPDATE_DETAILS', payload: { contactNo: e.target.value } });
  };

  const handleEmailAddressChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'UPDATE_DETAILS', payload: { emailAddress: e.target.value } });
  };

  return (
    <Stack
      sx={{
        alignItems: 'center',
        '& .MuiTextField-root': {
          width: '100%',
          maxWidth: '500px',
          m: '0.5rem',
          '& input': {
            height: '15px',
          },
        },
        '& .MuiFormControlLabel-root': {
          marginLeft: '-11px', 
        },
      }}
    >
      <FormControl>
        <RadioGroup name="costType" value={1} onChange={() => {}}>
          <Box display="flex" alignItems="flex-start">
            <FormControlLabel value={1} control={<Radio />} label="Min Rent" />
            <TextField
            sx={{ width: '10ch !important' }}
              variant="standard"
              InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>,
              }}
              inputProps={{ type: 'number', min: 1, max: 50 }}
              value={minRent}
              onChange={handleMinRentChange}
              name="minRent"
            />
          </Box>
        </RadioGroup>
      </FormControl>
      <Stack direction="row">
        <InfoField
          {...{ name: 'hotelName', label: 'Hotel Name', value: hotelName }}
          minLength={5}
          onChange={handleHotelNameChange}
        />
        <InfoField {...{ name: 'location', label: 'Location', value: location }} minLength={5} />
      </Stack>
      <Stack direction="row">
        <InfoField
          {...{ name: 'contactNo', label: 'Contact Number', value: contactNo }}
          minLength={10}
          onChange={handleContactNoChange}
        />
        <InfoField
          {...{ name: 'emailAddress', label: 'Email Address', value: emailAddress }}
          minLength={5}
          onChange={handleEmailAddressChange}
        />
      </Stack>
      <InfoField
        {...{ name: 'description', label: 'Description', value: description }}
        minLength={10}
        optionalProps={{ multiline: true, rows: 4 }}
      />
    </Stack>
  );
};

export default AddDetails;


