import { createSelector } from "@reduxjs/toolkit";
import { AppRootState } from "../../../lib/types/screen";

const selectMyBookingsPage = (state: AppRootState) => state.myBookingsPage;

export const retrieveConfirmedBookings = createSelector(
    selectMyBookingsPage,
    (BookingsPage) => BookingsPage.confirmedBookings
);

export const retrieveFinishedBookings = createSelector(
    selectMyBookingsPage,
    (BookingsPage) => BookingsPage.finishedBookings
);