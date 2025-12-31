import React, { useEffect } from 'react';
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
import VerifiedIcon from '@mui/icons-material/Verified';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Dispatch } from '@reduxjs/toolkit';
import { createSelector } from "reselect";
import { useSelector, useDispatch } from "react-redux";
import { setChosenVehicle} from './slice';
import { Vehicle } from '../../../lib/types/vehicle';
import { retrieveChosenVehicle } from './selector';
import { useHistory, useParams } from 'react-router-dom';
import VehicleService from '../../services/VehicleService';
import { serverApi } from '../../../lib/config';
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

export default function ChosenVehicle () {
  const { vehicleId } = useParams<{ vehicleId: string }>();
  const { setChosenVehicle } = actionDispatch(useDispatch());
  const { chosenVehicle } = useSelector(chosenVehicleRetriever);
  const history = useHistory();

  useEffect(() => {
    const vehicle = new VehicleService();
    vehicle
      .getVehicle(vehicleId)
      .then((data) => setChosenVehicle(data))
      .catch((err) => console.log(err));
  }, []);

  /** HANDLERS */
  const CarBookingHandler = () => {
    window.scrollTo(0, 0);
    history.push(`/vehicles/${vehicleId}/booking`);
  };
  const GoBackHandler = () => {
    window.scrollTo(0, 0);
    history.push(`/vehicles`);
  };

  if (!chosenVehicle) return null;
  return (
    <Container maxWidth="lg" className="chosen-vehicle-page">
      <Stack spacing={4}>
        <Button
          variant="contained"
          startIcon={<ArrowBackIcon />}
          className="back-button"
          onClick={GoBackHandler}
        >
          Back to Vehicles
        </Button>

        <Box className="vehicle-content">
          <Box className="vehicle-images">
            <Box className="main-image-wrapper">
              {chosenVehicle?.vehicleImages.map(
                (ele: string, index: number) => {
                  const imagePath = `${serverApi}/${ele}`;
                  return (
                    <img
                      src={imagePath}
                      alt={chosenVehicle.vehicleName}
                      className="main-image"
                    />
                  )
                }
              )}
              
            </Box>
          </Box>
          <Box className="vehicle-details">
            <Stack spacing={2}>
              <Box className="vehicle-header">
                <Box>
                  <Chip
                    label={chosenVehicle.vehicleCollection}
                    size="small"
                    className="category-chip"
                  />
                  <Typography variant="h3" className="vehicle-name">
                    {chosenVehicle.vehicleName}
                  </Typography>
                  <Stack direction="row" spacing={2} alignItems="center" className="vehicle-meta">
                    <Box className="location-info">
                      <LocationOnIcon className="location-icon" />
                      <Typography variant="body2">Andijan, Asaka</Typography>
                    </Box>
                  </Stack>
                </Box>
                <Box className="verified-badge">
                  <VerifiedIcon />
                  <Typography variant="caption">Verified</Typography>
                </Box>
              </Box>

              <Typography variant="body1" className="vehicle-description">
                Just Best Choice!
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
                        {chosenVehicle.vehicleCollection}
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
                        {chosenVehicle.vehicleFuel}
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
                        {chosenVehicle.vehicleSeat} Seats
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
                        {chosenVehicle.vehicleMile} Mileage
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
                  ${chosenVehicle.vehiclePrice}
                <Typography component="span" variant="body2" className="price-period">
                    /day
                </Typography>
                </Typography>
                <Typography variant="h3" className="price-note">
                  Insurance and taxes all included!
                </Typography>
            </Box>
            <Button
                variant="contained"
                size="large"
                className="book-now-button"
                onClick={CarBookingHandler}
            >
                Proceed to Booking
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Container>
  );
};