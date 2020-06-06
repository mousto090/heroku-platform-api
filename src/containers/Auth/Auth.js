import React from "react";
import classes from "./Auth.module.scss";
import SigninForm from "../../components/SinginForm/SigninForm";
import SignupForm from "../../components/SignupForm/SignupForm";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../../store/user/selectors";

const Auth = ({ currentUser }) => {
    //TO DO: handle this with unauthenticated HOC component 
    //(also this flash auth page )
    if (currentUser) {
        return <Redirect to="/" />
    }
    
    return (
        <div className={classes.authContainer}>
            <SigninForm />
            <SignupForm />
        </div>
    );
};

//createStructuredSelector to combine more selector without
//repeating passing state as it passe it automatically
const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser
})
export default connect(mapStateToProps)(Auth);
