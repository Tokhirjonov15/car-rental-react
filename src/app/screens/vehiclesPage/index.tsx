import { Route, Switch, useRouteMatch } from "react-router-dom";
import Vehicles from "./Vehicles";
import ChosenVehicle from "./ChosenVehicle";
import BookingPage from "./VehicleBooking";
import PaymentPage from "./CardPayment";
import BankTransferPage from "./BankTransferPayment";


export default function VehiclesPage() {
  const vehicles = useRouteMatch();

  return (
    <div className="vehicles-page">
      <Switch>
        <Route path={`${vehicles.path}/:vehicleId/booking/bankTransferPayment` }>
          <BankTransferPage />
        </Route>
        <Route path={`${vehicles.path}/:vehicleId/booking/cardPayment` }>
          <PaymentPage />
        </Route>
        <Route path={`${vehicles.path}/:vehicleId/booking` }>
          <BookingPage />
        </Route>
        <Route path={`${vehicles.path}/:vehicleId` }>
          <ChosenVehicle />
        </Route>
        <Route path={`${vehicles.path}`}>
          <Vehicles />
        </Route>
      </Switch>
    </div>
  )
}