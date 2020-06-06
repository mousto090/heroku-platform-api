import { takeLatest, put } from "redux-saga/effects";
import { userTypes } from "../types";
import { clearCart } from "../cart/actions";


function* clearCartOnSignoutSaga(action) {
    yield put(clearCart())
}

const watchCartSagas = [
    takeLatest(userTypes.SIGN_OUT_SUCCESS, clearCartOnSignoutSaga),
]
export default watchCartSagas;