import React, { useEffect, useState } from 'react';
import ProductPageContainer from '../../Components/ProductPageContainer/ProductPageContainer';
import ProductImageSection from '../../Components/ProductPageContainer/ProductImageSection/ProductImageSection';
import ProductDetailSection from '../../Components/ProductPageContainer/ProductDetailSection/ProductDetailSection';
import ProductDescription from '../../Components/ProductPageContainer/ProductDescription/ProductDescription';
import {updateCart, updateCartDb} from '../../Store/Actions/CartAction';
import Loader from '../../Components/UI/Loader/Loader';
import {connect} from 'react-redux';
import ProductPageHeading from '../../Components/UI/ProductPageHeading/ProductPageHeading';

const ProductPage = (props) => {
    document.title = 'HeyCart Product';
    let [loader, setLoader] = useState(true);
    let productId = props.match.params.productid;  
    
    const [productData, updateProductData] = useState({}); 
    let initialQuantity = -1;    
    const [cartQuantity, updateCartQuantity] = useState(initialQuantity); 

    const onClickDecrease = (event) => {
        event.preventDefault();        
        event.stopPropagation();
        setTimeout(() => {
            updateCartQuantity(state => {
                if (state > 0) {
                    state--;                
                }
                return state;            
            });
        },300)        
    }

    const onClickIncrease = (event) => {
        event.preventDefault();        
        event.stopPropagation();
        setTimeout(() => {
            updateCartQuantity(state => {
                if (state < productData.stockQuantity) {
                    state = state + 1;
                }
                return state;  
            });
        },300)         
    }

    const addToCartHandler = (event) => {
        event.preventDefault();
        event.stopPropagation();
        updateCartQuantity(1);
    }

    useEffect(() => {
        fetch(`/api/v1/products/${productId}`)
        .then(response => response.json())
        .then(productdata => {
            if (productdata.status === 'success') {
                updateProductData(productdata.data[0]);                 
            }
            else {
                props.setGlobalError()
            }
            setLoader(false);
        })
        .catch(err => {
            props.setGlobalError();
        })
    }, [productId]);

    useEffect(() => {
        if (cartQuantity !== -1 && props.isLoggedin) {
            props.updateCartDb(productId, cartQuantity);
        }
        else if (cartQuantity !== -1) {
            props.updateCart({
                id: productId, 
                name: productData.name,
                price: productData.price,
                quantity: productData.quantity,
                images: productData.images
            }, cartQuantity);
        }
        
    }, [cartQuantity]);
    
    useEffect(() => {
        if (cartQuantity !== -1 && props.isLoggedin) {
            props.updateCartDb(productId, cartQuantity);
        }
        else if (cartQuantity !== -1) {
            props.updateCart({
                id: productId, 
                name: productData.name,
                price: productData.price,
                quantity: productData.quantity,
                images: productData.images
            }, cartQuantity);
        }
        
    }, [cartQuantity]);

    useEffect(() =>{
        const currentProduct = props.cartProducts ? props.cartProducts.filter(cartProduct => cartProduct.product.id === productId): null;
        
        if (currentProduct && currentProduct.length > 0) {
            updateCartQuantity(currentProduct[0].quantity) ;
        }

    }, [props.cartProducts]);

    return(
        <>
            {
                loader ? <Loader /> : 
                <ProductPageContainer>
                    <ProductPageHeading heading={productData.name} />
                    <ProductImageSection imageSource={productData.primaryImage} productName={productData.name} />
                    <ProductDetailSection cartQuantity={cartQuantity} onClickDecrease={onClickDecrease} onClickIncrease={onClickIncrease} addToCartHandler={addToCartHandler}  product={productData}/>
                    <ProductDescription description={productData.description}/>
                </ProductPageContainer>
            }
        </>        
    );
}

const mapDispatchToProps = (dispatch => {
    return {
        updateCart: (product, quantity) => dispatch(updateCart(product, quantity)),
        updateCartDb: (productId, quantity) => dispatch(updateCartDb(productId, quantity)),
        setGlobalError: () => dispatch({type: 'SET_GLOBAL_ERROR'})
    }
});

const mapStateToProps = (state => {
    return { 
        cartProducts: state.cartData.products,
        isLoggedin: state.authentication.isLoggedin
    }    
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);
