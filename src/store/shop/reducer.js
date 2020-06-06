import types from "./types";
import produce from "immer";

const { FETCH_COLLECTIONS_SUCCESS, FETCH_COLLECTIONS_INIT, FETCH_COLLECTIONS_FAILLURE } = types;

const actionsHandlers = {
    [FETCH_COLLECTIONS_INIT]: (draft, action) => {
        draft.isLoading = true;
    },
    [FETCH_COLLECTIONS_FAILLURE]: (draft, action) => {
        draft.isLoading = false;
    },
    [FETCH_COLLECTIONS_SUCCESS]: (draft, action) => {
        draft.collections = action.collections;
        draft.isLoading = false;
    },
}

const initialState = {
    collections: {}
};

const shopReducer = produce((draft, action) => {
    const { type } = action;
    const handler = actionsHandlers[type];
    return handler && handler(draft, action)
}, initialState)

export default shopReducer;