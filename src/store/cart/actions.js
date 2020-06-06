import types from "./types";

const {ADD_ITEM, REMOVE_ITEM, CLEAR_ITEM, CLEAR_CART} = types;

export const addItem = item => ({ type: ADD_ITEM, item });
export const removeItem = item => ({type: REMOVE_ITEM, item});
export const clearItem = item => ({type: CLEAR_ITEM, item});
export const clearCart = () => ({type: CLEAR_CART});