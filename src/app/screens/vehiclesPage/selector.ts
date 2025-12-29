import { createSelector } from "@reduxjs/toolkit";
import { AppRootState } from "../../../lib/types/screen";
import VehiclesPage from ".";

const selectVehiclesPage = (state: AppRootState) => state.vehiclesPage;

export const retrieveCompany = createSelector(
    selectVehiclesPage,
    (VehiclesPage) => VehiclesPage.company
);

export const retrieveChosenVehicle = createSelector(
    selectVehiclesPage,
    (VehiclesPage) => VehiclesPage.chosenVehicle
);

export const retrieveVehicles = createSelector(
    selectVehiclesPage,
    (VehiclesPage) => VehiclesPage.vehicles
);