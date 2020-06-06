import types from "./types";
import produce from "immer";

const { ADD_ITEM, REMOVE_ITEM, CLEAR_ITEM, CLEAR_CART } = types;

const actionsHandlers = {
    [ADD_ITEM]: (draft, action) => {
        const { item } = action;
        const existingItem = draft.items.find(it => it.id === item.id);
        existingItem ? existingItem.quantity++ : draft.items.push({ ...item, quantity: 1 })
    },
    //Minus 1 from quantity when quantity > 1 (don't remove the item, only clear item remove it)
    [REMOVE_ITEM]: (draft, action) => {
        const { item } = action;
        const existingItem = draft.items.find(it => it.id === item.id && it.quantity > 1);
        existingItem && existingItem.quantity--;
    },
    //Remove the entire item no matter the quantity
    [CLEAR_ITEM]: (draft, action) => {
        const { item } = action;
        draft.items = draft.items.filter(it => it.id !== item.id);
    },
    [CLEAR_CART]: (draft, action) =>{
        draft.items = []
    }
}

const initialState = {
    items: []
};

const cartReducer = produce((draft, action) => {
    const { type } = action;
    const handler = actionsHandlers[type];
    return (handler && handler(draft, action));
}, initialState);

export default cartReducer;