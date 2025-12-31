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
  Alert,
  Snackbar,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import LockIcon from '@mui/icons-material/Lock';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { retrieveChosenVehicle } from './selector';
import { Vehicle } from '../../../lib/types/vehicle';
import { setChosenVehicle } from './slice';
import { Dispatch } from '@reduxjs/toolkit';
import { createSelector } from "reselect";
import { useSelector, useDispatch } from "react-redux";
import "../../../css/vehicles.css";
import { useHistory, useParams } from 'react-router-dom';
import VehicleService from '../../services/VehicleService';

/** REDUX SLICE & SELECTOR */
const actionDispatch = (dispatch: Dispatch) => ({
  setChosenVehicle: (data: Vehicle) => dispatch(setChosenVehicle(data)),
});
const chosenVehicleRetriever = createSelector(
  retrieveChosenVehicle,
  (chosenVehicle) => ({
    chosenVehicle,
  })
);

interface BookingInfo {
  pickupDate: string;
  returnDate: string;
  totalDays: number;
  totalAmount: number;
}

export default function PaymentPage() {
  const { vehicleId } = useParams<{ vehicleId: string }>();
  const { setChosenVehicle } = actionDispatch(useDispatch());
  const { chosenVehicle } = useSelector(chosenVehicleRetriever);
  const history = useHistory();

  // Payment form state
  const [cardNumber, setCardNumber] = useState('');
  const [cardholderName, setCardholderName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  // Booking info from previous page (localStorage'dan olish)
  const [bookingInfo, setBookingInfo] = useState<BookingInfo>({
    pickupDate: '',
    returnDate: '',
    totalDays: 0,
    totalAmount: 0,
  });

  useEffect(() => {
  const vehicle = new VehicleService();
  vehicle
    .getVehicle(vehicleId)
    .then((data) => setChosenVehicle(data))
    .catch((err) => console.log(err));

  // retrieve booking info from localstorage
  const savedBookingInfo = localStorage.getItem(`booking_${vehicleId}`);
  console.log("localStorage key:", `booking_${vehicleId}`);
  console.log("Saved booking info:", savedBookingInfo);
  
  if (savedBookingInfo) {
    const parsed = JSON.parse(savedBookingInfo);
    console.log("Parsed booking info:", parsed);
    setBookingInfo(parsed);
  }
}, [vehicleId]);

  /** HANDLERS */
  const GoBackHandler = () => {
    window.scrollTo(0, 0);
    history.push(`/vehicles/${vehicleId}/booking`);
  };

  // Check if all input fields are correct
  const isFormValid = () => {
    return (
      cardNumber.trim() !== '' &&
      cardholderName.trim() !== '' &&
      expiryDate.trim() !== '' &&
      cvv.trim() !== ''
    );
  };

  // Payment handler
  const handlePayment = () => {
    if (!isFormValid()) {
      alert('Please fill in all fields');
      return;
    }

    setShowSuccessAlert(true);
    setTimeout(() => {
      // Clear localStorage
      localStorage.removeItem(`booking_${vehicleId}`);
      window.scrollTo(0, 0);
      history.push('/vehicles');
    }, 3000);
  };

  // Card number format 16 number
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ''); // only numbers
    if (value.length <= 16) {
      // 4-4-4-4 format
      const formatted = value.replace(/(\d{4})(?=\d)/g, '$1 ');
      setCardNumber(formatted);
    }
  };

  // Expiry date format (MM/YY)
  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 4) {
      const formatted = value.length >= 2 ? `${value.slice(0, 2)}/${value.slice(2)}` : value;
      setExpiryDate(formatted);
    }
  };

  // CVV format(3 numbers)
  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 3) {
      setCvv(value);
    }
  };

  return (
    <Container maxWidth="md" className="payment-page">
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
          icon={<CheckCircleIcon />}
        >
          <Typography variant="h6">Payment Successful! 🎉</Typography>
          <Typography variant="body2">
            Your booking has been confirmed. Redirecting to vehicles page...
          </Typography>
        </Alert>
      </Snackbar>

      <Stack spacing={4}>
        <Button
          variant="contained"
          startIcon={<ArrowBackIcon />}
          className="back-button"
          onClick={GoBackHandler}
        >
          Back
        </Button>
        <Box className="page-header">
          <Typography variant="h3" className="page-title">
            Payment Details
          </Typography>
          <Typography variant="body1" className="page-subtitle">
            Complete your booking by entering your card details
          </Typography>
        </Box>

        <Box className="payment-content">
          <Card className="payment-form-card">
            <CardContent>
              <Stack direction="row" spacing={2} alignItems="center" className="card-header">
                <CreditCardIcon className="card-icon" />
                <Typography variant="h6" className="card-title">
                  Credit / Debit Card
                </Typography>
              </Stack>

              <Stack spacing={3} className="form-fields">
                <Box>
                  <TextField
                    label="Card Number"
                    placeholder="1234 5678 9012 3456"
                    fullWidth
                    className="input-field"
                    value={cardNumber}
                    onChange={handleCardNumberChange}
                    InputProps={{
                      startAdornment: <CreditCardIcon className="input-icon" />,
                    }}
                  />
                </Box>

                <Box>
                  <TextField
                    label="Cardholder Name"
                    placeholder="JOHN DOE"
                    fullWidth
                    className="input-field"
                    value={cardholderName}
                    onChange={(e) => setCardholderName(e.target.value.toUpperCase())}
                  />
                </Box>

                <Stack direction="row" spacing={2}>
                  <Box flex={1}>
                    <TextField
                      label="Expiry Date"
                      placeholder="MM/YY"
                      fullWidth
                      className="input-field"
                      value={expiryDate}
                      onChange={handleExpiryDateChange}
                    />
                  </Box>
                  <Box flex={1}>
                    <TextField
                      label="CVV"
                      placeholder="123"
                      fullWidth
                      type="password"
                      className="input-field"
                      value={cvv}
                      onChange={handleCvvChange}
                      InputProps={{
                        startAdornment: <LockIcon className="input-icon" />,
                      }}
                    />
                  </Box>
                </Stack>

                <Box className="security-note">
                  <LockIcon className="security-icon" />
                  <Typography variant="caption" className="security-text">
                    Your payment information is encrypted and secure
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>

          <Card className="summary-card">
            <CardContent>
              <Typography variant="h6" className="summary-title">
                Payment Summary
              </Typography>

              <Stack spacing={2} className="summary-details">
                <Box className="summary-row">
                  <Typography variant="body2" className="summary-label">
                    Vehicle
                  </Typography>
                  <Typography variant="body2" className="summary-value">
                    {chosenVehicle?.vehicleName || 'Loading...'}
                  </Typography>
                </Box>

                <Box className="summary-row">
                  <Typography variant="body2" className="summary-label">
                    Rental Period
                  </Typography>
                  <Typography variant="body2" className="summary-value">
                    {bookingInfo.totalDays > 0 
                      ? `${bookingInfo.totalDays} Day${bookingInfo.totalDays > 1 ? 's' : ''}`
                      : 'N/A'
                    }
                  </Typography>
                </Box>

                <Box className="summary-row">
                  <Typography variant="body2" className="summary-label">
                    Insurance & Tax
                  </Typography>
                  <Typography variant="body2" className="summary-value">
                    Included
                  </Typography>
                </Box>

                <Box className="divider" />

                <Box className="summary-row total-row">
                  <Typography variant="h6" className="total-label">
                    Total Amount
                  </Typography>
                  <Typography variant="h5" className="total-amount">
                    ${bookingInfo.totalAmount > 0 
                      ? bookingInfo.totalAmount.toFixed(2) 
                      : '0.00'
                    }
                  </Typography>
                </Box>
              </Stack>

              <Button
                variant="contained"
                size="large"
                fullWidth
                className="pay-button"
                onClick={handlePayment}
                disabled={!isFormValid()}
              >
                Pay ${bookingInfo.totalAmount > 0 
                  ? bookingInfo.totalAmount.toFixed(2) 
                  : '0.00'
                }
              </Button>
            </CardContent>
          </Card>
        </Box>
      </Stack>
    </Container>
  );
}