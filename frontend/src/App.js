import React, {useEffect, useState} from 'react';
import {Switch, Route} from 'react-router-dom';
import Home from './Containers/Home/Home';
import Toolbar from '../src/Components/Toolbar/Toolbar';
import Footer from '../src/Components/Footer/Footer';
import Category from './Containers/Category/Category';
import SideBar from './Components/SideBar/SideBar';
import BackScreen from './Components/UI/BackScreen/BackScreen';
import SearchPage from './Containers/SearchPage/Searchpage';
import ResponsiveSearchbar from './Components/ResponsiveSerachbar/ResponsiveSerachbar';
import ProductPage from './Containers/ProductPage/ProductPage';
import Logout from './Containers/Logout/Logout';
import MyOrderSummary from './Containers/MyOrderSummary/MyOrderSummary'
import Cart from './Containers/Cart/cart';
import Checkout from './Containers/Checkout/Checkout';
import Orders from './Containers/Orders/Orders';
import {connect} from 'react-redux';
import {syncCart} from './Store/Actions/CartAction';
import {logout} from './Store/Actions/AuthActions';
import Profile from './Containers/Profile/Profile';
import ErrorPage from './Components/ErrorPage/ErrorPage';
import PageNotFound from './Components/PageNotFound/PageNotFound';

function App(props) {
  const [sidebarState, sidebarSetState] = useState({
    showSideBar: false
  });

  const sideBarHandler = ()=> {
    sidebarSetState((state)=>{
        return {showSideBar: !state.showSideBar}
    });
  }

  useEffect(() => {
    if (props.isLoggedin) {
      props.syncCartData();
    }
    else {
      props.resetCart();
    }
  }, [props.isLoggedin]);

  useEffect(() => {
    fetch('/api/v1/user/confirmLogin')
    .then(response => {
      if (response.status === 401) {
        if (props.isLoggedin === true) {
          props.logout();
        }
      }
      else {
        if (props.isLoggedin === false) {
          props.logoutDB();
        }
      }
      return null;
    })        
  }, [])

 
  return (
    <>
      <Toolbar crossHamBurger={sidebarState.showSideBar} sideBarHandler={sideBarHandler}/>
      <div>
        <ResponsiveSearchbar navigationData={
          {
            placeholder: 'Search for products'
          } 
        } />
      </div>      
      <SideBar sideBarVisible={sidebarState.showSideBar} sideBarHandler={sideBarHandler} />
      <BackScreen backScreenHandler = {sideBarHandler} showBackScreen={sidebarState.showSideBar}/>
      { props.globalError ? <ErrorPage /> :
        <Switch>  
          <Route path='/' exact  component={Home} />
          <Route path='/search' exact  component={SearchPage} />          
          <Route path='/product/:productName/:productid' exact component={ProductPage} />
          <Route path='/cart' exact  component={Cart} />
          <Route path='/myprofile' exact  component={Profile} />
          <Route path='/logout' exact  component={Logout} />
          <Route path='/checkout/:options' exact  component={Checkout} />          
          <Route path='/order' exact  component={Orders} />
          <Route path='/myorder/:orderId' exact  component={MyOrderSummary} />
          <Route path='/category/:category' exact  component={Category} />
          <Route path='*'  component={PageNotFound} />
        </Switch>
        }
      <Footer />      
    </>
  );
}

const mapDispatchToProps = (dispatch => {
  return {
    syncCartData: () => dispatch(syncCart()),
    resetCart: () => dispatch({type: 'RESET_CART'}),
    logout: () => dispatch({type: 'LOGOUT'}),
    logoutDB: () => dispatch(logout())
   }
});

const mapStateToProps = (state => {
  return { 
      cartData: state.cartData,
      isLoggedin: state.authentication.isLoggedin,
      globalError: state.globalError
    }    
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
