import React from 'react';
import classes from './PriceSummarySection.module.css';
import { PayPalButton } from "react-paypal-button-v2";
import {connect} from 'react-redux';

const PriceSummarySection = (props) => {

    const paymentStatusHandler = (details, actions, failStatus) => {
        props.setLoader(true);
        let paymentStatus;

        if (failStatus) {
            paymentStatus = 'Failed';
        }
        else {
            paymentStatus = details.status
        }

        fetch(`/api/v1/order/payment/${props.order.id}`,
        {
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': 'true',
                'Access-Control-Allow-Methods' : 'GET, POST, OPTIONS',
            },
            credentials: 'include',
            mode: 'cors',
            body: JSON.stringify({
                paymentStatus
            })
        }).then(response => response.json())
        .then(response => {
            response.status === 'success' ? props.updateStatus(response.data): props.setError();
            props.setLoader(true);
        }).catch(err => props.setError());
    }
    
    const validateOrder = async (details, actions) => {
        let response ,orderStatus;
        try {
            response = await fetch(`/api/v1/order/status/${props.order.id}`,
            {
                method:'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Credentials': 'true',
                    'Access-Control-Allow-Methods' : 'GET, POST, OPTIONS',
                },
                credentials: 'include',
                mode: 'cors'
            });
        
            orderStatus = await response.json();
            orderStatus = orderStatus.data;
        
            if (response.status === 401 ) {                
                window.location.reload();
                //return actions.resolve();
            }
            else {
                if (orderStatus.toLowerCase() === 'expired') {
                    return actions.reject();
                }
                else {
                    return actions.resolve();
                }
                
            }
        }
        catch {
            props.setError();
        }
         
       
    }

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
            {/* <Link style={{display: 'flex', width: '100%', justifyContent: 'center', textDecoration: 'none', marginTop: '10px'}} to="/checkout/shippingaddress"><Button type="secondary">Procced To Payment</Button></Link> */}
            {props.sdkReady && props.order.paymentStatus === 'Payment Pending' ? <PayPalButton
                 currency='CAD'
                 amount={props.order.totalQuantity}
                 style={{color: 'blue', label:'pay'}}
                 shippingPreference="NO_SHIPPING"
                 onClick={validateOrder}
                 onCancel={(details, actions) =>{paymentStatusHandler(details, actions, null, 'Failed')}}
                 onError={(error) =>{paymentStatusHandler(null, null, 'Failed')}}
                 onSuccess={paymentStatusHandler}
            />: <p style={{color: '#0f7c90', textAlign: 'center', fontWeight: 400, fontSize: '1.2rem'}}>{props.order.paymentStatus}<br/>{props.order.paymentStatus === 'Payment Successfull' ? `Order Placed` : null}</p>}
        </div>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
      setError: () => dispatch({type: 'SET_GLOBAL_ERROR'})
    }
  }

export default connect(null, mapDispatchToProps)(PriceSummarySection);
