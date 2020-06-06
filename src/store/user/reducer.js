import types from "./types";
import produce from "immer";
const { SIGN_IN, SIGN_IN_SUCCESS, SIGN_IN_FAILURE, SIGN_OUT_SUCCESS } = types;

const actionsHandlers = {
    [SIGN_IN]: (draft, action) => {
        draft.error = null;
        draft.isLoading = true
    },
    [SIGN_IN_FAILURE]: (draft, action) => {
        draft.error = action.error;
        draft.isLoading = false;
    },
    [SIGN_IN_SUCCESS]: (draft, action) => {
        draft.currentUser = action.currentUser;
        draft.isLoading = false;
        draft.error = null;
    },
    [SIGN_OUT_SUCCESS]: (draft, action) => {
        draft.currentUser = null;
        draft.isLoading = false;
        draft.error = null;
    },
}

const initialState = {
    currentUser: null
}
const userReducer = produce((draft, action) => {
    const { type } = action;
    const handler = actionsHandlers[type];
    return (handler && handler(draft, action));
}, initialState)


export default userReducer;