import { all } from "redux-saga/effects";
import watchShopSagas from "./shop";
import watchUserSagas from "./user";
import watchCartSagas from "./cart";

function* sagas() {
    yield all([
        ...watchShopSagas,
        ...watchUserSagas,
        ...watchCartSagas
    ]);
}

export default  sagas;