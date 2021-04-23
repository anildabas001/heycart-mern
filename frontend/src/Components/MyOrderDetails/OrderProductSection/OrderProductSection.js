import React from 'react';
import classes from './OrderProductSection.module.css';

const OrderProductSection = (props) => {     
    const ShippingAddress = props.order.shippingAddress;

    return (<>
    {   props.order.shippingAddress ?
        <div className={classes.OrderProductsSection}>
            <div className={classes.ShippingAddress}>
                <h2>Shipping Address</h2>
                <p className={classes.Keys}>Name:</p>
                <p className={classes.Values}>{ShippingAddress.name}</p>
                <p className={classes.Keys}>Email:</p>
                <p className={classes.Values}>{ShippingAddress.email}</p>
                <p className={classes.Keys}>Deliver Address: </p>
                <p> {ShippingAddress.address} </p>               
                <p>{ShippingAddress.city}, {ShippingAddress.province}</p>
                <p>{ShippingAddress.zip}, {ShippingAddress.country}</p>
            </div>
            <div className={classes.ItemsSection}>
                <h2>Grocery Items</h2>
                <p className={classes.Error}>{props.order.error}</p>
                <div>
                    <table className={classes["responsive-table"]}>
                        <thead>
                          <tr>
                            <th>Item</th>
                            <th>Quantity</th>
                            <th>Price</th>
                          </tr>
                        </thead>
                        <tbody>
                            {
                                props.order.products.map((orderProduct) => <tr key={orderProduct.product.id}>
                                    <td data-label="Item">{orderProduct.product.name}</td>
                                    <td data-label="Quantity">{orderProduct.quantity}</td>
                                    <td data-label="Price">{orderProduct.product.price.symbol}{(orderProduct.quantity * orderProduct.product.price.value).toFixed(2)}</td>
                                </tr>)
                            }   
                        </tbody>
                    </table>
                </div>                
            </div>
        </div>
    : null }</>
    );
}

export default OrderProductSection;