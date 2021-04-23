import React, {useState, useEffect} from 'react';
import MyOrderContainer from '../../Components/MyOrderDetails/MyOrderContainer';
import Loader from '../../Components/UI/Loader/Loader';
import {connect} from 'react-redux';

const MyOrderSummary = (props) => {    
    const orderId = props.match.params.orderId;    
    document.title = 'Order Summsry - '+ orderId;
    
    const [loader, setLoader] = useState(true);
    const [orderDetails, updateOrderDetails] = useState(null);
    
    useEffect(() => {
        fetch(`/api/v1/order/${orderId}`,
        {
            method:'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': 'true',
                'Access-Control-Allow-Methods' : 'GET, POST, OPTIONS',
            },
            credentials: 'include',
            mode: 'cors'
        }).then(response => response.json())
        .then(response => {
            if(response.status === 'success') {
                updateOrderDetails(response.data);
            }
            else {
                props.setError();
            }
            setLoader(false);
        }).catch(err => props.setError())
    }, []);

    return(
        <>
            {loader ? <Loader /> : <MyOrderContainer order={orderDetails}/>}
        </>        
    );
}



const mapDispatchToProps = (dispatch) => {
    return {
      setError: () => dispatch({type: 'SET_GLOBAL_ERROR'})
    }
  }

export default connect(null, mapDispatchToProps)(MyOrderSummary);