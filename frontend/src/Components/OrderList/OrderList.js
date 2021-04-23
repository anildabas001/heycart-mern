import React from 'react';
import Order from './Order/Order';

const OrderList = (props) => {
    return(
        <>
            {props.orders.length > 0 ? <div style={{border: '1px solid rgb(238, 238, 238)', borderTop: 'none'}}>
                {props.orders.map(singleOrder => <Order key={singleOrder.id} order={singleOrder}/>)}
            </div>
             : <p style={{color: 'rgb(193, 39, 45)', fontSize: '1.2rem', fontWeight: 400}}>You have no orders.</p>}
        </>         
    );
}

export default OrderList;