import React from 'react';
import classes from './ProductPageContainer.module.css';

const ProductPageContainer = (props) => {
    return (
        <div className={`${classes.ProductPageContainer}`}>
            {props.children}
        </div>
    );
}

export default ProductPageContainer;