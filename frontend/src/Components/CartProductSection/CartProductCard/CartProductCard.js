import React from 'react';
import classes from './CartProductCard.module.css';
import { AiOutlineClose } from "react-icons/ai";
import slugify from 'slugify';
import {Link} from 'react-router-dom';

const filterName = (name) => {
    if(name.length < 13) {
        return name;
    }
    else {
        let nameArray = name.split('');
        let updatedName = nameArray.map((char, index) => {
            if(index < 13) {
                return char;
            }
            else if (index === 13){
                return '...';
            }
        });
        return updatedName.join('');
    }
}

const CartProductCard = (props) => {
    return (
    <Link key={props.cartProduct.product.id} style={{textDecoration: 'none', color: '#222'}} to={`/product/${slugify(props.cartProduct.product.name)}/${props.cartProduct.product.id}`}>
        <div className={classes.CartProductCard}>
        
            <div className={classes.CardImage}>
                <img src={`http://127.0.0.1:3001/images/${props.cartProduct.product.images[0]}`} alt={`${props.cartProduct.product.images[0]} image`} />
            </div>
            <div className={classes.CardInfo}>
                <p className={classes.ProductName}>{filterName(props.cartProduct.product.name)}</p>
                <p className={classes.Price}>{props.cartProduct.product.price.symbol}{props.cartProduct.product.price.value}</p>
            </div>
            <div className={classes.Quantity}>
                <p>{props.cartProduct.quantity}</p>
            </div>
            <div>
                <AiOutlineClose className={classes.Cross} style={{cursor:'pointer'}} onClick={(event) => {props.removeItem(event, props.cartProduct)}} />
            </div>        
        </div>    
    </Link>
    );
}


export default CartProductCard;