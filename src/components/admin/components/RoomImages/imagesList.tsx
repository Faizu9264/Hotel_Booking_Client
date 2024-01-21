import { useDispatch, useSelector } from "react-redux";
import { RootState } from "src/redux/store";
import { Cancel } from "@mui/icons-material";
import {
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
} from "@mui/material";
import React from "react";
import { removeImageFromRoom } from "../../../../redux/slices/singleRoomSlice";
import deleteFile from "../../../../firebase/deleteFile";

const ImagesList: React.FC = () => {
  const dispatch = useDispatch();
  const { images } = useSelector(
    (state: RootState) => state.room.roomDetails.selectedRoom
  );

  const handleDelete = async (image: string) => {
    dispatch(removeImageFromRoom(image));
    const imageName = image?.split("room/")[1]?.split("?")[0];
    try {
      await deleteFile(`room/${imageName}`);
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
