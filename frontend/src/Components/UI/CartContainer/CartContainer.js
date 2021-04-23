import classes from './CartContainer.module.css';
import React from 'react';

const CartContainer = (props) => {
    return (
    <div className={classes.CartContainer}>
        {props.children}
    </div>
    );
}

export default CartContainer;