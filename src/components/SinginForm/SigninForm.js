import { withFormik } from "formik";
import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { userActions } from "../../store/actions";
import Button from "../../UI/Button/Button";
import Input from "../../UI/Input/Input";
import { valiateEmail, validatePassword } from "../../utils/validationRules";
import classes from "./SigninForm.module.scss";

const SigninForm = (props) => {
    const { values, errors, touched, handleBlur, handleChange,
        handleSubmit, onSigninWithGoogle } = props;
    return (
        <div className={classes.signinForm}>
            <h2 className={classes.title}>I already have an account</h2>
            <span>Sign in with your email and password</span>
            <form id="signin-form" noValidate autoComplete="off" onSubmit={handleSubmit}>
                <Input type="email" name="email" id="email"
                    label="Email"
                    value={values.email}
                    error={errors.email && touched.email && errors.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                <Input type="password" name="password" id="passwod"
                    label="Password"
                    autoComplete="new-password" //"off" on the form not working in chrome
                    value={values.password}
                    error={errors.password && touched.password && errors.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                <div className={classes.buttons}>
                    <Button type="submit">Submit</Button>
                    <Button type="button" onClick={onSigninWithGoogle} className="google">
                        Sign in with Google
                    </Button>
                </div>
            </form>
        </div>
    );
}

const singinFormik = withFormik({
    mapPropsToValues: () => ({ email: '', password: '' }),
    //enable error from sagas to be injected to formkik errors
    enableReinitialize: true,
    mapPropsToErrors: (props) => {
        //map received error to formik errors so it will be displayed
        //to the right place
        return { password: props.error };
        // return {email: props.error};
    },
    handleSubmit: async ({ email, password }, formikBag) => {
        const { onSignin } = formikBag.props;
        onSignin(email, password);
    },
    validate: ({ email, password }) => {
        const errors = {
            email: valiateEmail(email),
            password: validatePassword(password),
        }
        //form is valid when all fields of errors object is false
        return Object.values(errors).every(v => !v) ? {} : errors;
    },
    //set these two to false to validate only on submit
    // validateOnBlur: false,
    // validateOnChange: false
});

// const mapStateToProps = state => ({
//     error: state.userReducer.error
// })
const mapStateToProps = state => {
    const { userReducer: { error } } = state;
    return { error }
}

const mapDispatchToProps = dispatch => ({
    onSigninWithGoogle: () => dispatch(userActions.signinWithGoogle()),
    onSignin: (email, password) => dispatch(userActions.signin(email, password))
})

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    singinFormik,
)(SigninForm);