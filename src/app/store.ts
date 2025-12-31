import { configureStore, ThunkAction, Action, getDefaultMiddleware } from '@reduxjs/toolkit';
import reduxLogger from "redux-logger";
import homePageReducer from './screens/homePage/slice';
import vehiclesPageReducer from './screens/vehiclesPage/slice';
import UserReducer from './screens/userPage/slice';
import MyBookingsPageReducer from './screens/myBookingsPage/slice';

export const store = configureStore({
  middleware: (getDefaultMiddleware) => 
    //@ts-ignore
  getDefaultMiddleware().concat(reduxLogger),
  reducer: {
    homePage: homePageReducer,
    vehiclesPage: vehiclesPageReducer,
    myBookingsPage: MyBookingsPageReducer,
    userPage: UserReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
