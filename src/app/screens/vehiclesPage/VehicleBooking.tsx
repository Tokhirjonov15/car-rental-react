import React, { useEffect, useState } from "react";
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
  Alert,
  Snackbar,
} from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PaymentIcon from "@mui/icons-material/Payment";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useHistory, useParams } from "react-router-dom";
import { Dispatch } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { useSelector, useDispatch } from "react-redux";
import VehicleService from "../../services/VehicleService";
import { setChosenVehicle } from "./slice";
import { Vehicle } from "../../../lib/types/vehicle";
import { retrieveChosenVehicle } from "./selector";
import { serverApi } from "../../../lib/config";
import "../../../css/vehicles.css";

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

export default function BookingPage() {
  const { vehicleId } = useParams<{ vehicleId: string }>();
  const { setChosenVehicle } = actionDispatch(useDispatch());
  const { chosenVehicle } = useSelector(chosenVehicleRetriever);
  const history = useHistory();

  // Booking state
  const [bookingData, setBookingData] = useState({
    pickupDate: "",
    pickupTime: "10:00",
    returnDate: "",
    returnTime: "10:00",
    totalDays: 0,
  });

  const [paymentMethod, setPaymentMethod] = useState("card");
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  useEffect(() => {
    const vehicle = new VehicleService();
    vehicle
      .getVehicle(vehicleId)
      .then((data) => setChosenVehicle(data))
      .catch((err) => console.log(err));
  }, [vehicleId]);

  const calculateDays = (pickup: string, returnDate: string) => {
    if (!pickup || !returnDate) return 0;

    const pickupDateTime = new Date(pickup);
    const returnDateTime = new Date(returnDate);

    if (returnDateTime <= pickupDateTime) return 0;

    const diffTime = Math.abs(
      returnDateTime.getTime() - pickupDateTime.getTime()
    );
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays;
  };

  const handlePickupDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPickupDate = e.target.value;
    const days = calculateDays(newPickupDate, bookingData.returnDate);

    setBookingData({
      ...bookingData,
      pickupDate: newPickupDate,
      totalDays: days,
    });
  };

  const handleReturnDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newReturnDate = e.target.value;
    const days = calculateDays(bookingData.pickupDate, newReturnDate);

    setBookingData({
      ...bookingData,
      returnDate: newReturnDate,
      totalDays: days,
    });
  };

  const formatDateTime = (date: string, time: string) => {
    if (!date) return "Not selected";

    const dateObj = new Date(date);
    const options: Intl.DateTimeFormatOptions = {
      month: "short",
      day: "numeric",
      year: "numeric",
    };
    const formattedDate = dateObj.toLocaleDateString("en-US", options);

    // Change 24 hours format to 12
    const [hours, minutes] = time.split(":");
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? "PM" : "AM";
    const displayHour = hour % 12 || 12;

    return `${formattedDate} - ${displayHour}:${minutes} ${ampm}`;
  };

  const calculateTax = () => {
    if (!chosenVehicle) return 0;
    const subtotal = bookingData.totalDays * chosenVehicle.vehiclePrice;
    return subtotal * 0.1;
  };

  const calculateTotal = () => {
    if (!chosenVehicle) return 0;
    const subtotal = bookingData.totalDays * chosenVehicle.vehiclePrice;
    const tax = calculateTax();
    return subtotal + tax;
  };

  const GoBackHandler = () => {
    window.scrollTo(0, 0);
    history.push(`/vehicles/${vehicleId}`);
  };
  // Confirm Booking Handler
  const handleConfirmBooking = () => {
    // Save booking info on localStorage
    const bookingInfoToSave = {
      pickupDate: bookingData.pickupDate,
      returnDate: bookingData.returnDate,
      totalDays: bookingData.totalDays,
      totalAmount: calculateTotal(),
    };

    localStorage.setItem(
      `booking_${vehicleId}`,
      JSON.stringify(bookingInfoToSave)
    );

    if (paymentMethod === "cash") {
      setShowSuccessAlert(true);
      setTimeout(() => {
        localStorage.removeItem(`booking_${vehicleId}`);
        window.scrollTo(0, 0);
        history.push("/vehicles");
      }, 3000);
    } else if (paymentMethod === "card") {
      window.scrollTo(0, 0);
      history.push(`/vehicles/${vehicleId}/booking/cardPayment`);
    } else if (paymentMethod === "bank") {
      window.scrollTo(0, 0);
      history.push(`/vehicles/${vehicleId}/booking/bankTransferPayment`);
    }
  };

  const paymentMethods = [
    { value: "card", label: "Credit/Debit Card" },
    { value: "cash", label: "Cash on Pickup" },
    { value: "bank", label: "Bank Transfer" },
  ];

  return (
    <Container maxWidth="lg" className="booking-page">
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
                          value={bookingData.pickupDate}
                          onChange={handlePickupDateChange}
                          fullWidth
                          className="date-input"
                          InputProps={{
                            startAdornment: (
                              <CalendarMonthIcon className="input-icon" />
                            ),
                          }}
                          inputProps={{
                            min: new Date().toISOString().split("T")[0],
                          }}
                        />
                        <TextField
                          type="time"
                          value={bookingData.pickupTime}
                          onChange={(e) =>
                            setBookingData({
                              ...bookingData,
                              pickupTime: e.target.value,
                            })
                          }
                          fullWidth
                          className="time-input"
                          InputProps={{
                            startAdornment: (
                              <AccessTimeIcon className="input-icon" />
                            ),
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
                          value={bookingData.returnDate}
                          onChange={handleReturnDateChange}
                          fullWidth
                          className="date-input"
                          InputProps={{
                            startAdornment: (
                              <CalendarMonthIcon className="input-icon" />
                            ),
                          }}
                          inputProps={{
                            min:
                              bookingData.pickupDate ||
                              new Date().toISOString().split("T")[0],
                          }}
                        />
                        <TextField
                          type="time"
                          value={bookingData.returnTime}
                          onChange={(e) =>
                            setBookingData({
                              ...bookingData,
                              returnTime: e.target.value,
                            })
                          }
                          fullWidth
                          className="time-input"
                          InputProps={{
                            startAdornment: (
                              <AccessTimeIcon className="input-icon" />
                            ),
                          }}
                        />
                      </Stack>
                    </Box>

                    {bookingData.totalDays > 0 && (
                      <Box className="duration-display">
                        <Chip
                          label={`Total Duration: ${bookingData.totalDays} Day${
                            bookingData.totalDays > 1 ? "s" : ""
                          }`}
                          color="primary"
                          className="duration-chip"
                        />
                      </Box>
                    )}
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
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value)}
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
                        💳 Secure payment processing. Your information is
                        encrypted and safe.
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
                  {chosenVehicle?.vehicleImages &&
                    chosenVehicle.vehicleImages.length > 0 && (
                      <img
                        src={`${serverApi}/${chosenVehicle.vehicleImages[0]}`}
                        alt={chosenVehicle.vehicleName}
                        className="car-image"
                      />
                    )}
                  <Box>
                    <Typography variant="h6" className="car-name">
                      {chosenVehicle?.vehicleName}
                    </Typography>
                    <Typography variant="body2" className="car-category">
                      {chosenVehicle?.vehicleCollection}
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
                      {formatDateTime(
                        bookingData.pickupDate,
                        bookingData.pickupTime
                      )}
                    </Typography>
                  </Box>

                  <Box className="detail-row">
                    <Typography variant="body2" className="detail-label">
                      📅 Return
                    </Typography>
                    <Typography variant="body2" className="detail-value">
                      {formatDateTime(
                        bookingData.returnDate,
                        bookingData.returnTime
                      )}
                    </Typography>
                  </Box>

                  <Box className="detail-row">
                    <Typography variant="body2" className="detail-label">
                      📊 Duration
                    </Typography>
                    <Typography variant="body2" className="detail-value">
                      {bookingData.totalDays > 0
                        ? `${bookingData.totalDays} Day${
                            bookingData.totalDays > 1 ? "s" : ""
                          }`
                        : "Select dates"}
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
                      Rental ({bookingData.totalDays} days × $
                      {chosenVehicle?.vehiclePrice || 0})
                    </Typography>
                    <Typography variant="body2" className="price-value">
                      $
                      {chosenVehicle && bookingData.totalDays > 0
                        ? (
                            bookingData.totalDays * chosenVehicle.vehiclePrice
                          ).toFixed(2)
                        : "0.00"}
                    </Typography>
                  </Box>

                  <Box className="price-row">
                    <Typography variant="body2">Tax (10%)</Typography>
                    <Typography variant="body2" className="price-value">
                      ${calculateTax().toFixed(2)}
                    </Typography>
                  </Box>

                  <Divider className="total-divider" />

                  <Box className="price-row total-row">
                    <Typography variant="h6" className="total-label">
                      Total
                    </Typography>
                    <Typography variant="h6" className="total-value">
                      ${calculateTotal().toFixed(2)}
                    </Typography>
                  </Box>
                </Box>

                <Button
                  variant="contained"
                  size="large"
                  fullWidth
                  className="confirm-button"
                  startIcon={<CheckCircleIcon />}
                  disabled={bookingData.totalDays === 0}
                  onClick={handleConfirmBooking}
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
