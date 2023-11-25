// ProgressItem.tsx
import { CheckCircleOutline } from '@mui/icons-material';
import { Box, ImageListItem } from '@mui/material';
import React, { useEffect, useState } from 'react';
import CircularProgressWithLabel from './CircularProgressWithLabel';
import { v4 as uuidv4 } from 'uuid';
import uploadFileProgress from '../../../../../firebase/uploadFileProgress';
import { useDispatch, useSelector } from 'react-redux'; 
import { RootState } from '../../../../../redux/store'; 
import { updateImages, updateAlert } from '../../../../../redux/actions/hotelActions'; 

interface ProgressItemProps {
  file: File;
}

const ProgressItem: React.FC<ProgressItemProps> = ({ file }) => {
  const dispatch = useDispatch();
//   const { currentUser } = useSelector((state: RootState) => state.hotel); 
  const [progress, setProgress] = useState<number>(0);
  const [imageURL, setImageURL] = useState<string | null>(null);

  useEffect(() => {
    const uploadImage = async () => {
      const imageName = uuidv4() + '.' + file.name.split('.').pop();
      try {
        const url = await uploadFileProgress(file, `rooms`, imageName, setProgress);
        dispatch(updateImages(['image1.jpg', 'image2.jpg']));
        setImageURL(null);
      } catch (error:any) {
        dispatch(updateAlert({ open: true, severity: 'error', message: error.message }));
        console.error(error);
      }
    };

    setImageURL(URL.createObjectURL(file));
    uploadImage();
  }, [file,dispatch]);

  return (
    imageURL && (
      <ImageListItem cols={1} rows={1}>
        <img src={imageURL} alt="gallery" loading="lazy" />
        <Box>{progress < 100 ? <CircularProgressWithLabel value={progress} /> : <CheckCircleOutline />}</Box>
      </ImageListItem>
    )
  );
};

export default ProgressItem;
