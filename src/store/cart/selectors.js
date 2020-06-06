import { createSelector } from "reselect";

const selectCart = state => state.cartReducer;

export const selectCartItems = createSelector([selectCart], (cartReducer) => cartReducer.items);
/**
 * Returns the total quantie of cart items
 * This prevent recomputing quatity count unless items change
 */
export const selectCartItemsCount = createSelector(
    [selectCartItems],
    (items) => items.reduce((sumQte, {quantity}) => sumQte += quantity, 0)
)

export const selectCartTotalPrice = createSelector(
    [selectCartItems],
    (items) => items.reduce((total, {price, quantity}) => total += price * quantity, 0)
)