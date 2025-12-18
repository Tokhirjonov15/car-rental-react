import React from 'react';
import {
  Container,
  Box,
  Typography,
  Stack,
  Button,
} from '@mui/material';
import AppleIcon from '@mui/icons-material/Apple';
import AndroidIcon from '@mui/icons-material/Android';
import "../../../css/home.css";

export function MobileAppDownload ()  {
  const APP_STORE_URL = 'https://apps.apple.com';
  const GOOGLE_PLAY_URL = 'https://play.google.com'; 

  return (
    <Box className="mobile-app-section">
      <Container maxWidth="lg">
        <Box className="app-content-wrapper">
          <Box className="app-text-content">
            <Typography variant="h2" component="h2" className="app-title">
              Download the RentGo Mobile App
            </Typography>
            <Typography variant="h2" className="app-description">
              Book a car on the go with our mobile app. Available for iOS and Android devices.
            </Typography>

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} className="app-buttons">
              <Button
                variant="contained"
                href={APP_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="store-button app-store-button"
                startIcon={<AppleIcon className="store-icon" />}
              >
                <Box className="button-text">
                  <Typography variant="caption" className="button-label">
                    DOWNLOAD ON THE
                  </Typography>
                  <Typography variant="body1" className="button-store">
                    App Store
                  </Typography>
                </Box>
              </Button>

              <Button
                variant="contained"
                href={GOOGLE_PLAY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="store-button google-play-button"
                startIcon={<AndroidIcon className="store-icon" />}
              >
                <Box className="button-text">
                  <Typography variant="caption" className="button-label">
                    GET IT ON
                  </Typography>
                  <Typography variant="body1" className="button-store">
                    Google Play
                  </Typography>
                </Box>
              </Button>
            </Stack>
          </Box>

          <Box className="app-image-wrapper">
            <img
              src="/img/stats.png"
              alt="Mobile App Screenshot"
              className="app-mockup-image"
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};