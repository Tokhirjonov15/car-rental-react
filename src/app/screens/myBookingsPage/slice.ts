import { createSlice } from "@reduxjs/toolkit";
import { MyBookingsPageState } from "../../../lib/types/screen";

const initialState: MyBookingsPageState = {
    confirmedBookings: [],
    finishedBookings: [],
};

const myBookingsPageSlice = createSlice({
    name: "myBookingsPage",
    initialState,
    reducers: {
        setConfirmedBookings: (state, action) => {
            state.confirmedBookings = action.payload;
        },
        setFinishedBookings: (state, action) => {
            state.finishedBookings = action.payload;
        },
    },
});

export const { setConfirmedBookings, setFinishedBookings } = myBookingsPageSlice.actions;

const MyBookingsPageReducer = myBookingsPageSlice.reducer;
export default MyBookingsPageReducer;