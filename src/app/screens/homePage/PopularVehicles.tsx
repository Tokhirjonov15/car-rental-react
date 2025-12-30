import { Box, Stack, Container, Typography, Card, CardMedia, CardContent, Button, Pagination } from "@mui/material";

import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrievePopularVehicles } from "./selector";
import { Vehicle } from "../../../lib/types/vehicle";
import { serverApi } from "../../../lib/config";
import "../../../css/home.css";
import { useHistory } from "react-router-dom";

/** REDUX SLICE & SELECTOR */
const popularVehiclesRetriever = createSelector(
  retrievePopularVehicles,
  (popularVehicles) => ({ popularVehicles })
);


export default function PopularVehicles() {
  const { popularVehicles } = useSelector(popularVehiclesRetriever);
  const history = useHistory();

  /** HANDLERS */
  const chooseCarHandler = (id: string) => {
    window.scrollTo(0, 0);
    history.push(`/vehicles/${id}`);
  };

  console.log("popularVehicles:", popularVehicles);

  return (
    <div className="top-rated-section">
      <Container maxWidth="lg">
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={4}>
          <Box>
            <Typography className="popular-text">POPULAR DEALS</Typography>
            <Typography variant="h4" className="section-title">
              Top Rated Vehicles
            </Typography>
          </Box>
        </Stack>
        <Stack direction="row" spacing={3} >
          {popularVehicles.length !== 0 ? (
            popularVehicles.map((ele: Vehicle) => {
              const imagePath = `${serverApi}/${ele.vehicleImages[0]}`;
              console.log("IMAGE PATH:", imagePath);

              return (
              <Card key={ele._id} className="vehicle-card">
                <Box className="image-wrapper">
                  <CardMedia
                    component="img"
                    image={imagePath}
                    alt={ele.vehicleName}
                    className="vehicle-image"
                  />
                  <span className="favorite">♡</span>
                </Box>

                <CardContent>
                  <Typography className="vehicle-name">{ele.vehicleName}</Typography>

                  <Stack direction="row" spacing={2} className="specs">
                    <span>{ele.vehicleFuel}</span>
                    <span>{ele.vehicleDoor} Doors</span>
                    <span>{ele.vehicleSeat} Seats</span>
                  </Stack>

                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    mt={2}
                  >
                    <Typography className="price">
                      ${ele.vehiclePrice} <span>/day</span>
                    </Typography>
                    <Button 
                      className="rent-btn"
                      onClick={() => chooseCarHandler(ele._id)}
                    >
                      Rent Now
                    </Button>
                  </Stack>
                </CardContent>
              </Card>
            );
            })
          ) : (
            <Box className="no-data">Popular Vehicles are Not Available!</Box>
          )}
          
        </Stack>
      </Container>
    </div>
  );
}
