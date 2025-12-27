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
  Divider,
  MenuItem,
  Chip,
} from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import PaymentIcon from '@mui/icons-material/Payment';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import "../../../css/vehicles.css";

export default function BookingPage() {
  const carData = {
    id: 1,
    name: 'BMW 3 Series',
    category: 'Luxury Sedan',
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400',
    pricePerDay: 85,
  };

  const bookingData = {
    pickupDate: '2024-02-15',
    pickupTime: '10:00',
    returnDate: '2024-02-18',
    returnTime: '10:00',
    totalDays: 3,
  };

  const paymentMethods = [
    { value: 'card', label: 'Credit/Debit Card' },
    { value: 'cash', label: 'Cash on Pickup' },
    { value: 'bank', label: 'Bank Transfer' },
  ];

  return (
    <Container maxWidth="lg" className="booking-page">
      <Stack spacing={4}>
        <Box className="page-header">
          <Typography variant="h3" className="page-title">
            Complete Your Booking
          </Typography>
          <Typography variant="body1" className="page-subtitle">
            Just a few more details and you're all set!
          </Typography>
        </Box>
        <Box className="booking-content">
          <Box className="booking-form">
            <Stack spacing={4}>
              <Card className="form-section">
                <CardContent>
                  <Typography variant="h6" className="section-title">
                    <CalendarMonthIcon className="section-icon" />
                    Rental Dates & Time
                  </Typography>

                  <Stack spacing={3} className="form-fields">
                    <Box className="date-time-group">
                      <Typography variant="subtitle2" className="field-label">
                        Pickup
                      </Typography>
                      <Stack direction="row" spacing={2}>
                        <TextField
                          type="date"
                          defaultValue={bookingData.pickupDate}
                          fullWidth
                          className="date-input"
                          InputProps={{
                            startAdornment: <CalendarMonthIcon className="input-icon" />,
                          }}
                        />
                        <TextField
                          type="time"
                          defaultValue={bookingData.pickupTime}
                          fullWidth
                          className="time-input"
                          InputProps={{
                            startAdornment: <AccessTimeIcon className="input-icon" />,
                          }}
                        />
                      </Stack>
                    </Box>

                    <Box className="date-time-group">
                      <Typography variant="subtitle2" className="field-label">
                        Return
                      </Typography>
                      <Stack direction="row" spacing={2}>
                        <TextField
                          type="date"
                          defaultValue={bookingData.returnDate}
                          fullWidth
                          className="date-input"
                          InputProps={{
                            startAdornment: <CalendarMonthIcon className="input-icon" />,
                          }}
                        />
                        <TextField
                          type="time"
                          defaultValue={bookingData.returnTime}
                          fullWidth
                          className="time-input"
                          InputProps={{
                            startAdornment: <AccessTimeIcon className="input-icon" />,
                          }}
                        />
                      </Stack>
                    </Box>

                    <Box className="duration-display">
                      <Chip
                        label={`Total Duration: ${bookingData.totalDays} Days`}
                        color="primary"
                        className="duration-chip"
                      />
                    </Box>
                  </Stack>
                </CardContent>
              </Card>

              <Card className="form-section">
                <CardContent>
                  <Typography variant="h6" className="section-title">
                    <PersonIcon className="section-icon" />
                    Personal Information
                  </Typography>

                  <Stack spacing={2.5} className="form-fields">
                    <TextField
                      label="Full Name"
                      placeholder="Enter your full name"
                      fullWidth
                      required
                      className="text-input"
                    />

                    <TextField
                      label="Email Address"
                      type="email"
                      placeholder="your.email@example.com"
                      fullWidth
                      className="text-input"
                      InputProps={{
                        startAdornment: <EmailIcon className="input-icon" />,
                      }}
                    />

                    <TextField
                      label="Phone Number"
                      type="tel"
                      placeholder="+998 (90) 123-45-67"
                      fullWidth
                      required
                      className="text-input"
                      InputProps={{
                        startAdornment: <PhoneIcon className="input-icon" />,
                      }}
                    />

                    <TextField
                      label="Driver's License Number"
                      placeholder="Enter your license number"
                      fullWidth
                      required
                      className="text-input"
                    />
                  </Stack>
                </CardContent>
              </Card>

              <Card className="form-section">
                <CardContent>
                  <Typography variant="h6" className="section-title">
                    <PaymentIcon className="section-icon" />
                    Payment Method
                  </Typography>

                  <Stack spacing={2.5} className="form-fields">
                    <TextField
                      select
                      label="Select Payment Method"
                      defaultValue="card"
                      fullWidth
                      className="select-input"
                    >
                      {paymentMethods.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>

                    <Box className="payment-note">
                      <Typography variant="caption" className="note-text">
                        💳 Secure payment processing. Your information is encrypted and safe.
                      </Typography>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </Stack>
          </Box>

          <Box className="booking-summary">
            <Card className="summary-card">
              <CardContent>
                <Typography variant="h6" className="summary-title">
                  Booking Summary
                </Typography>

                <Box className="car-info">
                  <img
                    src={carData.image}
                    alt={carData.name}
                    className="car-image"
                  />
                  <Box>
                    <Typography variant="h6" className="car-name">
                      {carData.name}
                    </Typography>
                    <Typography variant="body2" className="car-category">
                      {carData.category}
                    </Typography>
                  </Box>
                </Box>

                <Divider className="summary-divider" />

                <Box className="rental-details">
                  <Box className="detail-row">
                    <Typography variant="body2" className="detail-label">
                      📅 Pickup
                    </Typography>
                    <Typography variant="body2" className="detail-value">
                      Feb 15, 2024 - 10:00 AM
                    </Typography>
                  </Box>

                  <Box className="detail-row">
                    <Typography variant="body2" className="detail-label">
                      📅 Return
                    </Typography>
                    <Typography variant="body2" className="detail-value">
                      Feb 18, 2024 - 10:00 AM
                    </Typography>
                  </Box>

                  <Box className="detail-row">
                    <Typography variant="body2" className="detail-label">
                      📊 Duration
                    </Typography>
                    <Typography variant="body2" className="detail-value">
                      {bookingData.totalDays} Days
                    </Typography>
                  </Box>
                </Box>

                <Divider className="summary-divider" />

                <Box className="price-breakdown">
                  <Typography variant="subtitle2" className="breakdown-title">
                    Price Breakdown
                  </Typography>

                  <Box className="price-row">
                    <Typography variant="body2">
                      Rental ({bookingData.totalDays} days × ${carData.pricePerDay})
                    </Typography>
                    <Typography variant="body2" className="price-value">
                      ${bookingData.totalDays * carData.pricePerDay}
                    </Typography>
                  </Box>

                  <Box className="price-row">
                    <Typography variant="body2">
                      Tax (10%)
                    </Typography>
                    <Typography variant="body2" className="price-value">
                      ${(bookingData.totalDays * carData.pricePerDay * 0.1).toFixed(2)}
                    </Typography>
                  </Box>

                  <Divider className="total-divider" />

                  <Box className="price-row total-row">
                    <Typography variant="h6" className="total-label">
                      Total
                    </Typography>
                    <Typography variant="h5" className="total-price">
                      ${(bookingData.totalDays * carData.pricePerDay * 1.1).toFixed(2)}
                    </Typography>
                  </Box>
                </Box>

                <Button
                  variant="contained"
                  size="large"
                  fullWidth
                  className="confirm-button"
                  startIcon={<CheckCircleIcon />}
                >
                  Confirm Booking
                </Button>

                <Typography variant="caption" className="terms-note">
                  By confirming, you agree to our Terms & Conditions
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Stack>
    </Container>
  );
}