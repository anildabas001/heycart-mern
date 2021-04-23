import React from 'react';
import classes from './Form.module.css';

const Form = (props) => {
    return (
        <form>
            {props.children}
        </form>
    );
} 

export default Form;