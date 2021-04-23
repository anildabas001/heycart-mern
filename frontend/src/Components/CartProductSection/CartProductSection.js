import React from 'react';
import CartProductCard from './CartProductCard/CartProductCard';
import classes from './CartProductSection.module.css';


const CartProductSection = (props) => {
    return (
    <div className={classes.CartProductSection}>
        
        {props.products.length > 0 ?<div className={classes.CartItemsBox}> {props.products.map((product) => <CartProductCard removeItem={props.removeItem} key={product.id} cartProduct = {product}/>)}</div>  : 
        <p style={{color: '#c1272d', fontSize: '1.2rem', fontWeight: 400}}>No items in the Cart.<br/>Fill your cart with happiness.</p>}        
               
    </div>
    );
}

export default CartProductSection;