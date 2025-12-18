import React from 'react';
import {
  Container,
  Box,
  Typography,
  Stack,
  Divider,
} from '@mui/material';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import "../../../css/footer.css";

export function Footer ()  {
  return (
    <div className="footer-section">
      <Container maxWidth="lg">
        <Box className="footer-content">
          <Box className="footer-brand">
            <Box className="footer-logo">
              <img src='/icons/merit-logo.png' className="logo-icon" />
              <Typography variant="h2" component="h2" className="company-name">
                MeritRentGo
              </Typography>
            </Box>
            
            <Typography variant="body1" className="about-text">
              MeritRentGo - your reliable car rental service in Uzbekistan. 
              We provide quality vehicles and excellent service for comfortable 
              journeys across the country. Trust us with your travels.
            </Typography>
          </Box>
          <Box className="contact-section">
            <Typography variant="h6" className="section-title">
              Contact Information
            </Typography>
            <Stack spacing={2} className="contact-list">
              <Box className="contact-item">
                <LocationOnIcon className="contact-icon" />
                <Box>
                  <Typography variant="body2" className="contact-label">
                    Our Location
                  </Typography>
                  <Typography variant="body1" className="contact-value">
                    Tashkent, Mirzo Ulugbek District, Buyuk Ipak Yo'li Street 123
                  </Typography>
                </Box>
              </Box>
              <Box className="contact-item">
                <PhoneIcon className="contact-icon" />
                <Box>
                  <Typography variant="body2" className="contact-label">
                    Phone Number
                  </Typography>
                  <Typography variant="body1" className="contact-value">
                    +998 (71) 123-45-67
                  </Typography>
                </Box>
              </Box>
              <Box className="contact-item">
                <EmailIcon className="contact-icon" />
                <Box>
                  <Typography variant="body2" className="contact-label">
                    Email Address
                  </Typography>
                  <Typography variant="body1" className="contact-value">
                    info@meritrentgo.uz
                  </Typography>
                </Box>
              </Box>
            </Stack>
          </Box>
        </Box>
        <Divider className="footer-divider" />
        <Box className="footer-bottom">
          <Typography variant="body2" className="copyright-text">
            © {new Date().getFullYear()} MeritRentGo. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </div>
  );
};

export default Footer;