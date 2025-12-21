import React from 'react';
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
} from '@mui/material';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import BadgeIcon from '@mui/icons-material/Badge';
import '../../../css/users.css';

export  default function UserPage() {
  const userData = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+998 (90) 123-45-67',
    dateOfBirth: '1990-05-15',
    address: 'Tashkent, Yunusabad District',
    profilePhoto: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=300',
    driversLicense: 'DL123456789',
    licenseExpiry: '2027-12-31',
  };

  return (
    <Container maxWidth="md" className="profile-page">
      <Stack spacing={4}>
        {/* Page Title */}
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
              <Box className="avatar-wrapper">
                <Avatar
                  src={userData.profilePhoto}
                  alt={userData.name}
                  className="profile-avatar"
                />
                <IconButton className="change-photo-btn">
                  <CameraAltIcon />
                </IconButton>
              </Box>
              <Typography variant="h5" className="user-name">
                {userData.name}
              </Typography>
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
                label="Full Name"
                defaultValue={userData.name}
                fullWidth
                className="input-field"
              />

              <TextField
                label="Email Address"
                defaultValue={userData.email}
                fullWidth
                className="input-field"
                InputProps={{
                  startAdornment: <EmailIcon className="input-icon" />,
                }}
              />

              <TextField
                label="Phone Number"
                defaultValue={userData.phone}
                fullWidth
                className="input-field"
                InputProps={{
                  startAdornment: <PhoneIcon className="input-icon" />,
                }}
              />

              <TextField
                label="Date of Birth"
                type="date"
                defaultValue={userData.dateOfBirth}
                fullWidth
                className="input-field"
                InputLabelProps={{ shrink: true }}
              />

              <TextField
                label="Address"
                defaultValue={userData.address}
                fullWidth
                multiline
                rows={2}
                className="input-field"
                InputProps={{
                  startAdornment: <LocationOnIcon className="input-icon" />,
                }}
              />
            </Stack>
          </CardContent>
        </Card>

        {/* Driver's License */}
        <Card className="info-card">
          <CardContent>
            <Typography variant="h6" className="section-title">
              Driver's License
            </Typography>
            <Stack spacing={3} className="form-fields">
              <TextField
                label="License Number"
                defaultValue={userData.driversLicense}
                fullWidth
                className="input-field"
                InputProps={{
                  startAdornment: <BadgeIcon className="input-icon" />,
                }}
              />

              <TextField
                label="Expiry Date"
                type="date"
                defaultValue={userData.licenseExpiry}
                fullWidth
                className="input-field"
                InputLabelProps={{ shrink: true }}
              />
            </Stack>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <Stack direction="row" spacing={2} justifyContent="flex-end" className="action-buttons">
          <Button variant="outlined" className="cancel-btn" size="large">
            Cancel
          </Button>
          <Button variant="contained" className="save-btn" size="large">
            Save Changes
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
}