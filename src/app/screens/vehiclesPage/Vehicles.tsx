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
import { useEffect, useState } from "react";

import { Vehicle, VehicleInquiry } from "../../../lib/types/vehicle";
import { setVehicles } from "./slice";
import { retrieveVehicles } from "./selector";
import VehicleService from "../../services/VehicleService";
import { serverApi } from "../../../lib/config";

import "../../../css/vehicles.css";
import { useHistory } from "react-router-dom";
import { VehicleCollection, VehicleFuel } from "../../../lib/enums/vehicle.enum";

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
  const [vehicleSearch, setVehicleSearch] = useState<VehicleInquiry>({
      page: 1,
      limit: 20,
      book: "createdAt",
      search: "",
  }); 
  const [searchText, setSearchText] = useState<string>("");
  const history = useHistory();

  useEffect(() => {
    const vehicle = new VehicleService();
    vehicle
      .getVehicles(vehicleSearch)
      .then((data) => setVehicles(data))
      .catch((err) => console.log(err));
  }, [vehicleSearch]);

  useEffect(() => {
    if (searchText === "") {
      vehicleSearch.search = "";
      setVehicleSearch({ ...vehicleSearch });
    }
  }, [searchText]);

/** HANDLERS */
const searchCollectionHandler = (collection: VehicleCollection) => {
  setVehicleSearch({
    ...vehicleSearch,
    page: 1,
    vehicleCollection: collection,
  });
};

const searchOrderHandler = (book: string) => {
  setVehicleSearch({
    ...vehicleSearch,
    page: 1,
    book: book,
  });
};

const searchVehicleHandler = () => {
  setVehicleSearch({
    ...vehicleSearch,
    search: searchText,
  });
};

const clearFiltersHandler = () => {
  setVehicleSearch({
    page: 1,
    limit: 20,
    book: "createdAt",
    search: searchText,
    vehicleCollection: undefined,
  });
};

const clearSearch = () => {
  setSearchText("");
  setVehicleSearch({
    ...vehicleSearch,
    search: "",
  });
};

const chooseCarHandler = (id: string) => {
  history.push(`/vehicles/${id}`);
};

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
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") searchVehicleHandler();
            }}
          />
          {searchText && (
            <button
              type="button"
              className="clear-search-btn"
              onClick={() => setSearchText("")}
            >
              ×
            </button>
          )}
          <Button 
            className="search-btn"
            onClick={searchVehicleHandler}
          >SEARCH</Button>
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
                <Button onClick={clearFiltersHandler}>
                  ALL VEHICLES
                </Button>
                <Button
                  onClick={() => 
                    searchCollectionHandler(VehicleCollection.SPORTCAR)
                  }
                >
                  SPORT
                </Button>
                <Button
                  onClick={() => 
                    searchCollectionHandler(VehicleCollection.SUV)
                  }
                >
                  SUV
                </Button>
                <Button
                  onClick={() => 
                    searchCollectionHandler(VehicleCollection.MINIVAN)
                  }
                >
                  MINIVAN
                </Button>
                <Button
                  onClick={() => 
                    searchCollectionHandler(VehicleCollection.SEDAN)
                  }
                >
                  SEDAN
                </Button>
                <Button
                  onClick={() => 
                    searchCollectionHandler(VehicleCollection.HATCHBACK)
                  }
                >
                  HATCHBACK
                </Button>
                <Button
                  onClick={() => 
                    searchCollectionHandler(VehicleCollection.LUXURY)
                  }
                >
                  LUXURY
                </Button>
                <Button
                  onClick={() => 
                    searchCollectionHandler(VehicleCollection.OTHER)
                  }
                >
                  OTHERS
                </Button>
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
                          key={vehicle._id}
                          className="rent-btn"
                          variant="contained"
                          onClick={() => chooseCarHandler(vehicle._id)}
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
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
}
