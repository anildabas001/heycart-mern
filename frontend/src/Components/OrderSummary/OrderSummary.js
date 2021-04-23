import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import OrderProductsSection from './OrderProductsSection/OrderProductsSection';
import PriceSummarySection from './PriceSummarySection/PriceSummarySection';
import {createOrderDB, getOrder} from '../../Store/Actions/OrderActions';
import classes from './OrderSummary.module.css';
import Loader from '../UI/Loader/Loader';

const OrderSummary = (props) => {
    const [loaderState, setLoader] = useState(true);
    const [sdkReady, setSdkReady] = useState(false);

    const updateStatus = (order) => {
        props.updateOrderStatus(order);
    }

    useEffect(() => {   
        if (!props.order.id) {
            props.createOrderDB(props.order.shippingAddress);
        }
        else {
            props.getOrder(props.order.id);
        }
        
    }, []);

    useEffect(() => {
        const addPayPalScript = async() => {
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = `https://www.paypal.com/sdk/js?client-id=AbRkRCQw96KpU9iBfj0HlD9aL2TKdfeKwfl_jtDZhZkX2tkp6Chl8TnZc6Gj3YvsaAvWyJODdAM8thhG&components=buttons&disable-funding=credit,card&currency=CAD`;
            script.async = true;
            script.onload = () => {
                setSdkReady(true);
                props.order.id ? setLoader(false) : setLoader(true);
            }
            document.body.appendChild(script);
        }

        addPayPalScript();
    }, []);

    useEffect(() => {
        if (props.order.id) {
            setLoader(false);
        }
    }, [props.order])

    return (
        <>
            {
                loaderState ? <Loader /> : <div className={classes.OrderSummary}>
                    <h1>Order Summary</h1>
                    <OrderProductsSection order={props.order}/>
                    <PriceSummarySection setLoader={setLoader} updateStatus={updateStatus} sdkReady={sdkReady} order={props.order}/>
                </div> 
            }
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        order: state.order
    };
}

 const mapDispatchToProps = (dispatch) => {
     return {
         createOrderDB: (shippingAddress) => dispatch(createOrderDB(shippingAddress)),
         getOrder: (orderId) => dispatch(getOrder(orderId)),
         updateOrderStatus : (order) => dispatch({type: 'UPDATE_ORDER_STATUS', order: order})
     };
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderSummary);