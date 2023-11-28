import { Avatar, InputAdornment, TextField, TextFieldProps } from '@mui/material';
import React, { useState, ChangeEvent } from 'react';
import { useValue } from '../../../../context/ContextProvider';
// import pendingIcon from './icons/progress1.svg';
import { Check } from '@mui/icons-material';

interface InfoFieldProps {
  mainProps: TextFieldProps;
  optionalProps?: TextFieldProps;
  minLength: number;
}

let timer: NodeJS.Timeout;

const InfoField: React.FC<InfoFieldProps> = ({ mainProps, optionalProps = {}, minLength }) => {
  const { dispatch } = useValue();
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: 'UPDATE_DETAILS',
      payload: { [e.target.name]: e.target.value },
    });
    if (!editing) setEditing(true);
    clearTimeout(timer);
    timer = setTimeout(() => {
      setEditing(false);
      if (e.target.value.length < minLength) {
        if (!error) setError(true);
        if (success) setSuccess(false);
      } else {
        if (error) setError(false);
        if (!success) setSuccess(true);
      }
    }, 1000);
  };

  return (
    <TextField
      {...mainProps}
      {...optionalProps}
      error={error}
      helperText={error && `This field must be ${minLength} characters or more`}
      color={success ? 'success' : 'primary'}
      variant="outlined"
      onChange={handleChange}
      required
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            {editing ? (
              <Avatar src={'./icons/progress3.svg'} sx={{ height: 70 }} />
            ) : (
              success && <Check color="success" />
            )}
          </InputAdornment>
        ),
      }}
    />
  );
};

export default InfoField;
