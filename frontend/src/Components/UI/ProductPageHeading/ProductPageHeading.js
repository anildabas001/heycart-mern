import React from 'react';
import ProductDescription from '../../ProductPageContainer/ProductDescription/ProductDescription';
import classes from './ProductPageHeading.module.css';

const ProductPageHeading = (props) => {
    return (
        <h1 className={classes.ProductPageHeading}>{props.heading}</h1>
    );
}

export default ProductPageHeading;