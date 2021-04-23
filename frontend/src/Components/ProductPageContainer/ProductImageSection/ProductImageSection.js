import React from 'react';
import classes from './ProductImageSection.module.css';

const ProductImageSection = (props) => {
    return (
        <div className={classes.ProductImageSection}>
            <div className={classes.ImageContainer}>
                <img src={`http://localhost:3001/images/${props.imageSource}`} alt={props.productName + ' image'} />
            </div>
        </div>
    );
} 

export default ProductImageSection;