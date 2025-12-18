import React from 'react';
import { Link, Route, Switch, useLocation } from 'react-router-dom';
import { VehiclesPage } from './screens/vehiclesPage';
import { BookingPage } from './screens/bookingPage';
import { HelpPage } from './screens/helpPage';
import { UserPage } from './screens/userPage';
import "../css/app.css";
import { HomeNavbar } from './components/header/HomeNavbar';
import { Footer } from './components/footer';
import HomePage from './screens/homePage';

function App() {
  return (
    <>
      <HomeNavbar />
        <Switch>
          <Route path="/vehicles">
            <VehiclesPage />
          </Route>
          <Route path="/booking">
            <BookingPage />
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
      <Footer />
    </>
  );
}

export default App;