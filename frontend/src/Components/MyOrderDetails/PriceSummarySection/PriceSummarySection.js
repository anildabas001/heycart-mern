import React from 'react';
import classes from './PriceSummarySection.module.css';

const PriceSummarySection = (props) => {


    return(<div className={classes.SummarySection}>
            <div className={classes.PriceSummarySection}>
                <h4>Payment Details</h4>
                <div className={classes.SummaryBox}>
                    {
                        props.order.products.length > 0 ? <>
                        <div><p className={classes.Point}>Items in Cart</p><p className={classes.Value}>{Math.trunc(props.order.totalQuantity)}</p></div>
                        <div><p className={classes.Point}>Sub total</p><p className={classes.Value}>{props.order.products[0].product.price.symbol}{props.order.totalPrice.toFixed(2)}</p></div>
                        <div><p className={classes.Point}>Delivery Fee</p><p className={classes.Value}>{props.order.products[0].product.price.symbol}0</p></div>
                        <div style={{fontWeight: 400}}><p className={classes.Point}>Total Amount</p><p className={classes.Value}>{props.order.products[0].product.price.symbol}{props.order.totalPrice.toFixed(2)}</p></div></  >
                    : null
                    }                    
                </div>                
            </div>        
            <div className={classes.PriceSummarySection}>     
                <h4>Order Status</h4>           
                <p style={{fontWeight: 400, fontSize: '1.1em', padding: '2px 10px', color: '#0f7c90'}}>Order Number: {props.order.id}</p>
                <p style={{marginTop: '10px', fontWeight: 400, padding: '2px 10px', color: '#0f7c90'}}>Order Status: {props.order.orderStatus}</p>
                <p style={{fontWeight: 400, padding: '2px 10px', color: '#0f7c90'}} >Delivery Status: {props.order.deliveryStatus}</p>
                <p style={{fontWeight: 400, padding: '2px 10px', color: '#0f7c90'}}>Payment Status: {props.order.paymentStatus}</p>
            </div>
        </div>
    );
}

export default PriceSummarySection;