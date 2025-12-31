import { createSelector } from "reselect";
import { AppRootState } from "../../../lib/types/screen";

const selectUserState = (state: AppRootState) => state.userPage;

export const retrieveUser = createSelector(
  selectUserState,
  (UserPage) => UserPage.user
);