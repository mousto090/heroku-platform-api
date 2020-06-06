import React from 'react';
import classes from './WithSpinner.module.scss';

const WithSpinner = (WrappedComponent) => {

    const Spinner = ({ isLoading, ...otherProps }) => {
        if (!isLoading) {
            return (<WrappedComponent {...otherProps} />);
        }
        return (
            <div className={classes.spinnerWrapper}>
                <div className={classes.spinnerContainer}> </div>
            </div>
        )
    };

    return Spinner;
};

export default WithSpinner;