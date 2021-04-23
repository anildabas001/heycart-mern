
export const updateOrderAddress = (shippingAddress) => {
    return (dispatch, getState) => {
        const currentOrder = getState().order;

        if (currentOrder.id) {            
            fetch(`/api/v1/order/${currentOrder.id}`,
            {
                method:'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Credentials': 'true',
                    'Access-Control-Allow-Methods' : 'GET, POST, OPTIONS',
                },
                credentials: 'include',
                mode: 'cors',
                body: JSON.stringify({
                    shippingAddress
                })
            }).then(response => response.json())
            .then(response => {
                if (response.status === 'success') {                           
                    const updatedShippingAddress = response.data.shippingAddress;
                    dispatch({type: 'UPDATE_SHIPPING_ADDRESS', shippingAddress: updatedShippingAddress});
                }
                else {
                    dispatch({type: 'SET_GLOBAL_ERROR'});
                }
                
            })
            .catch((err) => dispatch({type: 'SET_GLOBAL_ERROR'}));  
        } 
        else {
            dispatch({type: 'UPDATE_SHIPPING_ADDRESS', shippingAddress: shippingAddress});
        }   
    }
};

export const createOrderDB = (shippingAddress) => {
    return (dispatch, getState) => {
        const orderId = getState().order.id;
        if(!orderId) {
            fetch(`/api/v1/order`,
            {
                method:'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Credentials': 'true',
                    'Access-Control-Allow-Methods' : 'GET, POST, OPTIONS',
                },
                credentials: 'include',
                mode: 'cors',
                body: JSON.stringify({
                    shippingAddress: shippingAddress
                })
            }).then(response => response.json())
            .then(response => {
                if (response.status === 'success') {                           
                    dispatch({type: 'CREATE_ORDER_DB', order: response.data});
                }
                else {
                    dispatch({type: 'SET_GLOBAL_ERROR'});
                }
            }).catch((err) => {dispatch({type: 'SET_GLOBAL_ERROR'});} )
        }  
    }    
};

export const getOrder = (orderId) => {
    return (dispatch) => {
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
                if (response.status === 'success') {                         
                    dispatch({type: 'SYNC_ORDER_FROM_DB', order: response.data});
                }
                else {
                    dispatch({type: 'RESET_ORDER'})
                }
            }).catch((err) => {dispatch({type: 'SET_GLOBAL_ERROR'});} )
    }
}