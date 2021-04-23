import React from 'react';
import classes from './OrdersContainer.module.css';

const OrdersContainer = (props) => {
    return (
        <div className={classes.OrdersContainer}>
            <h1>My Orders</h1>
            {props.children}
        </div>
    );    
}

export default OrdersContainer;