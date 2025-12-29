import { createSelector } from "@reduxjs/toolkit";
import { AppRootState } from "../../../lib/types/screen";
import HomePage from ".";

const selectHomePage = (state: AppRootState) => state.homePage;
export const retrievePopularVehicles = createSelector(
    selectHomePage,
    (HomePage) => HomePage.popularVehicles
);