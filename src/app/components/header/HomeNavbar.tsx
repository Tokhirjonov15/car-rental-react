import { Box, Stack, Container, Button } from "@mui/material";
import { NavLink, useHistory } from "react-router-dom";
import "../../../css/navbar.css";
import { useState } from "react";
import SignUpModal from "../auth/SignupModal";

export function HomeNavbar () {
  const authMember = null;
  const history = useHistory();
  const [openSignUp, setOpenSignUp] = useState(false);

  const handleSignUpOpen = () => {
    setOpenSignUp(true);
  };

  const handleSignUpClose = () => {
    setOpenSignUp(false);
  };

  return (
    <>
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
                  <Button 
                    className="sign-up"
                    onClick={handleSignUpOpen}
                  >
                      Sign Up
                  </Button>
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

      {/* SignUp Modal */}
      <SignUpModal 
        open={openSignUp} 
        onClose={handleSignUpClose} 
      />
    </>
  );
};