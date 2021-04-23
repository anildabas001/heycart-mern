import React, {memo} from 'react';
import classes from './ProductsSection.module.css';
import ProductCard from '../../UI/ProductCard/ProductCard';

const ProductsSection = (props) => {

    return (
        <div className= {classes.ProductsSection}>
            <p className={classes.ProductHeading}>{props.pageHeading}</p>
            {
              props.productList.length > 0 ?   <div className={classes.productList}>
              {props.productList.map(product => <ProductCard key ={product.id} product={{
                      name: product.name,
                      mrp: product.mrp,
                      price: product.price,
                      discount: product.discountPercentage,
                      images: product.images,
                      id: product.id,
                      quantity: product.quantity,
                      stockQuantity: product.stockQuantity,
  
                }}/>)}
  
              </div> :
              <p style={{color: '#c1272d', fontWeight: 400}}>No Items Found. More products coming soon...</p>
            }
            
        </div>
    );
}

export default memo(ProductsSection);
