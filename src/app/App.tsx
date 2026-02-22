import React from 'react';
import { Link, Route, Switch, useLocation } from 'react-router-dom';
import { HomeNavbar } from './components/header/HomeNavbar';
import { Footer } from './components/footer';
import HomePage from './screens/homePage';
import VehiclesPage from './screens/vehiclesPage';
import UserPage from './screens/userPage';
import HelpPage from './screens/helpPage';
import MyBookingsPage from './screens/myBookingsPage';
import "../css/app.css";
import useDeviceDetect from './hooks/useDeviceDetect';

function App() {
  const device = useDeviceDetect();

  return (
    <div id="pc-wrap" className={device === "mobile" ? "mobile-wrap" : "desktop-wrap"}>
      <div id="top">
        <HomeNavbar />
      </div>
      <div id="main">
        <Switch>
          <Route path="/vehicles">
            <VehiclesPage />
          </Route>
          <Route path="/myBookings">
            <MyBookingsPage />
          </Route>
          <Route path="/help">
            <HelpPage />
          </Route>
          <Route path="/user">
            <UserPage />
          </Route>
          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
      </div>
      <div id="footer">
        <Footer />
      </div>
    </div>
  );
}

export default App;
