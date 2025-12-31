import { createSlice } from "@reduxjs/toolkit";
import { UserState } from "../../../lib/types/screen";

const initialState: UserState = {
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logoutUser: (state) => {
      state.user = null;
    },
  },
});

export const { setUser, logoutUser } = userSlice.actions;

const UserReducer = userSlice.reducer;
export default UserReducer;