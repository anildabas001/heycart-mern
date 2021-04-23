import React, {useEffect} from 'react';
import CheckoutContainer from '../../Components/UI/CheckoutContainer/CheckoutContainer';
import ShippingAddress from '../../Components/ShippingAddress/ShippingAddress';
import OrderSummary from '../../Components/OrderSummary/OrderSummary';
import {Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import PageNotFound from '../../Components/PageNotFound/PageNotFound';

const Checkout = (props) => {
    document.title = 'Checkout';
    let checkoutElement = <CheckoutContainer>
    <Switch >
     <Route path='/checkout/shippingaddress' exact component={ShippingAddress}/>
     <Route path='/checkout/ordersummary' exact component={OrderSummary}/>
     <Route path='/checkout/*' exact component={PageNotFound} />
    </Switch>        
    </CheckoutContainer>;

    useEffect(() => {   
        if (!props.isLoggedin) {
            props.history.push(`/login?redirectTo=${encodeURIComponent('/checkout/shippingaddress')}`);       
        }
        else { 
            if (props.cart.totalQuantity < 1 && !props.order.orderInitiated) {
                props.history.push('/cart');
            }
        }
    }, [props.isLoggedin, props.order.orderInitiated, props.cart.totalQuantity]);

    useEffect(() => {
        props.initiateOrder();
    }, []);    


    return (
        <>
            {checkoutElement}
        </>   
    );
};

const mapStateToProps = (state) => {
    return( {
        isLoggedin: state.authentication.isLoggedin,
        cart: state.cartData,
        order:  state.order
    });
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateOrderProducts: (cart) => dispatch({type: 'UPDATE_ORDER_WITH_CART', cart}),
        initiateOrder: () =>  dispatch({type: 'INITIATE_ORDER'})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);