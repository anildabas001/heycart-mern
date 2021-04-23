import React from 'react';
import classes from './ErrorField.module.css';

const ErrorField = (props) => {
    return (
        <>{props.children ? <div style={props.style} className={classes.ErrorField}>*{props.children}</div> : null}</>
    );
} 

export default ErrorField;