import React,{useEffect} from 'react';
import {connect} from 'react-redux'
import CartProductSection from '../../Components/CartProductSection/CartProductSection';
import CartSummary from '../../Components/CartSummary/CartSummary'
import CartContainer from '../../Components/UI/CartContainer/CartContainer';
import {updateCart, updateCartDb} from '../../Store/Actions/CartAction';

const Cart = (props) => {
    document.title = 'Shopping Cart';
    let totalPrice = 0;
    let totalQuantity = 0;
    let symbol = '$';

    if(props.cart.products.length > 0) {
        totalPrice = props.cart.totalPrice.toFixed(2);
        symbol = props.cart.products[0].product.price.symbol;
        totalQuantity = props.cart.totalQuantity.toFixed(2);
    }

    const removeItem = (event, product) => {
        event.preventDefault();
        if (props.isLoggedin) {
            props.updateCartDb(product.product.id, 0);
        }
        else {
            props.updateCart(product.product, 0);
        }
    }

    useEffect(() => {

    }, [])

    return (
    <CartContainer>        
        <h1 style={{fontWeight: 400, fontSize: '2.6rem', borderBottom: '1px solid #eee', padding: '5px', marginBottom: '20px'}}>My Cart</h1>
        <CartProductSection removeItem={removeItem} products={props.cart.products}/>
        <CartSummary symbol={symbol} totalPrice={totalPrice} totalQuantity={totalQuantity}/>
    </CartContainer>
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
        updateCart: (product, quantity) => dispatch(updateCart(product, quantity)),
        updateCartDb: (productId, quantity) => dispatch(updateCartDb(productId, quantity)),
        resetOrder: () => dispatch({type: 'RESET_ORDER'})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);