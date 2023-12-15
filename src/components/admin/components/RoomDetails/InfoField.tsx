// InfoField.tsx

import React, { useState, ChangeEvent } from 'react';
import { Avatar, InputAdornment, TextField, TextFieldProps } from '@mui/material';
import { Check } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { updateSingleRoomDetails } from '../../../../redux/slices/singleRoomSlice';

interface InfoFieldProps extends Omit<TextFieldProps, 'onChange'> {
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  minLength: number;
  optionalProps?: TextFieldProps;
  fieldKey: string; 
  min?: number; 
  max?: number; 
  startAdornment?: React.ReactElement; 
  endAdornment?: React.ReactElement;
}

let timer: NodeJS.Timeout;


const InfoField: React.FC<InfoFieldProps> = ({
  onChange,
  minLength,
  optionalProps,
  fieldKey,
  min,
  max,
  startAdornment,
  endAdornment,
  ...props
}) => {
  const dispatch = useDispatch();
  const [editing, setEditing] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e);
    }

    dispatch(updateSingleRoomDetails({ [fieldKey]: e.target.value }));
    if (!editing) setEditing(true);
    clearTimeout(timer);
    timer = setTimeout(() => {
      setEditing(false);
    }, 1000);
  };

  return (
    <TextField
      {...props}
      {...optionalProps}
      variant="outlined"
      onChange={handleChange}
      required
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">{startAdornment || null}</InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            {endAdornment}
            {editing ? <Avatar src="" sx={{ height: 40 }} /> : null}
          </InputAdornment>
        ),
      }}
    />
  );
};


export default InfoField;
