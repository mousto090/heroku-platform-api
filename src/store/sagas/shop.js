import { takeLatest, put } from "redux-saga/effects";
import { shopTypes } from "../types";
import { fetchShopCollectionsInit, fetchShopCollectionsFaillure, fetchShopCollectionsSuccess } from "../shop/actions";
import { firestore, firebaseDataKeys } from "../../firebase";

function* fetchShopCollectionsSaga() {
    yield put(fetchShopCollectionsInit());
    const { shopDataCollectionName } = firebaseDataKeys;
    try {
        const { docs } = yield firestore.collection(shopDataCollectionName).get();
        const collections = {};
        yield docs.forEach(doc => {
            const { title, items } = doc.data();
            const titleLower = title.toLowerCase();
            collections[titleLower] = { id: doc.id, routeName: encodeURI(titleLower), title, items };
        });
        yield put(fetchShopCollectionsSuccess(collections));

    } catch (error) {
        console.log(error.message)
        yield put(fetchShopCollectionsFaillure());
    }

}


const watchShopSagas = [
    takeLatest(shopTypes.FETCH_COLLECTIONS, fetchShopCollectionsSaga)
];

export default watchShopSagas;