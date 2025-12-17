import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import { VehiclesPage } from './screens/vehiclesPage';
import { BookingPage } from './screens/bookingPage';
import { HelpPage } from './screens/helpPage';
import { UserPage } from './screens/userPage';
import { HomePage } from './screens/homePage';
import "../css/app.css";

function App() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">HomePage</Link>
          </li>
          <li>
            <Link to="/vehicles">VehiclesPage</Link>
          </li>
          <li>
            <Link to="/booking">BookingPage</Link>
          </li>
          <li>
            <Link to="/help">HelpPage</Link>
          </li>
          <li>
            <Link to="/user">UserPage</Link>
          </li>
        </ul>
      </nav>

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
      </div>
  );
}

export default App;