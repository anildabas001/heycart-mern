import React from 'react';
import classes from './ProductDescription.module.css';
import CollapsibleControl from '../../UI/CollapsibleControl/CollapsibleControl';

const ProductDescription = (props) => {
    return (
        <div className={`${classes.ProductDescription} ${classes.Clearfix}`}>
            <CollapsibleControl title={<p style={{fontSize: '1.4rem', fontWeight: '400'}}>Description</p>}>
                <p style={{paddingBottom: '20px'}}>{props.description}</p>
            </CollapsibleControl>
        </div>
    );
}

export default ProductDescription;