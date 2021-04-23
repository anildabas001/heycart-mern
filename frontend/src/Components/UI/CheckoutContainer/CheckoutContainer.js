import React from 'react';
import classes from './CheckoutContainer.module.css';


const CheckoutContainer = (props) => {
    return(
        <div className={classes.CheckoutContainer}>
            {props.children}
        </div>
    );
}

export default CheckoutContainer;