import React from 'react';
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
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import InfoIcon from '@mui/icons-material/Info';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import "../../../css/vehicles.css";

export default function BankTransferPage() {
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

  return (
    <Container maxWidth="md" className="bank-transfer-page">
      <Stack spacing={4}>
        <Button
          variant="contained"
          startIcon={<ArrowBackIcon />}
          className="back-button"
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
                      {bookingSummary.carName}
                    </Typography>
                  </Box>

                  <Box className="amount-row">
                    <Typography variant="body2" className="amount-label">
                      Rental Period
                    </Typography>
                    <Typography variant="body2" className="amount-value">
                      {bookingSummary.rentalDays} Days
                    </Typography>
                  </Box>

                  <Box className="amount-row">
                    <Typography variant="body2" className="amount-label">
                      Booking ID
                    </Typography>
                    <Typography variant="body2" className="amount-value booking-id">
                      {bookingSummary.bookingId}
                    </Typography>
                  </Box>

                  <Divider className="amount-divider" />

                  <Box className="amount-row total-row">
                    <Typography variant="h6" className="total-label">
                      Total Amount
                    </Typography>
                    <Typography variant="h4" className="total-amount">
                      ${bookingSummary.totalAmount}
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
          </Box>
        </Box>
      </Stack>
    </Container>
  );
}