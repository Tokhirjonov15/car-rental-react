import {
  Box,
  Container,
  Stack,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  Checkbox,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { useEffect } from "react";

import { Vehicle } from "../../../lib/types/vehicle";
import { setVehicles } from "./slice";
import { retrieveVehicles } from "./selector";
import VehicleService from "../../services/VehicleService";
import { serverApi } from "../../../lib/config";

import "../../../css/vehicles.css";

/** REDUX SLICE & SELECTOR */
const actionDispatch = (dispatch: Dispatch) => ({
  setVehicles: (data: Vehicle[]) => dispatch(setVehicles(data)),
});

const vehiclesRetriever = createSelector(
  retrieveVehicles,
  (vehicles) => vehicles || []
);

export default function Vehicles() {
  const { setVehicles } = actionDispatch(useDispatch());
  const vehicles = useSelector(vehiclesRetriever);

  useEffect(() => {
    const vehicleService = new VehicleService();

    vehicleService
      .getVehicles({
        page: 1,
        limit: 8,
        book: "createdAt",
        search: "",
      })
      .then((data) => setVehicles(data))
      .catch((err) => console.log(err));
  }, [setVehicles]);

  return (
    <Container maxWidth="xl" className="cars-page">
      <Box className="cars-header">
        <Typography className="cars-header-title">
          Car Listing
        </Typography>

        <Box className="cars-search">
          <input
            type="text"
            placeholder="Search something here"
            className="cars-search-input"
          />
          <Button className="search-btn">SEARCH</Button>
        </Box>
      </Box>

      <Stack direction="row" spacing={4}>
        <Stack className="cars-sidebar">
          <Stack spacing={3}>
            <Typography className="sidebar-title">
              Filters
            </Typography>

            <Stack>
              <Stack className="sidebar-label">TYPE</Stack>
              <Stack spacing={1} className="sidebar-list">
                <Button>SPORT</Button>
                <Button>SUV</Button>
                <Button>MINIVAN</Button>
                <Button>SEDAN</Button>
                <Button>HATCHBACK</Button>
                <Button>OTHERS</Button>
              </Stack>
            </Stack>

            <Stack>
              <Stack className="sidebar-label">CAPACITY</Stack>
              <Stack spacing={1} className="sidebar-list">
                <Button>2 Seats</Button>
                <Button>4 Seats</Button>
                <Button>5 Seats</Button>
                <Button>6 Seats or More</Button>
              </Stack>
            </Stack>
          </Stack>
        </Stack>

        <Box className="cars-content">
          <Box className="cars-grid">
            {vehicles.length === 0 ? (
              <Box className="no-vehicles">
                <Typography variant="h5" fontWeight={600}>
                  Vehicles are Not Available!
                </Typography>
              </Box>
            ) : (
              vehicles.map((vehicle: Vehicle) => {
                const imagePath =
                  vehicle.vehicleImages &&
                  vehicle.vehicleImages.length > 0
                    ? `${serverApi}/${vehicle.vehicleImages[0]}`
                    : "";

                return (
                  <Card className="car-card" key={vehicle._id}>
                    <CardContent>
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Typography className="car-title">
                          {vehicle.vehicleName}
                        </Typography>

                        <Checkbox
                          icon={<FavoriteBorderIcon />}
                          checkedIcon={<FavoriteIcon />}
                        />
                      </Stack>

                      <Typography className="car-type">
                        {vehicle.vehicleCollection}
                      </Typography>

                      {imagePath ? (
                        <CardMedia
                          component="img"
                          image={imagePath}
                          className="car-image"
                        />
                      ) : (
                        <Box className="car-image-placeholder" />
                      )}

                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        className="car-specs"
                      >
                        <Typography>{vehicle.vehicleFuel}</Typography>
                        <Typography>
                          {vehicle.vehicleDoor} Doors
                        </Typography>
                        <Typography>
                          {vehicle.vehicleSeat} Seats
                        </Typography>
                      </Stack>

                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        className="car-footer"
                      >
                        <Typography className="car-price">
                          {vehicle.vehiclePrice}
                          <span>/day</span>
                        </Typography>

                        <Button
                          className="rent-btn"
                          variant="contained"
                        >
                          Rent Now
                        </Button>
                      </Stack>
                    </CardContent>
                  </Card>
                );
              })
            )}
          </Box>
          <Stack
            className="show-more"
            direction="row"
            spacing={2}
          >
            <Button>Show more car...</Button>
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
}
