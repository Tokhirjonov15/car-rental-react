import React, { useEffect, useState } from 'react';
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
  Tabs,
  Tab,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { useHistory } from 'react-router-dom';
import "../../../css/booking.css";
import { setConfirmedBookings, setFinishedBookings } from './slice';
import { retrieveConfirmedBookings, retrieveFinishedBookings } from './selector';
import { BookingInquiry, Booking } from '../../../lib/types/booking';
import { BookingStatus } from '../../../lib/enums/booking.enum';
import MyBookingsService from '../../services/BookingService';
import { serverApi } from '../../../lib/config';

/** REDUX SLICE & SELECTOR */
const actionDispatch = (dispatch: Dispatch) => ({
  setConfirmedBookings: (data: Booking[]) => dispatch(setConfirmedBookings(data)),
  setFinishedBookings: (data: Booking[]) => dispatch(setFinishedBookings(data)),
});

const confirmedBookingsRetriever = createSelector(
  retrieveConfirmedBookings,
  (confirmedBookings) => ({ confirmedBookings })
);

const finishedBookingsRetriever = createSelector(
  retrieveFinishedBookings,
  (finishedBookings) => ({ finishedBookings })
);

export default function MyBookingsPage() {
  const { setConfirmedBookings, setFinishedBookings } = actionDispatch(useDispatch());
  const { confirmedBookings } = useSelector(confirmedBookingsRetriever);
  const { finishedBookings } = useSelector(finishedBookingsRetriever);
  const history = useHistory();
  const [tabValue, setTabValue] = useState(0);
  
  const [bookingInquiry, setBookingInquiry] = useState<BookingInquiry>({
    page: 1,
    limit: 10,
    bookingStatus: BookingStatus.PROCESS,
  });

  useEffect(() => {
    const booking = new MyBookingsService();

    booking
      .getMyBookings({ ...bookingInquiry, bookingStatus: BookingStatus.PROCESS })
      .then((data) => {
        console.log("✅ Confirmed bookings:", data);
        setConfirmedBookings(data);
      })
      .catch((err) => {
        console.error("❌ Error getting confirmed bookings:", err);
      });

    booking
      .getMyBookings({ ...bookingInquiry, bookingStatus: BookingStatus.FINISH })
      .then((data) => {
        console.log("✅ Finished bookings:", data);
        setFinishedBookings(data);
      })
      .catch((err) => {
        console.error("❌ Error getting finished bookings:", err);
      });
  }, [bookingInquiry]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleBack = () => {
    window.scrollTo(0, 0);
    history.push('/');
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    };
    return date.toLocaleDateString('en-US', options);
  };

  const getStatusChip = (isFinished: boolean) => {
    return (
      <Chip
        label={isFinished ? 'Finished' : 'Active'}
        className={`status-chip ${isFinished ? 'finished' : 'confirmed'}`}
        size="small"
        icon={isFinished ? <EventAvailableIcon /> : <CheckCircleIcon />}
      />
    );
  };

  const renderBookings = (bookings: Booking[], isFinished: boolean) => {
    if (!bookings || bookings.length === 0) {
      return (
        <Card className="empty-state-card">
          <CardContent>
            <DirectionsCarIcon className="empty-icon" />
            <Typography variant="h5" className="empty-title">
              No {isFinished ? 'Finished' : 'Active'} Bookings
            </Typography>
            <Typography variant="body1" className="empty-text">
              You don't have any {isFinished ? 'finished' : 'active'} bookings at the moment.
            </Typography>
            <Button 
              variant="contained" 
              className="browse-button"
              onClick={() => history.push('/vehicles')}
            >
              Browse Cars
            </Button>
          </CardContent>
        </Card>
      );
    }

    return (
      <Box className="bookings-container">
        {bookings.map((booking: any) => {
          const vehicle = booking.vehicleId || booking.vehicledata?.[0];
          
          const vehicleImage = vehicle?.vehicleImages?.[0]
            ? `${serverApi}/${vehicle.vehicleImages[0]}`
            : '/icons/default-car.png';

          return (
            <Box key={booking._id} className="booking-wrapper">
              <Card className={`booking-card ${isFinished ? 'finished' : 'confirmed'}`}>
                <CardContent className="booking-card-content">
                  <Box className="car-image-section">
                    <Avatar
                      src={vehicleImage}
                      alt={vehicle?.vehicleName || 'Car'}
                      className="car-image"
                      variant="rounded"
                    />
                    <Box className="car-type-badge">
                      <Typography variant="caption">
                        {vehicle?.vehicleCollection || 'N/A'}
                      </Typography>
                    </Box>
                  </Box>

                  <Box className="booking-details-section">
                    <Box className="booking-header">
                      <Box>
                        <Typography variant="h5" className="car-name">
                          {vehicle?.vehicleName || 'Unknown Vehicle'}
                        </Typography>
                        <Typography variant="body2" className="booking-id">
                          Booking ID: {booking._id?.substring(0, 8).toUpperCase()}
                        </Typography>
                      </Box>
                      {getStatusChip(isFinished)}
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
                              {booking.rentDays} Day{booking.rentDays > 1 ? 's' : ''}
                            </Typography>
                          </Box>
                        </Box>

                        <Box className="detail-item">
                          <AccessTimeIcon className="detail-icon" />
                          <Box>
                            <Typography variant="caption" className="detail-label">
                              Booking Date
                            </Typography>
                            <Typography variant="body2" className="detail-value">
                              {formatDate(booking.createdAt)}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>

                      <Box className="detail-row">
                        <Box className="detail-item">
                          <Typography variant="caption" className="detail-label">
                            Status
                          </Typography>
                          <Typography variant="body2" className="detail-value">
                            {booking.bookingStatus}
                          </Typography>
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
                        ${booking.bookingTotal?.toFixed(2) || '0.00'}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          );
        })}
      </Box>
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
            onClick={handleBack}
          >
            Back to Home
          </Button>

          <Box className="page-title-wrapper">
            <img src='/icons/merit-logo.png' alt="Logo" />
            <Box>
              <Typography variant="h3" className="page-title">
                My Bookings
              </Typography>
              <Typography variant="body1" className="page-subtitle">
                View your car rental reservations
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box className="tabs-wrapper">
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange}
            className="booking-tabs"
          >
            <Tab 
              label={`Active Bookings (${confirmedBookings?.length || 0})`} 
              className="booking-tab"
            />
            <Tab 
              label={`Finished Bookings (${finishedBookings?.length || 0})`}
              className="booking-tab"
            />
          </Tabs>
        </Box>

        <Box className="bookings-list">
          {tabValue === 0 && renderBookings(confirmedBookings, false)}
          {tabValue === 1 && renderBookings(finishedBookings, true)}
        </Box>
      </Stack>
    </Container>
  );
}