import React from 'react';
import {
  Container,
  Box,
  Typography,
  Stack,
  Card,
  CardMedia,
  CardContent,
  Button,
  Chip,
} from '@mui/material';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import "../../../css/home.css";

interface Offer {
  id: number;
  badge: string;
  title: string;
  description: string;
  image: string;
  originalPrice: number;
  discountedPrice: number;
  discount: string;
  features: string[];
  category: string;
}

  const offers: Offer[] = [
    {
      id: 1,
      badge: '20% OFF',
      title: 'BMW 3 Series',
      description: 'Luxury sedan perfect for business trips',
      image: "/img/bmw3series.jpg",
      originalPrice: 80,
      discountedPrice: 64,
      discount: '20% OFF',
      features: ['DIESEL', '4 Doors', '5 Seats'],
      category: 'Weekend Special',
    },
    {
      id: 2,
      badge: 'BOOK 7, PAY 5',
      title: 'Mercedes C-Class',
      description: 'Book for a week, get 2 days free',
      image: "/img/benz2.png",
      originalPrice: 185,
      discountedPrice: 135,
      discount: 'Book 7, Pay 5',
      features: ['DIESEL', '2 Doors', '4 Seats'],
      category: 'Weekly Deal',
    },
    {
      id: 3,
      badge: 'LIMITED TIME',
      title: 'Toyota Camry',
      description: 'Economy car at an unbeatable price',
      image: "/img/camry.jpg",
      originalPrice: 35,
      discountedPrice: 25,
      discount: '30% OFF',
      features: ['HYBRID', '4 Doors ', '5 Seats'],
      category: 'Flash Sale',
    },
  ];

  export function Events () {
  return (
    <div className="special-offers-section">
      <Container maxWidth="lg">
        <Stack spacing={2} alignItems="center" className="offers-header">
          <Box className="offers-icon-wrapper">
            <LocalOfferIcon className="offers-icon" />
          </Box>
          <Typography className="offers-subtitle">
            LIMITED TIME OFFERS
          </Typography>
          <Typography variant="h2" component="h2" className="offers-title">
            Special Offers This Week
          </Typography>
          <Typography variant="body1" className="offers-description">
            Don't miss out on our exclusive deals and save big on your next rental
          </Typography>
        </Stack>

        <Box className="offers-grid">
          {offers.map((offer) => (
            <Card key={offer.id} className="offer-card">
              <Box className="discount-badge">
                <LocalOfferIcon className="badge-icon" />
                <Typography variant="caption" className="badge-text">
                  {offer.badge}
                </Typography>
              </Box>
              <CardMedia
                component="img"
                image={offer.image}
                alt={offer.title}
                className="offer-image"
              />
              <Box className="category-chip-wrapper">
                <Chip
                  label={offer.category}
                  size="small"
                  className="category-chip"
                />
              </Box>

              <CardContent className="offer-content">
                <Typography variant="h5" component="h3" className="offer-title">
                  {offer.title}
                </Typography>
                <Typography variant="body2" className="offer-description">
                  {offer.description}
                </Typography>
                <Stack direction="row" spacing={1} className="features-list">
                  {offer.features.map((feature, index) => (
                    <Chip
                      key={index}
                      label={feature}
                      size="small"
                      variant="outlined"
                      className="feature-chip"
                    />
                  ))}
                </Stack>

                <Box className="price-section">
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Typography variant="h6" className="original-price">
                      ${offer.originalPrice}
                    </Typography>
                    <Typography variant="h4" className="discounted-price">
                      ${offer.discountedPrice}
                    </Typography>
                    <Typography variant="body2" className="price-period">
                      /day
                    </Typography>
                  </Stack>
                  <Typography variant="caption" className="discount-label">
                    Save ${offer.originalPrice - offer.discountedPrice}/day
                  </Typography>
                </Box>
                <Button
                  variant="contained"
                  fullWidth
                  className="offer-button"
                  endIcon={<ArrowForwardIcon />}
                >
                  Book Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </Box>

        <Stack alignItems="center" className="view-all-wrapper">
          <Button
            variant="outlined"
            size="large"
            className="view-all-button"
            endIcon={<ArrowForwardIcon />}
          >
            View All Deals
          </Button>
        </Stack>
      </Container>
    </div>
  );
};