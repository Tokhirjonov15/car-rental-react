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
import SearchIcon from '@mui/icons-material/Search';
import "../../../css/vehicles.css";

export default function Vehicles () {
  const cars = [
    {
      name: "Tesla Model 3",
      type: "SEDAN",
      price: "$99.00",
      img: "/img/tesla2.png",
    },
    {
      name: "Mercedes-Benz C",
      type: "SEDAN",
      price: "$185.00",
      img: "/img/benz2.png",
    },
    {
      name: "Porsche 911",
      type: "SPORT",
      price: "$350.00",
      img: "/img/911.jpg",
    },
    {
      name: "Range Rover Evoque",
      type: "SUV",
      price: "$220.00",
      img: "/img/evoque.jpg",
    },
    {
      name: "Range Rover Evoque",
      type: "SUV",
      price: "$220.00",
      img: "/img/evoque.jpg",
    },
    {
      name: "Range Rover Evoque",
      type: "SUV",
      price: "$220.00",
      img: "/img/evoque.jpg",
    },
  ];

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
            <Typography className="sidebar-title">Filters</Typography>

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
            {cars.map((car) => (
              <Card className="car-card" key={car.name}>
                <CardContent>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography className="car-title">{car.name}</Typography>

                    <Checkbox
                      icon={<FavoriteBorderIcon />}
                      checkedIcon={<FavoriteIcon />}
                    />
                  </Stack>

                  <Typography className="car-type">{car.type}</Typography>

                  {car.img ? (
                    <CardMedia
                      component="img"
                      image={car.img}
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
                    <Typography>GASOLINE</Typography>
                    <Typography>2 Doors</Typography>
                    <Typography>2 Seats</Typography>
                  </Stack>

                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    className="car-footer"
                  >
                    <Typography className="car-price">
                      {car.price}
                      <span>/day</span>
                    </Typography>

                    <Button className="rent-btn" variant="contained">
                      Rent Now
                    </Button>
                  </Stack>
                </CardContent>
              </Card>
            ))}
          </Box>

          <Stack className="show-more" direction="row" spacing={2}>
            <Button >Show more car...</Button>
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
};
