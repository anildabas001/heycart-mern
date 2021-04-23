export const updateCart = (product, quantity) => {
    return (dispatch, getState) => {  
        let cartState = getState();
        cartState = cartState.cartData;
        cartState.totalQuantity = 0;
        cartState.totalPrice = 0;
        if (cartState && cartState.products.length > 0) {
            if (quantity > 0) {
                for(let i = 0; i < cartState.products.length; i++ ) {
                    if(cartState.products[i].product.id === product.id) {
                        cartState.products[i].quantity = quantity;
                        break;
                    }
                    else if (i === cartState.products.length -1) {
                        cartState.products.push({product, quantity});
                    }
                }
            }
            else {
                cartState.products = cartState.products.filter(cartProduct => cartProduct.product.id != product.id)
            }
    
            cartState.products.forEach(cartProduct => {
                cartState.totalQuantity = cartState.totalQuantity + cartProduct.quantity;
                cartState.totalPrice = cartState.totalPrice + (cartProduct.product.price.value * cartProduct.quantity);
            });
        }
        else {
            cartState.products.push({product, quantity});
            cartState.totalQuantity = quantity;
            cartState.totalPrice = quantity * product.price.value;
        }        
        
        localStorage.setItem('cart', JSON.stringify(cartState));
        dispatch({type: 'UPDATE_CART', cartState});
    }
}

export const syncCart = () => { 
    let localCart = null;

    if (localStorage.getItem('cart')) {
        localCart = JSON.parse(localStorage.getItem('cart'));
    }

    return async (dispatch, getState) => {
        if (localCart && localCart.products.length > 0) {            
            for (let i=0; i < localCart.products.length; i++) { 
                try {
                  const  response = await fetch(`/api/v1/user/cart`,
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
                          productId: localCart.products[i].product.id,
                          quantity: localCart.products[i].quantity
                      })
                  });
              
                  const syncedData = await response.json();
                  if (syncedData.status === 'error' || syncedData.status === 'fail') {
                      dispatch({type: 'SET_GLOBAL_ERROR'});
                  }  
                }
                catch {
                    dispatch({type: 'SET_GLOBAL_ERROR'});
                }
            }            
        }

        const response = await fetch(`/api/v1/user/cart`, {
            method:'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': 'true',
                'Access-Control-Allow-Methods' : 'GET, POST, OPTIONS',
            },
            credentials: 'include',
            mode: 'cors'            
            });

        const updatedCartData = await response.json();
        localStorage.removeItem('cart');
        dispatch({type: 'UPDATE_CART', cartState: updatedCartData.data});            

    }
}

export const updateCartDb = (productId, quantity) => {
    return async (dispatch, getState) => {       
        let cartDbError = false;
        try {
            const response = await fetch(`/api/v1/user/cart`,
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
                    productId,
                    quantity
                })
            });

            const updatedCartData = await response.json();

            if (updatedCartData.status === 'error' || updatedCartData.status === 'fail') {
                dispatch({type: 'SET_GLOBAL_ERROR'});
                cartDbError = true;
            }
        } 
        catch {
            dispatch({type: 'SET_GLOBAL_ERROR'});
        }

        if (!cartDbError) {
            try {
                const response = await fetch(`/api/v1/user/cart`, {
                    method:'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Credentials': 'true',
                        'Access-Control-Allow-Methods' : 'GET, POST, OPTIONS',
                    },
                    credentials: 'include',
                    mode: 'cors'            
                });  
                const updatedCartData = await response.json();
                if (updatedCartData.status !== 'success') {
                    dispatch({type: 'SET_GLOBAL_ERROR'});
                }
                else {
                    dispatch({type: 'UPDATE_CART', cartState: updatedCartData.data});
                }                    
            }
            catch {
                dispatch({type: 'SET_GLOBAL_ERROR'});
            }
        }            
    }            
}