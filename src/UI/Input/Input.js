import React from "react";
import classes from "./Input.module.scss";
import clsx from "clsx";

const Input = ({ handleChange, label, error, ...otherProps }) => {
    const { value } = otherProps;
    const errorElement = error && <span className={classes.error}>{error}</span>
    return (
        <div className={classes.group}>
            <input className={classes.formInput} onChange={handleChange} {...otherProps} />
            <label className={clsx(classes.inputLabel, value && classes.shrink)}>{label}</label>
            {errorElement}
        </div>
    )
}

export default Input;