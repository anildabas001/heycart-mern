import React, {useEffect, useState} from 'react';
import OrderProductSection from './OrderProductSection/OrderProductSection';
import PriceSummarySection from './PriceSummarySection/PriceSummarySection';
import classes from './MyOrderContainer.module.css';

const MyOrderContainer = (props) => {
    return (
        <>               
            {props.order ? <div className={classes.MyOrderContainer}>
                <h1>Order Summary</h1>
                <OrderProductSection order={props.order}/>
                <PriceSummarySection order={props.order}/>
            </div> : null}
        </>
        
    )
}


export default MyOrderContainer;