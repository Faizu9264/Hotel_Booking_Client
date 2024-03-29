//ProgressItem.tsx
import { Box, ImageListItem } from "@mui/material";
import React, { useEffect, useState } from "react";
import CircularProgressWithLabel from "./CircularProgressWithLabel";
import { v4 as uuidv4 } from "uuid";
import uploadFileProgress from "../../../../../firebase/uploadFileProgress";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "src/redux/store";
import { updateRoomImages } from "../../../../../redux/slices/singleRoomSlice";
import { CheckCircleOutline } from "@mui/icons-material";

interface ProgressItemProps {
  file: File;
}

const ProgressItem: React.FC<ProgressItemProps> = ({ file }) => {
  const [progress, setProgress] = useState<number>(0);
  const [imageURL, setImageURL] = useState<string | null>(null);
  const dispatch = useDispatch();
  const roomImages = useSelector(
    (state: RootState) => state.room.roomDetails.selectedRoom.images
  );

  useEffect(() => {
    const uploadImage = async () => {
      const imageName = uuidv4() + "." + file.name.split(".").pop();
      try {
        const url = await uploadFileProgress(
          file,
          `room/${imageName}`,
          imageName,
          setProgress
        );
        dispatch(updateRoomImages([...roomImages, url]));
        setImageURL(null);
      } catch (error: any) {
        console.error(error);
      }
    };
    setImageURL(URL.createObjectURL(file));
    uploadImage();
  }, [file, dispatch]);

  return (
    imageURL && (
      <ImageListItem cols={1} rows={1}>
        <img src={imageURL} alt="gallery" loading="lazy" />
        <Box sx={backDrop}>
          {progress < 100 ? (
            <CircularProgressWithLabel value={progress} />
          ) : (
            <CheckCircleOutline
              sx={{ width: 60, height: 60, color: "lightgreen" }}
            />
          )}
        </Box>
      </ImageListItem>
    )
  );
};

const backDrop = {
  position: "absolute",
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "rgba(0,0,0, .5)",
};

export default ProgressItem;
