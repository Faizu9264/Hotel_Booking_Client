import React, { useState,useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import PhoneIcon from '@mui/icons-material/Phone';
import LockIcon from '@mui/icons-material/Lock';
import { UserData } from 'src/types/authTypes';
import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';
import api from '../../services/userApi';
import { setUserData } from '../../redux/actions/authActions';
import { ToastContainer,toast } from 'react-toastify';
import uploadFile from '../../firebase/uploadFile';

interface UserProfileModalProps {
  user: UserData;
  isOpen: boolean;
  onClose: () => void;
}


const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePasswordStrength = (password: string): boolean => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  return passwordRegex.test(password);
};


const UserProfileModal: React.FC<UserProfileModalProps> = ({ isOpen, onClose }) => {
  const dispatch = useDispatch(); 
  const userData = useSelector((state: RootState) => state.auth.user);
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [editedData, setEditedData] = useState({
    userId: userData?._id ,
    username: userData?.username || '',
    email: userData?.email || '',
    phoneNumber: userData?.phoneNumber || '', 
    newPassword: '',
    currentPassword: '',
    confirmPassword: '',
    profileImage: userData?.profileImage || '',
  });
  // useEffect(() => {
  //   const updateUserProfile = async () => {
  //     console.log('editedData.profileImage1', editedData);
      
  //     try {
  //       if (!editedData.userId ) {
  //         toast.error('User data or userId is missing1.');
  //         return;
  //       }
        
  
  //       const updatedUserData = await api.updateUserProfile(userData._id, { ...editedData });
  
  //       dispatch(setUserData(updatedUserData));
  //       // onClose();
  
  //       // console.log('editedData ', editedData);
  //       // console.log('userData', userData);
  //     } catch (error: any) {
  //       toast.error('Error updating profile details:', error.message);
  //     }
  //   };
  
  //   if (editedData.userId) {
  //     updateUserProfile();
  //   }
  // }, [editedData.profileImage,editedData]);
  
  const handleEditClick = () => {
    setIsEditing(true);
    setIsChangingPassword(false);
  };

  const handleToggleCurrentPasswordVisibility = () => {
    setShowCurrentPassword((prev) => !prev);
  };

  const handleToggleNewPasswordVisibility = () => {
    setShowNewPassword((prev) => !prev);
  };
  const handleChangingPasswordFieldVisibility = () => {
    setShowCurrentPassword(false);
    setShowNewPassword(!showNewPassword);
    setShowConfirmPassword(false);
  };
  const handleToggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };
  const handleChangePasswordClick = () => {
    setIsEditing(false);
    setIsChangingPassword(true);
  };
 const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };
  const handleCancelEdit = () => {
    setIsEditing(false);
    setIsChangingPassword(false);
    setImageFile(null);
    setEditedData({
      userId:   userData?._id ,
      username: userData?.username || '',
      email: userData?.email || '',
      phoneNumber: userData?.phoneNumber || '',
      newPassword: '',
      currentPassword: '',
      confirmPassword: '',
      profileImage: userData?.profileImage || '',
    });
  };


  const handleSaveChanges = async () => {
    try {
      console.log('editedData', editedData);
      console.log('userData', userData);
      editedData.userId = userData?._id ?? userData.userId;
      console.log('editedData.userId', editedData.userId);
  
      if (!editedData.userId) {
        toast.error('User data or userId is missing.');
        return;
      }
  
      if (isEditing) {
        // Validate email
        if (!validateEmail(editedData.email)) {
          toast.error('Invalid email format.');
          return;
        }
        let imageUrl = editedData.profileImage;
  
        if (imageFile) {
          const imagePath = `profileImages/${editedData.userId}/${imageFile.name}`;
          imageUrl = await uploadFile(imageFile, imagePath);
          console.log('imageUrl', imageUrl);
          setEditedData({...editedData,profileImage:imageUrl})
        
          if (imageUrl) {
            setEditedData((prevData) => ({
              ...prevData,
              profileImage: imageUrl,
            }));
            console.log('editedData.profileImage', imageUrl);
          }
        }
        
  
        const updatedUserData = await api.updateUserProfile(editedData.userId, { ...editedData });
  
        dispatch(setUserData(updatedUserData));
        // onClose();
  
        console.log('editedData2 ', editedData);
        console.log('userData2', userData);
      }

      if (isChangingPassword) {
        if (!editedData.currentPassword) {
          toast.error('Please enter the current password.');
          return;
        }
        if (editedData.newPassword !== editedData.confirmPassword) {
          toast.error('New password and confirm password do not match.');
          return;
        }

        if (editedData.currentPassword === editedData.newPassword) {
          toast.error('New password must be different from the current password.');
          return;
        }

        if (!validatePasswordStrength(editedData.newPassword)) {
          toast.error(
            'Password must be at least 8 characters and contain at least one uppercase letter, one lowercase letter, and one digit'
          );
          return;
        }
  
        const response = await api.changePassword(editedData.userId, {
          currentPassword: editedData.currentPassword,
          newPassword: editedData.newPassword,
        });
        console.log('response:', response);
      }
  

      setIsEditing(false);
      setIsChangingPassword(false);
      setImageFile(null);
    } catch (error: any) {
      toast.error('Error updating profile details or changing password:', error.message);
    }
  };


  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="xs" fullWidth>
      <ToastContainer/>
      <DialogTitle>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Button
            onClick={handleEditClick}
            startIcon={<EditIcon />}
            variant="outlined"
            color="primary"
            sx={{ display: isEditing || isChangingPassword ? 'none' : 'flex' }}
          >
            Edit Profile
          </Button>
          <IconButton color="inherit" onClick={onClose} aria-label="close">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Avatar
  alt={editedData.username}
  src={imageFile ? URL.createObjectURL(imageFile) : editedData.profileImage || '/logo/profile.png'}
  sx={{ width: 100, height: 100, marginBottom: 2 }}
/>


          {!isEditing&&!isChangingPassword&&(
          <div>
          <Typography variant="h6" gutterBottom>
            Username: {userData?.username}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Email: {userData?.email}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Phone Number: {userData?.phoneNumber || 'Not provided'}
          </Typography>
        </div>
          )}
          {isEditing && (
            <>
              <input
        accept="image/*"
        style={{ display: 'none' }}
        id="profile-image-input"
        type="file"
        onChange={handleImageChange} 
      />
      <label htmlFor="profile-image-input">
        <IconButton color="primary" component="span">
          <PhotoCameraIcon />
        </IconButton>
      </label>
              <TextField
                label="Username"
                variant="outlined"
                value={editedData.username}
                onChange={(e) => setEditedData({ ...editedData, username: e.target.value })}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Email"
                variant="outlined"
                value={editedData.email}
                onChange={(e) => setEditedData({ ...editedData, email: e.target.value })}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Phone Number"
                variant="outlined"
                value={editedData.phoneNumber}
                onChange={(e) => setEditedData({ ...editedData, phoneNumber: e.target.value })}
                fullWidth
                margin="normal"
              />
             
            </>
          )}
          {isChangingPassword && (
            <>
             <TextField
            label="Current Password"
            type={showCurrentPassword ? 'text' : 'password'}
            variant="outlined"
            value={editedData.currentPassword}
            onChange={(e) => setEditedData({ ...editedData, currentPassword: e.target.value })}
            fullWidth
            margin="normal"
            InputProps={{
              endAdornment: (
                <IconButton onClick={handleToggleCurrentPasswordVisibility} edge="end">
                  {showCurrentPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              ),
            }}
          />
          <TextField
            label="New Password"
            type={showNewPassword ? 'text' : 'password'}
            variant="outlined"
            value={editedData.newPassword}
            onChange={(e) => setEditedData({ ...editedData, newPassword: e.target.value })}
            fullWidth
            margin="normal"
            InputProps={{
              endAdornment: (
                <IconButton onClick={handleToggleNewPasswordVisibility} edge="end">
                  {showNewPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              ),
            }}
          />
          <TextField
            label="Confirm Password"
            type={showConfirmPassword ? 'text' : 'password'}
            variant="outlined"
            value={editedData.confirmPassword}
            onChange={(e) => setEditedData({ ...editedData, confirmPassword: e.target.value })}
            fullWidth
            margin="normal"
            InputProps={{
              endAdornment: (
                <IconButton onClick={handleToggleConfirmPasswordVisibility} edge="end">
                  {showConfirmPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              ),
            }}
          />
        </>
      )}
        </Box>
        {(isEditing || isChangingPassword) && (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'flex-end',
      marginTop: 2,
      gap: 2, 
    }}
  >
    {!isChangingPassword && (
      <Button
        onClick={handleChangePasswordClick}
        startIcon={<LockIcon />}
        variant="outlined"
        color="primary"
      >
        Change Password
      </Button>
    )}
    <Button onClick={handleCancelEdit} variant="outlined" sx={{color:'red'}}>
      Cancel
    </Button>
    <Button onClick={handleSaveChanges} variant="contained" >
      Save
    </Button>
  </Box>
)}

      </DialogContent>
    </Dialog>
  );
};

export default UserProfileModal;
