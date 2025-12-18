import React from 'react';
import {
  Container,
  Box,
  Typography,
  Stack,
  Button,
  Card,
  CardContent,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import BookOnlineIcon from '@mui/icons-material/BookOnline';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import "../../../css/home.css";

  const steps = [
    {
      icon: <SearchIcon className="step-icon" />,
      title: 'Find Your Car',
      description: 'Browse hundreds of cars in your city with our easy-to-use search filters',
      step: '01',
    },
    {
      icon: <BookOnlineIcon className="step-icon" />,
      title: 'Book Instantly',
      description: 'Secure payment in minutes with insurance and protection included',
      step: '02',
    },
    {
      icon: <DirectionsCarIcon className="step-icon" />,
      title: 'Hit the Road',
      description: 'Pick up your car and enjoy your journey with peace of mind',
      step: '03',
    },
  ];

  export function HowItWorks () {
  return (
    <Box className="how-it-works-section">
      <Container maxWidth="lg">
        <Stack spacing={2} alignItems="center" className="section-header">
          <Typography variant="overline" className="section-subtitle">
            SIMPLE PROCESS
          </Typography>
          <Typography variant="h2" component="h2" className="section-title">
            How It Works
          </Typography>
          <Typography variant="body1" className="section-description">
            Rent a car in just 3 easy steps. Fast, secure, and hassle-free.
          </Typography>
        </Stack>

        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={4}
          alignItems="stretch"
          className="steps-container"
        >
          {steps.map((step, index) => (
            <Box key={index} className="step-wrapper">
              <Card elevation={0} className="step-card">
                <CardContent className="step-card-content">
                  <Box className="step-badge">
                    {step.step}
                  </Box>
                  <Box className="step-icon-wrapper">
                    {step.icon}
                  </Box>
                  <Typography variant="h5" component="h3" className="step-title">
                    {step.title}
                  </Typography>
                  <Typography variant="body2" className="step-description">
                    {step.description}
                  </Typography>
                </CardContent>
              </Card>

              {index < steps.length - 1 && (
                <Box className="step-arrow">
                  <ArrowForwardIcon className="arrow-icon" />
                </Box>
              )}
            </Box>
          ))}
        </Stack>

        <Stack alignItems="center" className="cta-wrapper">
          <Button
            endIcon={<ArrowForwardIcon />}
            className="cta-button"
          >
            Start Your Journey
          </Button>
        </Stack>
      </Container>
    </Box>
  );
};