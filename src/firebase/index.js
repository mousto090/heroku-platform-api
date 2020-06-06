import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';

export const firebaseDataKeys = {
    shopDataCollectionName: "collections",
}

const config = {
    apiKey: "AIzaSyDHVxj_tPuYe2DhLw1TRLnBBA1MesnhQm8",
    authDomain: "clothing-77955.firebaseapp.com",
    databaseURL: "https://clothing-77955.firebaseio.com",
    projectId: "clothing-77955",
    storageBucket: "clothing-77955.appspot.com",
    messagingSenderId: "516388927204",
    appId: "1:516388927204:web:4138436d8adc42a8b45ef1"
};
// Initialize Firebase
firebase.initializeApp(config);
export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

export const firebaseAuth = firebase.auth();
export const firestore = firebase.firestore();

/**
 * Save the authenticated user to our firebase DB if not already exist
 * @param {object} authenticatedUser 
 * @param {object} meta 
 */
export const createUser = async (authenticatedUser, meta = {}) => {
    if (!authenticatedUser) {
        return;
    }
    const { uid } = authenticatedUser;
    const userDocRef = firestore.doc(`/users/${uid}`);
    const userDocSnapshot = await userDocRef.get();

    if (userDocSnapshot.exists) {
        return userDocRef;
    }
    const { displayName, email } = authenticatedUser;
    const userData = { displayName, email, ...meta, createdAt: new Date().toISOString() }
    try {
        await userDocRef.set(userData)
    } catch (error) {
        console.log("Error saving user ", error.message);
    }
    return userDocRef;
}
/**
 * Get current logged in user
 */
export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const unsubscribeFromAuth = firebaseAuth.onAuthStateChanged(authUser => {
            //unsubscribe immediately as we don't need long lived listener
            unsubscribeFromAuth();
            resolve(authUser)
        }, reject);

    })
}

export default firebase;