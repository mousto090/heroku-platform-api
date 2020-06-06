import types from "./types";

const { SIGNIN, SIGN_IN_SUCCESS, SIGN_IN_FAILURE, SIGNUP,
    SIGNIN_WITH_GOOGLE, CHECK_USER_SESSION,
    SIGN_OUT, SIGN_OUT_SUCCESS
} = types;

export const signin = (email, password) => ({ type: SIGNIN, email, password });
export const signinSuccess = (currentUser) => ({ type: SIGN_IN_SUCCESS, currentUser });
export const signinFailure = (error) => ({ type: SIGN_IN_FAILURE, error });

export const signinWithGoogle = () => ({ type: SIGNIN_WITH_GOOGLE });

export const signup = (user) => ({ type: SIGNUP, user });

export const signout = () => ({ type: SIGN_OUT });
export const signoutSuccess = () => ({ type: SIGN_OUT_SUCCESS });

export const checkUserSession = () => ({ type: CHECK_USER_SESSION });