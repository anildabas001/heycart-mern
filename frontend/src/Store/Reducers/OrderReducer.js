
let initialState = {
    id: null,
    products: [],
    shippingAddress: null,
    totalPrice: 0, 
    totalQuantity: 0,
    error: '',
    orderInitiated: false,
    deliveryStatus: '',
    paymentStatus: '',
    createdOn:''
}

if(localStorage.getItem('order')) {
    let currentOrderState = {...JSON.parse(localStorage.getItem('order'))};    
    initialState = currentOrderState;        
}

const orderReducer = (state=initialState, action) => {
    let updatedOrder = null;
    switch(action.type) {
        case 'INITIATE_ORDER': 
        updatedOrder = {
            ...state,
            orderInitiated: true
        }
        localStorage.setItem('order', JSON.stringify(updatedOrder));
        return updatedOrder;

        case 'UPDATE_ORDER_WITH_CART':
            updatedOrder= {
                id: null,
                products: [],
                shippingAddress: null,
                totalPrice: 0, 
                totalQuantity: 0,
                error: ''
            };
            if (action.cart) {
                updatedOrder={
                    ...updatedOrder,
                    totalQuantity: action.cart.totalQuantity,
                    totalPrice: action.cart.totalPrice,
                    products: action.cart.products.map((product) => {return {...product}})
                } 
            }
            localStorage.removeItem('order');
            localStorage.setItem('order', JSON.stringify(updatedOrder));
            return {...updatedOrder};

            case 'UPDATE_SHIPPING_ADDRESS':
            const shippingAddress = {
                name: action.shippingAddress.name,
                email: action.shippingAddress.email,
                address: action.shippingAddress.address,
                city: action.shippingAddress.city,
                province: action.shippingAddress.province,
                zip: action.shippingAddress.zip,
                country: action.shippingAddress.country
            }
            updatedOrder = {
                ...state,
                shippingAddress: {...shippingAddress}
            } 

            localStorage.setItem('order', JSON.stringify(updatedOrder));
            return {...updatedOrder};            

            case 'CREATE_ORDER_DB':                
                updatedOrder = {
                    ...state,   
                    id: action.order.id,
                    shippingAddress: {...action.order.shippingAddress},
                    products: [...action.order.products],
                    totalPrice: action.order.totalPrice, 
                    totalQuantity: action.order.totalQuantity,
                    error: '',
                    deliveryStatus: action.order.deliveryStatus,
                    paymentStatus: action.order.paymentStatus,
                    createdOn: action.order.createdOn,
                    orderStatus: action.order.orderStatus
                }
                localStorage.setItem('order', JSON.stringify(updatedOrder));
                return {...updatedOrder};

            case 'SYNC_ORDER_FROM_DB' :
                updatedOrder ={
                    ...state,
                    id: action.order.id,
                    shippingAddress: {...action.order.shippingAddress},
                    products: [...action.order.products],
                    totalPrice: action.order.totalPrice, 
                    totalQuantity: action.order.totalQuantity,
                    error: '',
                    deliveryStatus: action.order.deliveryStatus,
                    paymentStatus: action.order.paymentStatus,
                    createdOn: action.order.createdOn,
                    orderStatus: action.order.orderStatus
                }
                localStorage.setItem('order', JSON.stringify(updatedOrder));
                return {...updatedOrder};

            case 'UPDATE_ORDER_STATUS': 
                updatedOrder = {
                    ...state,
                    orderStatus: action.order.orderStatus,
                    deliveryStatus: action.order.deliveryStatus,
                    paymentStatus: action.order.paymentStatus
                }
                localStorage.setItem('order', JSON.stringify(updatedOrder));
                return updatedOrder;

            case 'RESET_ORDER' :
                updatedOrder = {
                    id: null,
                    products: [],
                    shippingAddress: null,
                    totalPrice: 0, 
                    totalQuantity: 0,                    
                    orderInitiated: false,
                    orderStatus: '',
                    deliveryStatus: '',
                    paymentStatus: '',
                    createdOn:''
                }
                localStorage.setItem('order', JSON.stringify(updatedOrder));
                return updatedOrder;

            case 'SET_ERROR' :               
                
            updatedOrder =  {
                    ...state,
                    error: action.message
                }     

                localStorage.setItem('order', JSON.stringify(updatedOrder));
                return updatedOrder;

        default: 
            return state;
        
    }
}

export default orderReducer;