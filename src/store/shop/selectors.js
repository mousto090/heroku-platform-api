import { createSelector } from "reselect";

const selectShop = state => state.shopReducer

export const selectCollections = createSelector(
    [selectShop],
    shopReducer => shopReducer.collections
)
/**
 * Function that return function, so collectionPath param in props 
 * can be passed to to inner Fn
 * @returns {Object} collection
 */
export const selectCollection = (collectionPath) => createSelector(
    [selectCollections],
    collections => collections[collectionPath]
)

export const selectIsCollectionLoading = createSelector(
    [selectShop],
    shopReducer => shopReducer.isLoading
)