import React from 'react';
import classes from './QuantityControl.module.css';
import * as ReactIcons from 'react-icons/ai';

const QuantityControl = (props) => {

    const spanClickHandler = (event) => {
        event.preventDefault();
    }

    return (
        <div className={classes.QuantityControl}>
            <ReactIcons.AiOutlineMinus onClick={props.onClickDecrease} />
                <span onClick={spanClickHandler}>{props.value}</span>
            <ReactIcons.AiOutlinePlus onClick={props.onClickIncrease} />
        </div> 
    );
}

export default QuantityControl;