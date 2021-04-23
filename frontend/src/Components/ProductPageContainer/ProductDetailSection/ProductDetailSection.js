import React from 'react';
import classes from './ProductDetailSection.module.css';
import Button from '../../UI/Button/Button';
import QuantityControl from '../../UI/QuantityControl/QuantityControl';

const ProductDetailSection = (props) => {

    let priceElement = <p className={classes.MrpText}> MRP: {`${props.product.mrp.symbol} ${props.product.mrp.value}`}</p>;

     if(props.product.price.value <  props.product.mrp.value) {
         priceElement = <div className={classes.PriceDetails}>
             <p className={classes.MrpText}><span className={classes.CrossText}>MRP: {`${props.product.mrp.symbol} ${props.product.mrp.value}`}</span></p>
             <p className={classes.DiscountClass}> Price: {`${props.product.price.symbol} ${props.product.price.value}`}</p>
         </div>
     }

    return (
        <div className={`${classes.ProductDetailSection}`}>
            <h1>{props.product.name}</h1>
            {priceElement}
            <p style={{marginTop: '5px', marginBottom: '25px'}}>Quantity: {`${props.product.quantity.value} ${props.product.quantity.unit}`}</p> 
            <div className={classes.ButtonAdjust}>
                {
                    props.cartQuantity > 0 && props.product.stockQuantity > 0 && props.cartQuantity <= props.product.stockQuantity  ? <div style={{width:'290px'}}><QuantityControl value={props.cartQuantity} onClickIncrease={props.onClickIncrease} onClickDecrease={props.onClickDecrease}/></div>: 
                    props.product.stockQuantity <= 0 ? <p className={classes.stockOut}>Out of Stock</p> : <div style={{width: '50%'}}><Button type='secondary' onClickHandler={props.addToCartHandler}>Add to Cart</Button></div>
                }
            </div>
            <div className={classes.GeneralInfoSection}>
                <p className={classes.GeneralInfoHeading}>General Information</p>
                <ul>
                    <li>
                        <p><span style={{display:'inline-block', width: '60%'}}>Brand</span> <span className={classes.InfoValues}>{props.product.brand}</span></p>
                    </li>
                    <li>
                        <p><span style={{display:'inline-block', width: '60%'}}>Type</span> <span className={classes.InfoValues}>{props.product.categories[0]}</span></p>
                    </li>
                    <li>
                        <p><span style={{display:'inline-block', width: '60%'}}>Organic</span> <span className={classes.InfoValues}>{props.product.organic}</span></p>
                    </li>
                    <li>
                        <p><span style={{display:'inline-block', width: '60%'}}>Food Preferance</span> <span className={classes.InfoValues}>{props.product.foodPreferance}</span></p>
                    </li>
                    <li>
                        <p><span style={{display:'inline-block', width: '60%'}}>Items in Stock</span> <span className={classes.InfoValues}>{props.product.stockQuantity}</span></p>
                    </li>
                </ul>
            </div>
        </div>
        
    );
}

export default ProductDetailSection;