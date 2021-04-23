import React from 'react';
import classes from './Order.module.css';
import {Link} from 'react-router-dom';

const Order = (props) => {
    return (
        <Link style={{color: '#222', textDecoration: 'none'}} to={`/myorder/${props.order.id}`}>        
            <div className={classes.Order}>
                <div>                
                    <p style={{fontWeight: 400, fontSize: '1.1em'}}>Order Number: {props.order.id}</p>
                    <p style={{marginTop: '10px', backgroundColor:'#03DAC6', fontWeight: 400}}>Order Status: {props.order.orderStatus}</p>
                    <p style={{backgroundColor:'#03DAC6', fontWeight: 400}} >Delivery Status: {props.order.deliveryStatus}</p>
                    <p style={{backgroundColor:'#03DAC6', fontWeight: 400}}>Payment Status: {props.order.paymentStatus}</p>
                </div>
                <p style={{marginTop: '15px'}}>Order Placed on: {new Date(props.order.createdAt).toLocaleString()}</p>
            </div>            
        </Link>
    );
}

export default Order;