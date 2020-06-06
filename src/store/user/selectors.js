import { createSelector } from "reselect";

const selectUser = state => state.userReducer;

export const selectCurrentUser = createSelector(
    [selectUser],
    (userReducer) => userReducer.currentUser
)

export const selectUserError = createSelector(
    [selectUser],
    (userReducer)=>userReducer.error
)

export const selectUserIsLoading = createSelector(
    [selectUser],
    (userReducer)=>userReducer.isLoading
)