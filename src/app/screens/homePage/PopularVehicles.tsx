import { Box, Stack, Container, Typography, Card, CardMedia, CardContent, Button, Pagination } from "@mui/material";
import { useState } from "react";
import "../../../css/home.css";

const vehicles = [
  {
    id: 1,
    name: "Tesla Model 3",
    subtitle: "Standard Range Plus",
    price: 140,
    image: "/img/tesla2.png",
    specs: ["ELECTRIC", "4 Doors", "5 Seats"],
  },
  {
    id: 2,
    name: "Mercedes-Benz C",
    subtitle: "C-Class Sedan",
    price: 185,
    image: "/img/benz2.png",
    specs: ["DIESEL", "2 Doors", "4 Seats"],
  },
  {
    id: 3,
    name: "Porsche 911",
    subtitle: "Carrera S",
    price: 350,
    image: "/img/911.jpg",
    specs: ["GASOLINE", "2 Doors", "2 Seats"],
  },
  {
    id: 4,
    name: "Range Rover Evoque",
    subtitle: "Autobiography",
    price: 220,
    image: "/img/evoque.jpg",
    specs: ["HYBRID", "4 Doors", "7 Seats"],
  },
];

export default function PopularVehicles() {
  const [page, setPage] = useState(1);

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
        <Stack direction="row" spacing={3}>
          {vehicles.map((car) => (
            <Card key={car.id} className="vehicle-card">
              <Box className="image-wrapper">
                <CardMedia
                  component="img"
                  image={car.image}
                  alt={car.name}
                  className="vehicle-image"
                />
                <span className="favorite">♡</span>
              </Box>
              <CardContent>
                <Typography className="vehicle-name">{car.name}</Typography>
                <Typography className="vehicle-subtitle">{car.subtitle}</Typography>

                <Stack direction="row" spacing={2} className="specs">
                  {car.specs.map((spec, i) => (
                    <span key={i}>{spec}</span>
                  ))}
                </Stack>
                <Stack direction="row" justifyContent="space-between" alignItems="center" mt={2}>
                  <Typography className="price">
                    ${car.price} <span>/day</span>
                  </Typography>
                  <Button className="rent-btn">Rent Now</Button>
                </Stack>
              </CardContent>
            </Card>
          ))}
        </Stack>
        <Stack alignItems="center" mt={8}>
          <Pagination
            count={3}
            page={page}
            onChange={(_, value) => setPage(value)}
            color="primary"
            shape="rounded"
          />
        </Stack>
      </Container>
    </div>
  );
}
