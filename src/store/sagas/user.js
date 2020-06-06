import { firebaseAuth, googleProvider, createUser, getCurrentUser } from "../../firebase";
import { userTypes } from "../types";
import { takeLatest, put } from "redux-saga/effects";
import { signinSuccess, signinFailure, signoutSuccess } from "../user/actions";

/**
 * Get needed fields from authenticated google User object
 * @param {Object} googleUserCredential 
 */
function* getUserFromSnapshoot(googleUserCredential, meta) {
    const userRef = yield createUser(googleUserCredential, meta);
    const snapshoot = yield userRef.get();
    const currentUser = { ...snapshoot.data(), id: snapshoot.id };
    return currentUser;
}

function* signInWithEmailAndPasswordSaga(action) {
    try {
        const { email, password } = action;
        const { user } = yield firebaseAuth.signInWithEmailAndPassword(email, password);
        const currentUser = yield getUserFromSnapshoot(user);
        yield put(signinSuccess(currentUser))
    } catch (error) {
        console.log(error.message)
        yield put(signinFailure(error.message));
    }
}


function* signInWithGoogleSaga(action) {
    try {
        const { user } = yield firebaseAuth.signInWithPopup(googleProvider);
        const currentUser = yield getUserFromSnapshoot(user);
        yield put(signinSuccess(currentUser))
    } catch (error) {
        console.log(error.message)
        yield put(signinFailure(error.message));
    }
}

function* singupSaga(action) {
    const userData = action.user;
    const {email, password, displayName} = userData;
    try {
        const { user } = yield firebaseAuth.createUserWithEmailAndPassword(email, password);
        const currentUser = yield getUserFromSnapshoot(user, { displayName });
        //Directly sign in the user after singup
        yield put(signinSuccess(currentUser));
    } catch (error) {
        // TODO: put signinfaillure and make user redirect to signin page after singout
        console.log(error.message)
    }
}

function* checkUserSessionSaga(action) {
    try {
        const user = yield getCurrentUser();
        if (!user) {
            return;
        }
        const currentUser = yield getUserFromSnapshoot(user);
        yield put(signinSuccess(currentUser))
    } catch (error) {
        console.log(error.message)
        yield put(signinFailure(error.message));
    }
}

function* signoutSaga(action) {
    try {
        yield firebaseAuth.signOut();
        yield put(signoutSuccess());
    } catch (error) {
        console.log(error.message)
        //put singout faillure
    }
}

const watchUserSagas = [
    takeLatest(userTypes.SIGNIN, signInWithEmailAndPasswordSaga),
    takeLatest(userTypes.SIGNUP, singupSaga),
    takeLatest(userTypes.SIGNIN_WITH_GOOGLE, signInWithGoogleSaga),
    takeLatest(userTypes.CHECK_USER_SESSION, checkUserSessionSaga),
    takeLatest(userTypes.SIGN_OUT, signoutSaga),
]

export default watchUserSagas;
