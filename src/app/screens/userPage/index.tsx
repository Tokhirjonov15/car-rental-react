import React, { useEffect, useState } from 'react';
import {
  Container,
  Box,
  Typography,
  Stack,
  TextField,
  Button,
  Card,
  CardContent,
  Avatar,
  IconButton,
  Snackbar,
  Alert,
  CircularProgress,
} from '@mui/material';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import PhoneIcon from '@mui/icons-material/Phone';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser as setUserAction } from './slice';
import UserService from '../../services/UserService';
import { serverApi } from '../../../lib/config';
import { User } from '../../../lib/types/user';
import '../../../css/users.css';

export default function UserPage() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    userId: '',
    userPhone: '',
  });

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');

  // Load user data from localStorage on mount
  useEffect(() => {
    const userData = localStorage.getItem('userData');
    if (userData) {
      const parsedUser: User = JSON.parse(userData);
      setUser(parsedUser);
      setFormData({
        userId: parsedUser.userId || '',
        userPhone: parsedUser.userPhone || '',
      });
      if (parsedUser.userImage) {
        setImagePreview(`${serverApi}/${parsedUser.userImage}`);
      }
    } else {
      history.push('/login');
    }
  }, [history]);

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle image selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      // Validate file type
      if (!file.type.startsWith('image/')) {
        setErrorMessage('Please select an image file');
        setShowErrorAlert(true);
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrorMessage('Image size should be less than 5MB');
        setShowErrorAlert(true);
        return;
      }

      setSelectedImage(file);

      // Create preview FAQAT yangi rasm tanlanganda
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const handleSaveChanges = async () => {
    try {
      if (!user) {
        setErrorMessage('User data not found');
        setShowErrorAlert(true);
        return;
      }

      // Validation
      if (!formData.userId.trim()) {
        setErrorMessage('User ID cannot be empty');
        setShowErrorAlert(true);
        return;
      }

      if (!formData.userPhone.trim()) {
        setErrorMessage('Phone number cannot be empty');
        setShowErrorAlert(true);
        return;
      }

      setLoading(true);

      const userService = new UserService();
      const updateInput = {
        userId: formData.userId,
        userPhone: formData.userPhone,
        userAddress: user.userAddress || '', // Existing address saqlanadi
        userImage: selectedImage || undefined,
      };

      const updatedUser = await userService.updateUser(updateInput);
      
      // Update local state
      setUser(updatedUser);
      dispatch(setUserAction(updatedUser));
      setShowSuccessAlert(true);

      // Reset image selection va preview ni yangilangan user image ga o'rnatish
      setSelectedImage(null);
      if (updatedUser.userImage) {
        setImagePreview(`${serverApi}/${updatedUser.userImage}`);
      }

    } catch (err: any) {
      console.error('Update failed:', err);
      const errorMsg = err.response?.data?.message || 'Failed to update profile';
      setErrorMessage(errorMsg);
      setShowErrorAlert(true);
    } finally {
      setLoading(false);
    }
  };

  // Handle cancel
  const handleCancel = () => {
    if (user) {
      setFormData({
        userId: user.userId || '',
        userPhone: user.userPhone || '',
      });
      
      // Reset to original image, not preview
      if (user.userImage) {
        setImagePreview(`${serverApi}/${user.userImage}`);
      } else {
        setImagePreview('');
      }
      
      setSelectedImage(null);
    }
  };

  if (!user) {
    return (
      <Container maxWidth="md" className="profile-page">
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" className="profile-page">
      {/* Success Alert */}
      <Snackbar
        open={showSuccessAlert}
        autoHideDuration={3000}
        onClose={() => setShowSuccessAlert(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setShowSuccessAlert(false)}
          severity="success"
          sx={{ width: '100%' }}
        >
          Profile updated successfully!
        </Alert>
      </Snackbar>

      {/* Error Alert */}
      <Snackbar
        open={showErrorAlert}
        autoHideDuration={4000}
        onClose={() => setShowErrorAlert(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setShowErrorAlert(false)}
          severity="error"
          sx={{ width: '100%' }}
        >
          {errorMessage}
        </Alert>
      </Snackbar>

      <Stack spacing={4}>
        <Box className="page-header">
          <Typography variant="h3" className="page-title">
            My Profile
          </Typography>
          <Typography variant="body1" className="page-subtitle">
            Manage your personal information
          </Typography>
        </Box>

        {/* Profile Photo Section */}
        <Card className="profile-card">
          <CardContent>
            <Stack alignItems="center" spacing={2}>
              <Box className="avatar-wrapper" sx={{ position: 'relative' }}>
                <Avatar
                  src={imagePreview || undefined}
                  alt={formData.userId}
                  className="profile-avatar"
                  sx={{ width: 120, height: 120 }}
                />
                <input
                  accept="image/*"
                  style={{ display: 'none' }}
                  id="profile-image-upload"
                  type="file"
                  onChange={handleImageChange}
                />
                <label htmlFor="profile-image-upload">
                  <IconButton
                    className="change-photo-btn"
                    component="span"
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      right: 0,
                      backgroundColor: 'primary.main',
                      color: 'white',
                      '&:hover': { backgroundColor: 'primary.dark' },
                    }}
                  >
                    <CameraAltIcon />
                  </IconButton>
                </label>
              </Box>
              <Typography variant="h5" className="user-name">
                {formData.userId}
              </Typography>
              {selectedImage && (
                <Typography variant="caption" color="primary">
                  New image selected
                </Typography>
              )}
            </Stack>
          </CardContent>
        </Card>

        {/* Personal Information */}
        <Card className="info-card">
          <CardContent>
            <Typography variant="h6" className="section-title">
              Personal Information
            </Typography>
            <Stack spacing={3} className="form-fields">
              <TextField
                label="User ID"
                name="userId"
                value={formData.userId}
                onChange={handleInputChange}
                fullWidth
                className="input-field"
                required
                helperText="Enter your unique user ID"
              />

              <TextField
                label="Phone Number"
                name="userPhone"
                value={formData.userPhone}
                onChange={handleInputChange}
                fullWidth
                className="input-field"
                required
                placeholder="+998 (90) 123-45-67"
                InputProps={{
                  startAdornment: <PhoneIcon className="input-icon" />,
                }}
                helperText="Enter your phone number"
              />
            </Stack>
          </CardContent>
        </Card>

        <Stack
          direction="row"
          spacing={2}
          justifyContent="flex-end"
          className="action-buttons"
        >
          <Button
            variant="outlined"
            className="cancel-btn"
            size="large"
            onClick={handleCancel}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            className="save-btn"
            size="large"
            onClick={handleSaveChanges}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Save Changes'}
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
}

