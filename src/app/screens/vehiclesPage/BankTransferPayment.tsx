import React, { useEffect, useState } from 'react';
import {
  Container,
  Box,
  Typography,
  Stack,
  Button,
  Card,
  CardContent,
  Divider,
  IconButton,
  Chip,
  Snackbar,
  Alert,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import InfoIcon from '@mui/icons-material/Info';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Dispatch } from '@reduxjs/toolkit';
import { createSelector } from "reselect";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from 'react-router-dom';
import { Vehicle } from '../../../lib/types/vehicle';
import { retrieveChosenVehicle } from './selector';
import { setChosenVehicle } from './slice';
import VehicleService from '../../services/VehicleService';
import "../../../css/vehicles.css";
import BookingService from '../../services/BookingService';
import { isUserLoggedIn } from '../../../lib/auth';

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

export default function BankTransferPage() {
  const { vehicleId } = useParams<{ vehicleId: string }>();
  const { setChosenVehicle } = actionDispatch(useDispatch());
  const { chosenVehicle } = useSelector(chosenVehicleRetriever);
  const history = useHistory();

  // Booking info from previous page (localStorage'dan olish)
    const [bookingInfo, setBookingInfo] = useState<BookingInfo>({
      pickupDate: '',
      returnDate: '',
      totalDays: 0,
      totalAmount: 0,
    });
    
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  
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

  const bankDetails = {
    companyName: 'MeritRentGo LLC',
    bankName: 'National Bank of Uzbekistan',
    accountNumber: '2020 8060 0012 3456 7890',
    swiftCode: 'NBFAUZTX',
    inn: '123456789',
  };

  const bookingSummary = {
    carName: 'BMW 3 Series',
    bookingId: 'BK-2024-001234',
    totalAmount: 368.50,
    rentalDays: 3,
  };

  const instructions = [
    'Transfer the exact amount shown below to our bank account',
    'Include your Booking ID in the payment reference/description',
    'Payment must be received within 24 hours to confirm your booking',
    'Send the payment receipt to support@meritrentgo.uz',
    'Your booking will be confirmed once payment is verified',
  ];

  /** HANDLERS */
  const GoBackHandler = () => {
    window.scrollTo(0, 0);
    history.push(`/vehicles/${vehicleId}/booking`);
  };

  const bookingHandler = async () => {
    if (!isUserLoggedIn()) {
      alert("You're not authenticated, please login first!");
      window.scrollTo(0, 0);
      history.push("/");
      return;
    }

    try {
      if (!chosenVehicle || bookingInfo.totalDays === 0) {
        alert("Booking information is incomplete");
        return;
      }

      const bookingService = new BookingService();
      const bookingInput = {
        vehicleId: chosenVehicle._id,
        rentDays: bookingInfo.totalDays,
      };

      await bookingService.createBooking(bookingInput);

      setShowSuccessAlert(true);
      setTimeout(() => {
        localStorage.removeItem(`booking_${vehicleId}`);
        window.scrollTo(0, 0);
        history.push("/myBookings");
      }, 3000);
    } catch (err: any) {
      console.error("Booking failed:", err);
      
      if (err?.response?.status === 401) {
        alert("You're not authenticated, please login first!");
      } else if (err?.response) {
        const errorMsg = err.response?.data?.message || err.response?.statusText;
        alert(`Booking failed: ${errorMsg}`);
        console.log("Error details:", err.response?.data);
      } else {
        alert(`Booking failed: ${err?.message || "Please try again."}`);
      }
    }
  };

  return (
    <Container maxWidth="md" className="bank-transfer-page">
      <Snackbar
        open={showSuccessAlert}
        autoHideDuration={3000}
        onClose={() => setShowSuccessAlert(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setShowSuccessAlert(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Booking Successfully Completed! 🎉
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
          <AccountBalanceIcon className="page-icon" />
          <Typography variant="h3" className="page-title">
            Bank Transfer Payment
          </Typography>
          <Typography variant="body1" className="page-subtitle">
            Transfer the payment amount to the following bank account
          </Typography>
        </Box>

        <Card className="notice-card">
          <CardContent>
            <Stack direction="row" spacing={2} alignItems="flex-start">
              <InfoIcon className="notice-icon" />
              <Box>
                <Typography variant="body1" className="notice-text">
                  <strong>Important:</strong> Please include your Booking ID{' '}
                  <Chip label={bookingSummary.bookingId} size="small" className="booking-id-chip" />
                  {' '}in the payment reference to ensure quick processing.
                </Typography>
              </Box>
            </Stack>
          </CardContent>
        </Card>

        <Box className="transfer-content">
          <Card className="bank-details-card">
            <CardContent>
              <Typography variant="h6" className="card-title">
                <AccountBalanceIcon className="title-icon" />
                Bank Account Details
              </Typography>

              <Stack spacing={3} className="details-list">
                <Box className="detail-item">
                  <Typography variant="body2" className="detail-label">
                    Company Name
                  </Typography>
                  <Box className="detail-value-wrapper">
                    <Typography variant="body1" className="detail-value">
                      {bankDetails.companyName}
                    </Typography>
                    <IconButton size="small" className="copy-button">
                      <ContentCopyIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>

                <Divider className="detail-divider" />

                <Box className="detail-item">
                  <Typography variant="body2" className="detail-label">
                    Bank Name
                  </Typography>
                  <Box className="detail-value-wrapper">
                    <Typography variant="body1" className="detail-value">
                      {bankDetails.bankName}
                    </Typography>
                    <IconButton size="small" className="copy-button">
                      <ContentCopyIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>

                <Divider className="detail-divider" />

                <Box className="detail-item">
                  <Typography variant="body2" className="detail-label">
                    Account Number
                  </Typography>
                  <Box className="detail-value-wrapper">
                    <Typography variant="h6" className="detail-value account-number">
                      {bankDetails.accountNumber}
                    </Typography>
                    <IconButton size="small" className="copy-button">
                      <ContentCopyIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>

                <Divider className="detail-divider" />

                <Box className="detail-item">
                  <Typography variant="body2" className="detail-label">
                    SWIFT Code
                  </Typography>
                  <Box className="detail-value-wrapper">
                    <Typography variant="body1" className="detail-value">
                      {bankDetails.swiftCode}
                    </Typography>
                    <IconButton size="small" className="copy-button">
                      <ContentCopyIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>

                <Divider className="detail-divider" />

                <Box className="detail-item">
                  <Typography variant="body2" className="detail-label">
                    Tax ID (INN)
                  </Typography>
                  <Box className="detail-value-wrapper">
                    <Typography variant="body1" className="detail-value">
                      {bankDetails.inn}
                    </Typography>
                    <IconButton size="small" className="copy-button">
                      <ContentCopyIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>
              </Stack>
            </CardContent>
          </Card>

          <Box className="summary-section">
            <Card className="amount-card">
              <CardContent>
                <Typography variant="h6" className="card-title">
                  Payment Amount
                </Typography>

                <Stack spacing={2} className="amount-details">
                  <Box className="amount-row">
                    <Typography variant="body2" className="amount-label">
                      Vehicle
                    </Typography>
                    <Typography variant="body2" className="amount-value">
                      {chosenVehicle?.vehicleName}
                    </Typography>
                  </Box>

                  <Box className="amount-row">
                    <Typography variant="body2" className="amount-label">
                      Rental Period
                    </Typography>
                    <Typography variant="body2" className="amount-value">
                      {bookingInfo.totalDays > 0 
                        ? `${bookingInfo.totalDays} Day${bookingInfo.totalDays > 1 ? 's' : ''}`
                        : 'N/A'
                      }
                    </Typography>
                  </Box>

                  <Box className="amount-row">
                    <Typography variant="body2" className="amount-label">
                      Vehicle ID
                    </Typography>
                    <Typography variant="body2" className="amount-value booking-id">
                      {chosenVehicle?._id}
                    </Typography>
                  </Box>

                  <Divider className="amount-divider" />

                  <Box className="amount-row total-row">
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
              </CardContent>
            </Card>

            <Card className="instructions-card">
              <CardContent>
                <Typography variant="h6" className="card-title">
                  <CheckCircleIcon className="title-icon" />
                  Payment Instructions
                </Typography>

                <Stack spacing={2} className="instructions-list">
                  {instructions.map((instruction, index) => (
                    <Box key={index} className="instruction-item">
                      <Box className="instruction-number">
                        {index + 1}
                      </Box>
                      <Typography variant="body2" className="instruction-text">
                        {instruction}
                      </Typography>
                    </Box>
                  ))}
                </Stack>
              </CardContent>
            </Card>
            <Button
              variant="contained"
              size="large"
              fullWidth
              className="confirm-btn"
              startIcon={<CheckCircleIcon />}
              onClick={bookingHandler}
            >
              Confirm Booking
            </Button>
          </Box>
        </Box>
      </Stack>
    </Container>
  );
}
