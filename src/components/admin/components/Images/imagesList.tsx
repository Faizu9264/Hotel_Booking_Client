import { Cancel } from "@mui/icons-material";
import {
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
} from "@mui/material";
import React from "react";
import { useValue } from "../../../../context/ContextProvider";
import deleteFile from "../../../../firebase/deleteFile";

const ImagesList: React.FC = () => {
  const { state, dispatch } = useValue();
  const { images } = state;

  const handleDelete = async (image: string) => {
    dispatch({ type: "DELETE_IMAGE", payload: image });
    const imageName = image?.split("hotel/")[1]?.split("?")[0];
    try {
      await deleteFile(`hotel/${imageName}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ImageList
      rowHeight={250}
      sx={{
        "&.MuiImageList-root": {
          gridTemplateColumns:
            "repeat(auto-fill, minmax(250px, 1fr))!important",
        },
      }}
    >
      {images.map((image, index) => (
        <ImageListItem key={index} cols={1} rows={1}>
          <img
            src={image}
            alt="hotels"
            loading="lazy"
            style={{ height: "100%" }}
          />
          <ImageListItemBar
            position="top"
            sx={{
              background:
                "linear-gradient(to bottom, rgba(0,0,0,0.7)0%, rgba(0,0,0,0.3)70%, rgba(0,0,0,0)100%)",
            }}
            actionIcon={
              <IconButton
                sx={{ color: "white" }}
                onClick={() => handleDelete(image)}
              >
                <Cancel />
              </IconButton>
            }
          ></ImageListItemBar>
        </ImageListItem>
      ))}
    </ImageList>
  );
};

export default ImagesList;
