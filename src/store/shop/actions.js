import types from "./types";
const { FETCH_COLLECTIONS, FETCH_COLLECTIONS_SUCCESS, FETCH_COLLECTIONS_INIT, FETCH_COLLECTIONS_FAILLURE } = types;

export const fetchShopCollections = () => ({ type: FETCH_COLLECTIONS })
export const fetchShopCollectionsInit = () => ({ type: FETCH_COLLECTIONS_INIT })
export const fetchShopCollectionsSuccess = (collections) => ({ type: FETCH_COLLECTIONS_SUCCESS, collections })
export const fetchShopCollectionsFaillure = () => ({ type: FETCH_COLLECTIONS_FAILLURE })