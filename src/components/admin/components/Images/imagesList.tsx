import React from 'react';
import { Cancel } from '@mui/icons-material';
import {
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  styled,
} from '@mui/material';
import deleteFile from '../../../../firebase/deleteFile';

import {UserData} from '../../../../types/authTypes'
export interface ImagesListProps {
  images: string[];
}

const StyledImageList = styled(ImageList)(({ theme }) => ({
  '&.MuiImageList-root': {
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr)) !important',
  },
}));

const ImagesList: React.FC<ImagesListProps> = ({ images }) => {
  // Provide types for the state
  const [currentUser, setCurrentUser] = React.useState<UserData | null>(null);

  const handleDelete = async (image: string, index: number) => {
    // Handle image deletion logic
    try {
      await deleteFile(`hotels/${currentUser?.id}/${getImageName(image)}`);
    } catch (error) {
      console.log(error);
    }
  };

  const getImageName = (image: string): string => {
    // Extract and return the image name logic
    return image?.split(`${currentUser?.id}%2F`)[1]?.split('?')[0] || '';
  };

  return (
    <StyledImageList rowHeight={250}>
      {images.map((image, index) => (
        <ImageListItem key={index} cols={1} rows={1}>
          <img
            src={image}
            alt="rooms"
            loading="lazy"
            style={{ height: '100%' }}
          />
          <ImageListItemBar
            position="top"
            sx={{
              background:
                'linear-gradient(to bottom, rgba(0,0,0,0.7)0%, rgba(0,0,0,0.3)70%, rgba(0,0,0,0)100%)',
            }}
            actionIcon={
              <IconButton
                sx={{ color: 'white' }}
                onClick={() => handleDelete(image, index)}
              >
                <Cancel />
              </IconButton>
            }
          ></ImageListItemBar>
        </ImageListItem>
      ))}
    </StyledImageList>
  );
};

export default ImagesList;
