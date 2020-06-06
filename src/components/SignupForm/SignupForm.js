import { withFormik } from "formik";
import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { userActions } from "../../store/actions";
import Button from "../../UI/Button/Button";
import Input from "../../UI/Input/Input";
import { valiateEmail, validatePassword, validatePasswordMatch, validateRequired } from "../../utils/validationRules";
import classes from "./SignupForm.module.scss";

const SignupForm = ({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => {

    return (
        <div className={classes.singupForm}>
            <h2 className={classes.title}>I do not have a account</h2>
            <span>Sign up with your email and password</span>
            <form id='sign-up-form' noValidate autoComplete="off" onSubmit={handleSubmit}>
                <Input
                    type='text'
                    name='displayName'
                    value={values.displayName}
                    error={errors.displayName && touched.displayName && errors.displayName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    label='Display Name'
                />
                <Input
                    type='email'
                    name='email'
                    value={values.email}
                    error={errors.email && touched.email && errors.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    label='Email'
                />
                <Input
                    type='password'
                    name='password'
                    value={values.password}
                    error={errors.password && touched.password && errors.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    label='Password'
                    autoComplete="new-password" //off on the form not working in chrome
                />
                <Input
                    type='password'
                    name='confirmPassword'
                    value={values.confirmPassword}
                    error={errors.confirmPassword && touched.confirmPassword && errors.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    label='Confirm Password'
                />
                <Button type='submit'>SIGN UP</Button>
            </form>

        </div>
    );
}

const SingupFormiK = withFormik({
    mapPropsToValues: () => ({ displayName: '', email: '', password: '', confirmPassword: '' }),
    //enable error from sagas to be injected to formkik errors
    enableReinitialize: true,
    mapPropsToErrors: (props) => {
        //map received error to formik errors so it will be displayed
        //to the right place
        return { confirmPassword: props.error };
    },
    handleSubmit: async (values, formikBag) => {
        const {onSignup} = formikBag.props
        onSignup(values);
    },
    validate: ({ displayName, email, password, confirmPassword }) => {
        const errors = {
            displayName: validateRequired(displayName),
            email: valiateEmail(email),
            password: validatePassword(password),
            confirmPassword: validatePasswordMatch(password, confirmPassword)
        };
        //form is valid when all fields of errors object is false
        return Object.values(errors).every(v => !v) ? {} : errors;
    },
    //set these two to false to validate only on submit
    // validateOnBlur: false,
    // validateOnChange: false
});

const mapStateToProps = state => {
    const { userReducer: { error } } = state;
    return { error }
}
const mapDispatchToProps = dispatch => ({
    onSignup: user => dispatch(userActions.signup(user))
})

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    SingupFormiK
)(SignupForm);