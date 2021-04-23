import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom'
import Button from '../Button/Button';
import classes from './ProductCard.module.css';
import slugify from 'slugify';
import QuantityControl from '../QuantityControl/QuantityControl';
import {connect} from 'react-redux';
import {updateCart, updateCartDb} from '../../../Store/Actions/CartAction';

const ProductCard = (props) => {
    
    let initialQuantity = -1;    
    const [cartQuantity, updateCartQuantity] = useState(initialQuantity); 

    const onClickDecrease = (event) => {
        event.preventDefault();        
        event.stopPropagation();
        setTimeout(() => {
            updateCartQuantity(state => {
                if (state > 0) {
                    state = state - 1;             
                }
                return state;            
            });
        },300)        
    }

    const onClickIncrease = (event) => {
        event.preventDefault();        
        event.stopPropagation();
        setTimeout(() => {
            updateCartQuantity(state => {
                if (state < props.product.stockQuantity) {
                    state = state + 1;
                }
                return state;  
            });
        },300)         
    }

    const addToCartHandler = (event) => {
        event.preventDefault();
        event.stopPropagation();
        updateCartQuantity(1);
    }

    const filterPrice = (price) => {
        return price.toFixed(2);
    }

    const filterName = (name) => {
        if(name.length < 14) {
            return name;
        }
        else {
            let nameArray = name.split('');
            let updatedName = nameArray.map((char, index) => {
                if(index < 14) {
                    return char;
                }
                else if (index === 14){
                    return '...';
                }
            });
            return updatedName.join('');
        }
    }

    useEffect(() => {        
        if (cartQuantity != -1 && props.isLoggedin) {
            props.updateCartDb(props.product.id, cartQuantity);
        }
        else if (cartQuantity != -1) {
            props.updateCart({
                id: props.product.id, 
                name: props.product.name,
                price: props.product.price,
                quantity: props.product.quantity,
                images: props.product.images
            }, cartQuantity);
        }
        
    }, [cartQuantity]);

    // useEffect(() => {
    //     if (cartQuantity != -1) {
    //         props.updateCart({
    //             id: props.product.id, 
    //             name: props.product.name,
    //             price: props.product.price,
    //             quantity: props.product.quantity
    //         }, cartQuantity);
    //     }
        
    // }, [cartQuantity]);

    useEffect(() =>{
        const currentProduct = props.cartProducts ? props.cartProducts.filter(cartProduct => cartProduct.product.id === props.product.id): null;
        
        if (currentProduct && currentProduct.length > 0) {
            updateCartQuantity(currentProduct[0].quantity) ;
        }

    }, [props.cartProducts]);


    let priceValue =  <span className={classes.Mrp}>Price: ${filterPrice(props.product.mrp.value)}</span>

    if(props.product.discount > 0) {
        priceValue = <>Price: <span className={[classes.MrpPrice, classes.Invalid].join(' ')}> ${filterPrice(props.product.mrp.value)}</span><span className={classes.DiscountPrice}>${filterPrice(props.product.price.value)}</span> </>;  
    }
    return(
        <Link
            to={{
                pathname: `/product/${slugify(props.product.name)}/${props.product.id}`,
                state: { id: props.product.id}
            }}>
            <div className={classes.ProductCard}>
                <div className={classes.ProductImage}>
                    <img src={`/images/${props.product.images[0]}`} alt={props.product.name + 'image'}></img>
                    <p className={classes.ProductName}>
                        {filterName(props.product.name)}
                    </p>
                </div>
                <div className={classes.ProductInfo}>                
                    <p className={classes.ProductPrice}>
                        {priceValue}
                    </p>
                    <p className={classes.ProductQuantity}>
                        Quantity:{ props.product.quantity.value}{props.product.quantity.unit}
                    </p>
                
                </div>
                <div style={{minHeight: '30px'}}>
                    {
                        cartQuantity > 0 && props.product.stockQuantity > 0 && props.product.stockQuantity >= cartQuantity  ? <QuantityControl value={cartQuantity} onClickIncrease={onClickIncrease} onClickDecrease={onClickDecrease}/> : 
                        props.product.stockQuantity <= 0 ? <p className={classes.stockOut}>Out of Stock</p> : <Button onClickHandler={addToCartHandler}>Add to Cart</Button>
                    }
                </div>                
        </div>
        </Link>
    );
}

const mapDispatchToProps = (dispatch => {
    return {
        updateCart: (product, quantity) => dispatch(updateCart(product, quantity)),
        updateCartDb: (productId, quantity) => dispatch(updateCartDb(productId, quantity))
    }
});

const mapStateToProps = (state => {
    return { 
        cartProducts: state.cartData.products,
        isLoggedin: state.authentication.isLoggedin
    }    
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductCard);
