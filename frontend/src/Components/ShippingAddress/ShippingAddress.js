import React, {useState, useEffect} from 'react';
import classes from './ShippingAddress.module.css';
import Button from '../UI/Button/Button';
import {updateOrderAddress} from '../../Store/Actions/OrderActions';
import {connect} from 'react-redux';
import {fieldChangeHandler, formSubmitHandler} from '../../utils/forms';
import ErrorField from '../UI/ErrorField/ErrorField';

const ShippingAddress = (props) => {
    const [formError, setFormError] = useState('');
    const [nameState, setNameState] = useState({        
        showErrorMessage: false,
        value: props.shippingAddress ? props.shippingAddress.name  : '',
        errorMessage: ['Name required'],
        isValid: props.shippingAddress? true : false,
        isTouched: props.shippingAddress? true : false,
        validate: {
            required: [true, 'Name required']
        }
    });

    const [emailState, setEmailState] = useState({        
        showErrorMessage: false,
        value: props.shippingAddress ? props.shippingAddress.email  : '',
        errorMessage: ['Email required'],
        isValid: props.shippingAddress? true : false,
        isTouched: props.shippingAddress? true : false,
        validate: {
            required: [true, 'Email required'],
            email: [true, 'Invalid Email Format']
        }
    });

    const [addressState, setAddressState] = useState({        
        showErrorMessage: false,
        value: props.shippingAddress ? props.shippingAddress.address  : '',
        errorMessage: ['Address required'],
        isValid: props.shippingAddress? true : false,
        isTouched: props.shippingAddress? true : false,
        validate: {
            required: [true, 'Address required']
        }
    });

    const [cityState, setCityState] = useState({
        showErrorMessage: false,
        value: props.shippingAddress ? props.shippingAddress.city  : '',
        errorMessage: ['City required'],
        isValid: props.shippingAddress? true : false,
        isTouched: props.shippingAddress? true : false,
        validate: {
            required: [true, 'City required']
        }
    });

    const [zipState, setZipState] = useState({
        showErrorMessage: false,
        value: props.shippingAddress ? props.shippingAddress.zip  : '',
        errorMessage: ['Zip required'],
        isValid: props.shippingAddress? true : false,
        isTouched: props.shippingAddress? true : false,
        validate: {
            required: [true, 'Zip required']
        }
    });

    useEffect(() => {
        if (props.cart.totalQuantity < 1 && !props.order.orderInitiated) {
            props.history.push('/cart');
        }
    }, []);

    const formSubmitAction = () => {         
        props.updateOrderAddress(nameState.value, emailState.value, addressState.value, cityState.value, zipState.value);
        props.history.push('/checkout/ordersummary');
    };

    return (        
        <div className={classes.ShippingAddress}>
            <h1>Shipping Address</h1>
            <form className={classes.form} onSubmit={(evnt)=>{formSubmitHandler([{nameState, setNameState}, {emailState, setEmailState}, {addressState, setAddressState}, {cityState, setCityState}, {zipState, setZipState}], formSubmitAction, evnt)}}>                    
                <label className={classes["field"]}>
                  <span className={classes["field__label"]} htmlFor="name">name</span>
                  <input className={classes["field__input"]} type="text" id="name" value={nameState.value} onChange = {(eve) => {fieldChangeHandler(nameState, setNameState, eve)}} />
                </label>
                {nameState.errorMessage.length > 0 && nameState.showErrorMessage ? <ErrorField>{nameState.errorMessage}</ErrorField>: null}
                <label className={classes["field"]}>
                  <span className={classes["field__label"]} htmlFor="email">Email</span>
                  <input className={classes["field__input"]} type="text" id="email" value={emailState.value} onChange = {(eve) => {fieldChangeHandler(emailState, setEmailState, eve)}} />
                </label>
                {emailState.errorMessage.length > 0 && emailState.showErrorMessage ? <ErrorField>{emailState.errorMessage}</ErrorField>: null} 
                <label className={classes["field"]}>
                  <span className={classes["field__label"]} htmlFor="address">Address</span>
                  <input className={classes["field__input"]} type="text" id="address" value={addressState.value} onChange = {(eve) => {fieldChangeHandler(addressState, setAddressState, eve)}} />
                </label>  
                {addressState.errorMessage.length > 0 && addressState.showErrorMessage ? <ErrorField>{addressState.errorMessage}</ErrorField>: null}               
                <div className={`${classes["fields"]} ${classes["fields--2"]}`}>
                    <div>
                        <label className={classes["field"]}>
                            <span className={classes["field__label"]} htmlFor="city">City</span>
                            <input className={classes["field__input"]} type="text" id="city" value={cityState.value} onChange = {(eve) => {fieldChangeHandler(cityState, setCityState, eve)}} />
                        </label>
                        {cityState.errorMessage.length > 0 && cityState.showErrorMessage ? <ErrorField>{cityState.errorMessage}</ErrorField>: null}     
                    </div>
                    <div>
                        <label className={classes["field"]}>                      
                            <span className={classes["field__label"]} htmlFor="zipcode">Zip code</span>
                            <input className={classes["field__input"]} type="text" id="zipcode" value={zipState.value} onChange = {(eve) => {fieldChangeHandler(zipState, setZipState, eve)}} />   
                        </label>
                        {zipState.errorMessage.length > 0 && zipState.showErrorMessage ? <ErrorField>{zipState.errorMessage}</ErrorField>: null}     
                    </div> 
                </div>   
                <div className={`${classes["fields"]} ${classes["fields--2"]}`}>
                    <label className={classes["field"]}>
                        <span className={classes["field__label"]} htmlFor="province">Province</span>
                        <input disabled className={classes["field__input"]} type="text" id="province" value={props.shippingAddress ? props.shippingAddress.province : 'Ontario'}/>
                    </label>
                    <label className={classes["field"]}>
                        <span className={classes["field__label"]} htmlFor="country">Country</span>
                        <input disabled className={classes["field__input"]} type="text" id="country" value={props.shippingAddress ? props.shippingAddress.country : 'Canada'}/>
                    </label>
                </div>    
                <p style={{fontSize: '0.8rem', color: '#c1272d', textAlign: 'center'}}>{formError}</p>
                <div style={{display: 'flex', width:'76%', margin: '0 auto', marginBottom: '10px', justifyContent: 'center'}}><Button style={{margin: '0 auto'}} type='secondary'>Continue</Button></div> 
            </form>
        </div>        
    );
}

const mapStateToProps = (state) => {
    return {
        cart: state.cartData,
        order: state.order,
        shippingAddress: state.order.shippingAddress,
        orderId: state.order.id
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateOrderAddress: (name, email, address, city, zip) => dispatch(updateOrderAddress({name, email, address, city, zip}))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ShippingAddress);