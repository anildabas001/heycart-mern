import React from 'react';
import classes from './Button.module.css';

const Button = (props) => {
    let classToAssign = classes.Button;

    if (props.type === 'secondary') {
        classToAssign = classes.Secondary
    }

    return (
        <button onClick={props.onClickHandler} className={classToAssign}>{props.children}</button>
    );
}

export default React.memo(Button);