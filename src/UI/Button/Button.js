import React from "react";
import classes from "./Button.module.scss";
import clsx from "clsx";

const Button = ({ children, className = '', ...otherProps }) => {
    const btnClasses = className.split(' ').map(cls => classes[cls] || cls).join(' ');
    const classNames = clsx(classes.button, btnClasses);
    
    return (
        <button className={classNames} {...otherProps}>
            {children}
        </button>
    );
}

export default Button;