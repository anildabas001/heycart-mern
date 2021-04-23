import React, {useState, useEffect} from 'react';
import OrdersContainer from '../../Components/UI/OrdersContainer/OrdersContainer';
import OrderList from '../../Components/OrderList/OrderList';
import Loader from '../../Components/UI/Loader/Loader';
import {connect} from 'react-redux';
import { Redirect } from 'react-router-dom';

const Order = (props) => {
    DocumentFragment.title= 'My Orders';
    const [orders, updateOrders] = useState([]);
    const [showLoader, updateShowLoader] = useState(true);

    useEffect(() => {
        fetch(`/api/v1/order`,
        {
            method:'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'http://127.0.0.1:3000',
                'Access-Control-Allow-Credentials': 'true',
                'Access-Control-Allow-Methods' : 'GET, POST, OPTIONS',
            },
            credentials: 'include',
            mode: 'cors'
        }).then(response => response.json())
        .then(response => {
            if (response.status === 'success') {   
                updateOrders(response.data);                
                updateShowLoader(false);
            }
            // else {
            //     props.setError();
            // }
            updateShowLoader(false);
        })
        .catch((err) => props.setError())
    }, []);

    let element = showLoader ? <Loader/> : 
    <OrdersContainer>
        <OrderList orders={orders}/>
    </OrdersContainer>   

    if(!props.isLoggedin) {
        element = <Redirect to={`/login?redirectTo=/myprofile`} />
    }

    return (
        <>
        {
            element
        }
        </>  
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
      setError: () => dispatch({type: 'SET_GLOBAL_ERROR'})
    }
}

const mapStateToProps = (state) => {
    return {
      isLoggedin: state.authentication.isLoggedin
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Order);
