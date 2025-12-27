import { Vehicle } from "./vehicle"

export interface AppRootState {
    homePage: HomePageState;
}

export interface HomePageState {
    popularVehicles: Vehicle[];
}