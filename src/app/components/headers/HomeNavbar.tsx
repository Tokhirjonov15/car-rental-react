import { Box, Stack, Container } from "@mui/material";
import { NavLink } from "react-router-dom";
import "../../../css/navbar.css";

export function HomeNavbar () {
  const authMember = null;

  return (
    <Box className="navbar">
      <Container maxWidth="lg">
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          {/* LEFT */}
          <Stack direction="row" alignItems="center" spacing={2.5}>
            <Box className="logo-icon">
              <img
                src="/icons/merit-logo.png"
                alt="Merit Logo"
                className="logo-image"
              />
            </Box>
            <Box className="logo-text">MeritRentGo</Box>
          </Stack>

          {/* CENTER */}
          <Stack direction="row" spacing={4}>
            <NavLink to="/" className="nav-link">
              Home
            </NavLink>
            <NavLink to="/vehicles" className="nav-link">
              Vehicles
            </NavLink>
            {authMember ? (
              <NavLink to="/booking" className="nav-link">
                Booking
              </NavLink>
            ) : null}
            {authMember ? (
              <NavLink to="/user" className="nav-link">
                User
              </NavLink>
            ) : null}
            <NavLink to="/help" className="nav-link">
              Help
            </NavLink>       
          </Stack>

          {/* RIGHT */}
          <Stack direction="row" alignItems="center" spacing={2}>
            {!authMember ? (
              <NavLink to="/signin" className="sign-in">
              Sign In
            </NavLink>
            ) : (
              <img />
            )}
            <NavLink to="/signup" className="sign-up">
              Sign Up
            </NavLink>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};