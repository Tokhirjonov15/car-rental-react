import { Booking } from "./booking";
import { User } from "./user";
import { Vehicle } from "./vehicle"

/** REACT APP STATE */
export interface AppRootState {
    homePage: HomePageState;
    vehiclesPage: VehiclesPageState;
    userPage: UserPage;
    myBookingsPage: MyBookingsPageState;
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

/** MY BOOKINGS PAGE */
export interface MyBookingsPageState {
  confirmedBookings: Booking[];
  finishedBookings: Booking[];
}

/** USER PAGE */
export interface UserState {
  user: User | null;
}

export interface UserPage {
  user: User | null;
}