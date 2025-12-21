import { Route, Switch, useRouteMatch } from "react-router-dom";
import Vehicles from "./Vehicles";
import { ChosenVehicle } from "./ChosenVehicle";


export default function VehiclesPage() {
  const vehicles = useRouteMatch();

  return (
    <div className="vehicles-page">
      <Switch>
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