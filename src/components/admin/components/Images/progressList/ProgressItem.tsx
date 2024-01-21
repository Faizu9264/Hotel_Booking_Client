import { Box, ImageListItem } from "@mui/material";
import React, { useEffect, useState } from "react";
import CircularProgressWithLabel from "./CircularProgressWithLabel";
import { v4 as uuidv4 } from "uuid";
import uploadFileProgress from "../../../../../firebase/uploadFileProgress";
import { useValue } from "../../../../../context/ContextProvider";

interface ProgressItemProps {
  file: File;
}
const ProgressItem: React.FC<ProgressItemProps> = ({ file }) => {
  const [progress, setProgress] = useState<number>(0);
  const [imageURL, setImageURL] = useState<string | null>(null);
  const { dispatch } = useValue();

  useEffect(() => {
    const uploadImage = async () => {
      const imageName = uuidv4() + "." + file.name.split(".").pop();
      try {
        const url = await uploadFileProgress(
          file,
          `hotel/${imageName}`,
          imageName,
          setProgress
        );
        dispatch({ type: "UPDATE_IMAGES", payload: url });
        setImageURL(null);
      } catch (error: any) {
        dispatch({
          type: "UPDATE_ALERT",
          payload: { open: true, severity: "error", message: error.message },
        });
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
            <div>{/* Placeholder for success icon */}</div>
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
