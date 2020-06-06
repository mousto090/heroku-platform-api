import types from "./types";
import produce from "immer";
import CATALOGUES from "../../data/cataloguesData";

const {INIT_CATALOGUE} = types;

const actionsHandlers = {
    [INIT_CATALOGUE]: (draft, action) => {
        // draft.collections = CATALOGUES;
    }
}

const initialState = {
    catalogues: CATALOGUES
};

const catalogueReducer = produce((draft , action) => {
    const {type} = action;
    const handler = actionsHandlers[type];
    return handler && handler(draft, action)
}, initialState)

export default catalogueReducer;