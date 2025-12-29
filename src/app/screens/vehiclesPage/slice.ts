import { createSlice } from "@reduxjs/toolkit";
import { VehiclesPageState } from "../../../lib/types/screen";

const initialState: VehiclesPageState = {
    company: null,
    chosenVehicle: null,
    vehicles: [],
};

const vehiclesPageSlice = createSlice({
    name: "vehiclesPage",
    initialState,
    reducers: {
        setCompany: (state, action) => {
            state.company = action.payload;
        },
        setChosenVehicle: (state, action) => {
            state.chosenVehicle = action.payload;
        },
        setVehicles: (state, action) => {
            state.vehicles = action.payload;
        },
    },
});

export const { setCompany, setChosenVehicle, setVehicles} = 
  vehiclesPageSlice.actions;

const VehiclesPageReducer = vehiclesPageSlice.reducer;
export default VehiclesPageReducer;