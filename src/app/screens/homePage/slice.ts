import { createSlice } from "@reduxjs/toolkit";
import { HomePageState } from "../../../lib/types/screen";

const initialState: HomePageState = {
    popularVehicles: [],
};

const homePageSlice = createSlice({
    name: "homePage",
    initialState,
    reducers: {
        setPopularVehicles: (state, action) => {
            state.popularVehicles = action.payload;
        },
    },
});

export const { setPopularVehicles } = homePageSlice.actions;

const homePageReducer = homePageSlice.reducer;
export default homePageReducer;
