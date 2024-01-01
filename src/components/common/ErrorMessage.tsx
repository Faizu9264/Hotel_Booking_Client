// ErrorMessage.tsx
import React from 'react';
import { Alert, AlertTitle } from '@mui/material';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <Alert severity="error" sx={{minHeight:'300PX'}}>
      <AlertTitle>Error</AlertTitle>
      {message}
    </Alert>
  );
};

export default ErrorMessage;
