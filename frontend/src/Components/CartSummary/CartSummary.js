import React, {useState} from 'react';
import Button from '../../Components/UI/Button/Button';
import {Link} from 'react-router-dom';
import classes from './CartSummary.module.css';
import {connect} from 'react-redux';
import ErrorField from '../UI/ErrorField/ErrorField';

const CartSummarySection = (props) => {

    const [checkoutError, setCheckoutError] = useState('');

    const cartCheckoutHandler = (event) => {
        if (props.cart.totalQuantity < 1) {
            event.preventDefault();
            setCheckoutError('Please add items to the cart before chekingout')
        }
        else { 
            props.resetOrder();        
            props.initiateOrder();
            setCheckoutError('');
        }
    }

    return(<div className={classes.SummarySection}>
            <div className={classes.CartSummarySection}>
                <h4>Cart Summary</h4>
                <div className={classes.SummaryBox}>
                    <div><p className={classes.Point}>Items in Cart</p><p className={classes.Value}>{Math.trunc(props.totalQuantity)}</p></div>
                    <div><p className={classes.Point}>Sub total</p><p className={classes.Value}>{props.symbol}{props.totalPrice}</p></div>
                    <div><p className={classes.Point}>Delivery Fee</p><p className={classes.Value}>{props.symbol}0</p></div>
                    <div style={{fontWeight: 400}}><p className={classes.Point}>Total Amount</p><p className={classes.Value}>{props.symbol}{props.totalPrice}</p></div>                
                </div>
            </div> 
            <div style={{margin: '5px 0px'}}> <ErrorField>{checkoutError}</ErrorField></div> 
            <Link onClick={cartCheckoutHandler} style={{display: 'flex', width: '100%', justifyContent: 'center', textDecoration: 'none', marginTop: '10px'}} to="/checkout/shippingaddress"><Button onClick={cartCheckoutHandler} type="secondary">Checkout</Button></Link>
        </div>
    );
}


const mapStateToProps = (state) => {
    return {
        cart: state.cartData,
        isLoggedin: state.authentication.isLoggedin       
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        resetOrder: () => dispatch({type: 'RESET_ORDER'}),
        initiateOrder: () =>  dispatch({type: 'INITIATE_ORDER'})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartSummarySection);

//export default CartSummarySection;