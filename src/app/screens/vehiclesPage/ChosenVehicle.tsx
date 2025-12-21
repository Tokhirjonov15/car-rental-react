import React from 'react';
import {
  Container,
  Box,
  Typography,
  Stack,
  Button,
  Chip,
  Divider,
  Card,
  CardContent,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import SpeedIcon from '@mui/icons-material/Speed';
import SettingsIcon from '@mui/icons-material/Settings';
import AirlineSeatReclineNormalIcon from '@mui/icons-material/AirlineSeatReclineNormal';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import VerifiedIcon from '@mui/icons-material/Verified';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import StarIcon from '@mui/icons-material/Star';
import "../../../css/vehicles.css";

export function ChosenVehicle () {
  const carData = {
    id: 1,
    name: 'BMW 3 Series',
    brand: 'BMW',
    model: '3 Series',
    year: 2023,
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800',
    images: [
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800',
      'data:image/jpeg;base64,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',
      'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=800',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfpAAagmIhuXo3sHRy83PaEmqmgpksZCaV0A&s',
    ],
    pricePerDay: 85,
    rating: 4.8,
    category: 'Luxury Sedan',
    VehicleType: 'SEDAN',
    fuelType: 'GASOLINE',
    seats: 5,
    mileage: '15 km/l',
    location: 'Tashkent, Yunusabad',
    description: 'Experience luxury and performance with the BMW 3 Series. Perfect for business trips or special occasions. This premium sedan offers comfort, style, and advanced technology for an unforgettable driving experience.',
    available: true,
  };

  return (
    <Container maxWidth="lg" className="chosen-vehicle-page">
      <Stack spacing={4}>
        <Button
          variant="contained"
          startIcon={<ArrowBackIcon />}
          className="back-button"
        >
          Back to Vehicles
        </Button>

        <Box className="vehicle-content">
          <Box className="vehicle-images">
            <Box className="main-image-wrapper">
              <img
                src={carData.images[0]}
                alt={carData.name}
                className="main-image"
              />
            </Box>
            <Stack direction="row" spacing={2} className="thumbnail-list">
              {carData.images.map((image, index) => (
                <Box
                  key={index}
                  className={`thumbnail ${index === 0 ? 'active' : ''}`}
                >
                  <img src={image} alt={`View ${index + 1}`} />
                </Box>
              ))}
            </Stack>
          </Box>
          <Box className="vehicle-details">
            <Stack spacing={2}>
              <Box className="vehicle-header">
                <Box>
                  <Chip
                    label={carData.category}
                    size="small"
                    className="category-chip"
                  />
                  <Typography variant="h3" className="vehicle-name">
                    {carData.name}
                  </Typography>
                  <Stack direction="row" spacing={2} alignItems="center" className="vehicle-meta">
                    <Box className="rating">
                      <StarIcon className="star-icon" />
                      <Typography variant="body1">{carData.rating}</Typography>
                    </Box>
                    <Box className="location-info">
                      <LocationOnIcon className="location-icon" />
                      <Typography variant="body2">{carData.location}</Typography>
                    </Box>
                  </Stack>
                </Box>
                <Box className="verified-badge">
                  <VerifiedIcon />
                  <Typography variant="caption">Verified</Typography>
                </Box>
              </Box>

              <Typography variant="body1" className="vehicle-description">
                {carData.description}
              </Typography>
              <Divider />

              <Box className="specifications">
                <Typography variant="h6" className="section-title">
                  Specifications
                </Typography>
                <Box className="spec-grid">
                  <Box className="spec-item">
                    <SettingsIcon className="spec-icon" />
                    <Box>
                      <Typography variant="caption" className="spec-label">
                        Vehicle Type
                      </Typography>
                      <Typography variant="body2" className="spec-value">
                        {carData.VehicleType}
                      </Typography>
                    </Box>
                  </Box>

                  <Box className="spec-item">
                    <LocalGasStationIcon className="spec-icon" />
                    <Box>
                      <Typography variant="caption" className="spec-label">
                        Fuel Type
                      </Typography>
                      <Typography variant="body2" className="spec-value">
                        {carData.fuelType}
                      </Typography>
                    </Box>
                  </Box>

                  <Box className="spec-item">
                    <AirlineSeatReclineNormalIcon className="spec-icon" />
                    <Box>
                      <Typography variant="caption" className="spec-label">
                        Seats
                      </Typography>
                      <Typography variant="body2" className="spec-value">
                        {carData.seats} Seats
                      </Typography>
                    </Box>
                  </Box>

                  <Box className="spec-item">
                    <SpeedIcon className="spec-icon" />
                    <Box>
                      <Typography variant="caption" className="spec-label">
                        Mileage
                      </Typography>
                      <Typography variant="body2" className="spec-value">
                        {carData.mileage}
                      </Typography>
                    </Box>
                  </Box>

                  <Box className="spec-item">
                    <CalendarMonthIcon className="spec-icon" />
                    <Box>
                      <Typography variant="caption" className="spec-label">
                        Year
                      </Typography>
                      <Typography variant="body2" className="spec-value">
                        {carData.year}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Stack>
          </Box>
        </Box>
      </Stack>
      <Card className="booking-card">
        <CardContent>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Box>
                <Typography variant="h4" className="price">
                  ${carData.pricePerDay}
                <Typography component="span" variant="body2" className="price-period">
                    /day
                </Typography>
                </Typography>
                <Typography variant="caption" className="price-note">
                  Insurance and taxes included
                </Typography>
            </Box>
            <Button
                variant="contained"
                size="large"
                className="book-now-button"
            >
                Proceed to Booking
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Container>
  );
};