import React from 'react';
import { Link, Route, Switch, useLocation } from 'react-router-dom';
import { VehiclesPage } from './screens/vehiclesPage';
import { BookingPage } from './screens/bookingPage';
import { HelpPage } from './screens/helpPage';
import { UserPage } from './screens/userPage';
import { HomePage } from './screens/homePage';
import "../css/app.css";
import { HomeNavbar } from './components/headers/HomeNavbar';
import { OtherNavbar } from './components/headers/OtherNavbar';
import { Footer } from './components/footer';

function App() {
  const location = useLocation();
  console.log("location:", location);
  
  return (
    <>
      {location.pathname === '/' ? <HomeNavbar /> : <OtherNavbar />}
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