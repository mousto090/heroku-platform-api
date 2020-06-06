import { createSelector } from "reselect";

const selectCatalogue = state => state.catalogueReducer

export const selectCatalogues = createSelector(
    [selectCatalogue],
    catalogueReducer=> catalogueReducer.catalogues
)