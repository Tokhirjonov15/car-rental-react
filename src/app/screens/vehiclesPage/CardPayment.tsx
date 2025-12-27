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
  Alert,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import LockIcon from '@mui/icons-material/Lock';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import "../../../css/vehicles.css";

export default function PaymentPage() {
  const bookingSummary = {
    carName: 'BMW 3 Series',
    totalAmount: 368.50,
    rentalDays: 3,
  };

  // Show success alert
  const showSuccess = true;

  return (
    <Container maxWidth="md" className="payment-page">
      <Stack spacing={4}>
        <Button
          variant="contained"
          startIcon={<ArrowBackIcon />}
          className="back-button"
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

        {showSuccess && (
          <Alert 
            severity="success" 
            className="success-alert"
            icon={<CheckCircleIcon />}
          >
            <Typography variant="h6" className="success-title">
              Payment Successful!
            </Typography>
            <Typography variant="body2" className="success-message">
              Your booking has been confirmed. You will receive a confirmation email shortly.
            </Typography>
          </Alert>
        )}

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
                  />
                </Box>

                <Stack direction="row" spacing={2}>
                  <Box flex={1}>
                    <TextField
                      label="Expiry Date"
                      placeholder="MM/YY"
                      fullWidth
                      className="input-field"
                    />
                  </Box>
                  <Box flex={1}>
                    <TextField
                      label="CVV"
                      placeholder="123"
                      fullWidth
                      type="password"
                      className="input-field"
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
                    {bookingSummary.carName}
                  </Typography>
                </Box>

                <Box className="summary-row">
                  <Typography variant="body2" className="summary-label">
                    Rental Period
                  </Typography>
                  <Typography variant="body2" className="summary-value">
                    {bookingSummary.rentalDays} Days
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
                    ${bookingSummary.totalAmount}
                  </Typography>
                </Box>
              </Stack>

              <Button
                variant="contained"
                size="large"
                fullWidth
                className="pay-button"
              >
                Pay ${bookingSummary.totalAmount}
              </Button>
            </CardContent>
          </Card>
        </Box>
      </Stack>
    </Container>
  );
}