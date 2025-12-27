import React from 'react';
import {
  Container,
  Box,
  Typography,
  Stack,
  Button,
  Card,
  CardContent,
  Chip,
  IconButton,
  Avatar,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PaymentIcon from '@mui/icons-material/Payment';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';
import CancelIcon from '@mui/icons-material/Cancel';
import "../../../css/booking.css";

interface Booking {
  id: string;
  carName: string;
  carImage: string;
  carType: string;
  bookingDate: string;
  pickupDate: string;
  returnDate: string;
  pickupLocation: string;
  returnLocation: string;
  totalAmount: number;
  status: 'confirmed' | 'pending' | 'cancelled';
  paymentMethod: string;
  rentalDays: number;
}

export default function MyBookingsPage() {
  const bookings: Booking[] = [
    {
      id: 'BK-2024-001234',
      carName: 'BMW 3 Series',
      carImage: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400',
      carType: 'Sedan',
      bookingDate: '2024-12-20',
      pickupDate: '2024-12-27',
      returnDate: '2024-12-30',
      pickupLocation: 'Tashkent Airport',
      returnLocation: 'Tashkent Airport',
      totalAmount: 368.50,
      status: 'confirmed',
      paymentMethod: 'Bank Transfer',
      rentalDays: 3,
    },
    {
      id: 'BK-2024-001235',
      carName: 'Mercedes-Benz E-Class',
      carImage: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400',
      carType: 'Luxury Sedan',
      bookingDate: '2024-12-15',
      pickupDate: '2024-12-22',
      returnDate: '2024-12-25',
      pickupLocation: 'City Center',
      returnLocation: 'City Center',
      totalAmount: 525.00,
      status: 'pending',
      paymentMethod: 'Credit Card',
      rentalDays: 3,
    },
    {
      id: 'BK-2024-001236',
      carName: 'Toyota Camry',
      carImage: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400',
      carType: 'Sedan',
      bookingDate: '2024-12-10',
      pickupDate: '2024-12-15',
      returnDate: '2024-12-18',
      pickupLocation: 'Tashkent Airport',
      returnLocation: 'Downtown Office',
      totalAmount: 285.00,
      status: 'confirmed',
      paymentMethod: 'Cash',
      rentalDays: 3,
    },
    {
      id: 'BK-2024-001237',
      carName: 'Audi A6',
      carImage: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400',
      carType: 'Executive Sedan',
      bookingDate: '2024-12-05',
      pickupDate: '2024-12-12',
      returnDate: '2024-12-14',
      pickupLocation: 'Samarkand Hotel',
      returnLocation: 'Samarkand Hotel',
      totalAmount: 420.00,
      status: 'cancelled',
      paymentMethod: 'Bank Transfer',
      rentalDays: 2,
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircleIcon className="status-icon confirmed" />;
      case 'pending':
        return <PendingIcon className="status-icon pending" />;
      case 'cancelled':
        return <CancelIcon className="status-icon cancelled" />;
      default:
        return null;
    }
  };

  const getStatusChip = (status: string) => {
    const statusIcon = getStatusIcon(status);
    return (
      <Chip
        label={status.charAt(0).toUpperCase() + status.slice(1)}
        className={`status-chip ${status}`}
        size="small"
        {...(statusIcon && { icon: statusIcon })}
      />
    );
  };

  return (
    <Container maxWidth="lg" className="my-bookings-page">
      <Stack spacing={4}>
        <Box className="page-header-section">
          <Button
            variant="contained"
            startIcon={<ArrowBackIcon />}
            className="back-button"
          >
            Back to Home
          </Button>

          <Box className="page-title-wrapper">
            <img src='/icons/merit-logo.png'/>
            <Box>
              <Typography variant="h3" className="page-title">
                My Bookings
              </Typography>
              <Typography variant="body1" className="page-subtitle">
                View and manage your car rental reservations
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box className="bookings-list">
          {bookings.length === 0 ? (
            <Card className="empty-state-card">
              <CardContent>
                <DirectionsCarIcon className="empty-icon" />
                <Typography variant="h5" className="empty-title">
                  No Bookings Yet
                </Typography>
                <Typography variant="body1" className="empty-text">
                  You haven't made any car rental reservations yet.
                </Typography>
                <Button variant="contained" className="browse-button">
                  Browse Cars
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Box className="bookings-container">
              {bookings.map((booking) => (
                <Box key={booking.id} className="booking-wrapper">
                  <Card className={`booking-card ${booking.status}`}>
                    <CardContent className="booking-card-content">
                      <Box className="car-image-section">
                        <Avatar
                          src={booking.carImage}
                          alt={booking.carName}
                          className="car-image"
                          variant="rounded"
                        />
                        <Box className="car-type-badge">
                          <Typography variant="caption">{booking.carType}</Typography>
                        </Box>
                      </Box>

                      <Box className="booking-details-section">
                        <Box className="booking-header">
                          <Box>
                            <Typography variant="h5" className="car-name">
                              {booking.carName}
                            </Typography>
                            <Typography variant="body2" className="booking-id">
                              Booking ID: {booking.id}
                            </Typography>
                          </Box>
                          {getStatusChip(booking.status)}
                        </Box>

                        <Box className="details-grid">
                          <Box className="detail-row">
                            <Box className="detail-item">
                              <AccessTimeIcon className="detail-icon" />
                              <Box>
                                <Typography variant="caption" className="detail-label">
                                  Rental Duration
                                </Typography>
                                <Typography variant="body2" className="detail-value">
                                  {booking.rentalDays} Days
                                </Typography>
                              </Box>
                            </Box>
                          </Box>
                        </Box>
                      </Box>

                      <Box className="booking-actions-section">
                        <Box className="price-section">
                          <Typography variant="caption" className="price-label">
                            Total Amount
                          </Typography>
                          <Typography variant="h4" className="price-value">
                            ${booking.totalAmount}
                          </Typography>
                        </Box>

                        <Box className="action-buttons">
                          <IconButton
                            className="delete-button"
                          >
                            <DeleteOutlineIcon />
                          </IconButton>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Box>
              ))}
            </Box>
          )}
        </Box>
      </Stack>
    </Container>
  );
}