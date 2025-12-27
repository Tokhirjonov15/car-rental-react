import { Box, Stack, Container, Button } from "@mui/material";
import { NavLink } from "react-router-dom";
import "../../../css/navbar.css";

export function HomeNavbar () {
  const authMember = true;

  return (
    <div className="navbar">
      <Container maxWidth="lg">
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
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

          <Stack direction="row" spacing={4}>
            <NavLink to="/" className="nav-link">
              Home
            </NavLink>
            <NavLink to="/vehicles" className="nav-link">
              Vehicles
            </NavLink>
            {authMember ? (
              <NavLink to="/myBookings" className="nav-link">
                My Bookings
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

          <Stack
            direction="row"
            alignItems="center"
            spacing={2}
            className="auth-area"
          >
            {!authMember ? (
              <>
                <Button className="sign-in">Sign In</Button>
                <Button className="sign-up">Sign Up</Button>
              </>
            ) : (
              <img
                src="/icons/default-user.svg"
                className="user-avatar"
                alt="user"
              />
            )}
          </Stack>
        </Stack>
      </Container>
    </div>
  );
};