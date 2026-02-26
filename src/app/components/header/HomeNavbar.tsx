import { Box, Stack, Container, Button, Typography, DialogTitle, DialogContent, DialogActions, Dialog, IconButton, Drawer } from "@mui/material";
import { NavLink, useHistory } from "react-router-dom";
import "../../../css/navbar.css";
import { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { Dispatch } from "@reduxjs/toolkit";
import { retrieveUser } from "../../screens/userPage/selector";
import { logoutUser, setUser } from "../../screens/userPage/slice";
import SignUpModal from "../auth/SignupModal";
import SignInModal from "../auth/SigninModal";
import { serverApi } from "../../../lib/config";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import useDeviceDetect from "../../hooks/useDeviceDetect";
import { clearStoredAuth, getAuthenticatedUser } from "../../../lib/auth";

/** REDUX SELECTOR */
const userRetriever = createSelector(retrieveUser, (user) => ({ user }));

/** REDUX DISPATCH */
const actionDispatch = (dispatch: Dispatch) => ({
  setUser: (data: any) => dispatch(setUser(data)),
  logoutUser: () => dispatch(logoutUser()),
});

export function HomeNavbar() {
  const device = useDeviceDetect();
  const isMobile = device === "mobile";
  const { user } = useSelector(userRetriever);
  const { setUser, logoutUser } = actionDispatch(useDispatch());
  const history = useHistory();
  const [openSignUp, setOpenSignUp] = useState(false);
  const [openSignIn, setOpenSignIn] = useState(false);  
  const [openLogoutConfirm, setOpenLogoutConfirm] = useState(false);
  const [openMobileMenu, setOpenMobileMenu] = useState(false);
  const imageVersion = useMemo(() => Date.now(), [user]);

  // Load user only if auth token exists and is still valid.
  useEffect(() => {
    const savedUser = getAuthenticatedUser();
    if (savedUser && !user) {
      setUser(savedUser);
      return;
    }

    if (!savedUser && user) {
      logoutUser();
    }
  }, []);

  const handleSignUpOpen = () => {
    setOpenSignUp(true);
  };

  const handleSignUpClose = () => {
    setOpenSignUp(false);
  };

  const handleSignInOpen = () => {
    setOpenSignIn(true);
  };

  const handleSignInClose = () => {
    setOpenSignIn(false);
  };

  const handleLogoutClick = () => {
    setOpenMobileMenu(false);
    setOpenLogoutConfirm(true);
  };

  const handleLogoutCancel = () => {
    setOpenLogoutConfirm(false);
  };

  const handleLogoutConfirm = () => {
    logoutUser();
    clearStoredAuth();
    setOpenLogoutConfirm(false);
    alert("Logged out successfully!");
    history.push("/");
  };

  const closeMobileMenu = () => {
    setOpenMobileMenu(false);
  };

    // User image path
  const getUserImage = () => {
    if (user?.userImage) {
      let imagePath = user.userImage;
      
      if (imagePath.includes('\\') || imagePath.includes('/')) {
        const parts = imagePath.split(/[\\/]/);
        imagePath = parts[parts.length - 1];
        imagePath = `uploads/users/${imagePath}`;
      }
      
      const fullPath = `${serverApi}/${imagePath}?v=${imageVersion}`;
      console.log("User image path:", fullPath);
      console.log("User data:", user);
      return fullPath;
    }
    console.log("No user image, using default");
    return "/icons/default-user.svg";
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = "/icons/default-user.svg";
  };

  return (
    <>
      <div className="navbar">
        <Container maxWidth="lg">
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            className="navbar-row"
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

            <Stack direction="row" spacing={4} className="desktop-nav-links">
              <NavLink to="/" className="nav-link">
                Home
              </NavLink>
              <NavLink to="/vehicles" className="nav-link">
                Vehicles
              </NavLink>
              {user ? (
                <NavLink to="/myBookings" className="nav-link">
                  My Bookings
                </NavLink>
              ) : null}
              {user ? (
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
              className="auth-area desktop-auth-area"
            >
              {!user ? (
                <>
                  <Button className="sign-in" onClick={handleSignInOpen}>
                    Sign In
                  </Button>
                  <Button className="sign-up" onClick={handleSignUpOpen}>
                    Sign Up
                  </Button>
                </>
              ) : (
                <Stack color="white" direction="row" alignItems="center" spacing={2}>
                  <Typography variant="h3">
                    Hello, {user.userId}!
                  </Typography>
                  <img
                    src={getUserImage()}
                    className="user-avatar"
                    alt={user.userId || "user"}
                    onError={handleImageError}
                  />
                  <Button 
                    variant="outlined" 
                    size="small"
                    onClick={handleLogoutClick}
                    sx={{
                      backgroundColor: 'white',
                      color: 'black',
                      borderColor: 'white',
                      '&:hover': {
                        backgroundColor: '#bcb6b6ff',
                        borderColor: 'white',
                      }
                    }}
                  >
                    Logout
                  </Button>
                </Stack>
              )}
            </Stack>

            {isMobile && (
              <IconButton className="mobile-menu-btn" onClick={() => setOpenMobileMenu(true)}>
                <MenuIcon />
              </IconButton>
            )}
          </Stack>
        </Container>
      </div>

      <Drawer anchor="right" open={openMobileMenu} onClose={closeMobileMenu}>
        <Box className="mobile-menu-drawer">
          <Stack direction="row" alignItems="center" justifyContent="space-between" className="mobile-menu-header">
            <Typography variant="h6">Menu</Typography>
            <IconButton onClick={closeMobileMenu}>
              <CloseIcon />
            </IconButton>
          </Stack>

          <Stack className="mobile-links">
            <NavLink to="/" className="mobile-nav-link" onClick={closeMobileMenu}>
              Home
            </NavLink>
            <NavLink to="/vehicles" className="mobile-nav-link" onClick={closeMobileMenu}>
              Vehicles
            </NavLink>
            {user ? (
              <NavLink to="/myBookings" className="mobile-nav-link" onClick={closeMobileMenu}>
                My Bookings
              </NavLink>
            ) : null}
            {user ? (
              <NavLink to="/user" className="mobile-nav-link" onClick={closeMobileMenu}>
                User
              </NavLink>
            ) : null}
            <NavLink to="/help" className="mobile-nav-link" onClick={closeMobileMenu}>
              Help
            </NavLink>
          </Stack>

          <Stack className="mobile-auth-area">
            {!user ? (
              <>
                <Button className="sign-in" onClick={handleSignInOpen}>
                  Sign In
                </Button>
                <Button className="sign-up" onClick={handleSignUpOpen}>
                  Sign Up
                </Button>
              </>
            ) : (
              <Stack spacing={1.2}>
                <Stack direction="row" alignItems="center" spacing={1.2}>
                  <img
                    src={getUserImage()}
                    className="user-avatar"
                    alt={user.userId || "user"}
                    onError={handleImageError}
                  />
                  <Typography>Hi, {user.userId}</Typography>
                </Stack>
                <Button variant="outlined" onClick={handleLogoutClick}>
                  Logout
                </Button>
              </Stack>
            )}
          </Stack>
        </Box>
      </Drawer>

      <SignUpModal open={openSignUp} onClose={handleSignUpClose} />

      <SignInModal open={openSignIn} onClose={handleSignInClose} />

      <Dialog
        open={openLogoutConfirm}
        onClose={handleLogoutCancel}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          style: {
            borderRadius: '16px',
            padding: '8px',
          },
        }}
      >
        <DialogTitle>
          <Typography variant="h6" fontWeight={600}>
            Confirm Logout
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Are you sure you want to logout?
          </Typography>
        </DialogContent>
        <DialogActions sx={{ padding: '16px 24px' }}>
          <Button 
            onClick={handleLogoutCancel}
            variant="outlined"
            sx={{ mr: 1 }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleLogoutConfirm}
            variant="contained"
            color="error"
          >
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
