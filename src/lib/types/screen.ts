import { Vehicle } from "./vehicle"

/** REACT APP STATE */
export interface AppRootState {
    homePage: HomePageState;
}

/** HOMEPAGE */
export interface HomePageState {
    [x: string]: any;
    popularVehicles: Vehicle[];
}

/** VEHICLES PAGE */

/** BOOKINGS PAGE */