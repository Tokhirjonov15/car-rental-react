import { User } from "./user";
import { Vehicle } from "./vehicle"

/** REACT APP STATE */
export interface AppRootState {
    homePage: HomePageState;
    vehiclesPage: VehiclesPageState;
}

/** HOMEPAGE */
export interface HomePageState {
    [x: string]: any;
    popularVehicles: Vehicle[];
}

/** VEHICLES PAGE */

export interface VehiclesPageState {
    company: User | null;
    chosenVehicle: Vehicle | null;
    vehicles: Vehicle[];
}

/** BOOKINGS PAGE */