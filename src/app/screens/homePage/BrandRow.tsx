import { Box, Container, Stack, Typography } from "@mui/material";
import "../../../css/home.css";

const brands = [
  { name: "TESLA", logo: "/icons/tesla.png" },
  { name: "BMW", logo: "/icons/bmw.jpg" },
  { name: "VOLVO", logo: "/icons/volvo.jpg" },
  { name: "MERCEDES", logo: "/icons/benz.jpg" },
  { name: "HONDA", logo: "/icons/honda.png" },
];

export default function BrandRow() {
  return (
    <Box className="brand-row">
      <Container maxWidth="lg">
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          {brands.map((brand) => (
            <Stack
              key={brand.name}
              direction="row"
              spacing={1}
              alignItems="center"
              className="brand-item"
            >
              
              {brand.logo && (
                <img src={brand.logo} alt={brand.name} />
              )}
              <Typography>{brand.name}</Typography>
            </Stack>
          ))}
        </Stack>
      </Container>
    </Box>
  );
}
