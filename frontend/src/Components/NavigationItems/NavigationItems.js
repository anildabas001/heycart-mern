import React, { useState, useEffect } from 'react';
import {withRouter} from 'react-router-dom';
import classes from './NavigationItems.module.css';
import {connect} from 'react-redux';
import NavDropdown from './NavigationItem/NavDropDown/NavDropdown';
import NavSearchbar from './NavigationItem/NavSearchbar/NavSearchbar';
import NavLink from './NavigationItem/NavLink/NavLink';

const Navigation = (props) => {  
    
    let loginLink = <NavLink navigationData={
        {
            name: 'Login',
            linkTo: '/login'+ `?redirectTo=${props.redirectLink}`                
        }
    } /> ;

    if(props.authData.isLoggedin && props.authData.name.length > 0) {
        loginLink = <NavDropdown navigationData={
            {
                 name: props.authData.name.split(' ')[0],
                 icon: 'IoChevronDownSharp',
                 position: 'right',
                 iconPosition: 'right',
                 dropdownData: [
                 {
                     linkName: 'My Profile',
                     linkTo: '/myprofile'                    
                 },
                 {
                     linkName: 'My Orders',
                     linkTo: '/order'
                 },
                 {
                     linkName: 'Logout',
                     linkTo: `/logout?redirectTo=${props.redirectLink}`
                 }
             ]
            } 
         } />
    }
    

    return (
    <ul className={classes.NavigationBar}>
        <li>
        <NavDropdown navigationData={
           {
                name: 'Shop By Category',
                icon: 'IoChevronDownSharp',
                iconPosition: 'right',
                dropdownData: [
                {
                    linkName: 'Fruits & Vegetables',
                    linkTo: `/category/${encodeURIComponent('fruits & vegetables')}`                   
                },
                {
                    linkName: 'Beverages',
                    linkTo: '/category/beverages'
                },
                {
                    linkName: 'Snacks',
                    linkTo: '/category/snacks'
                },                
                {
                    linkName: 'Eggs, Meat & Fish',
                    linkTo: `/category/${encodeURIComponent('Eggs, Meat & Fish')}`
                },
                {
                    linkName: 'Bakery & Dairy',
                    linkTo: `/category/${encodeURIComponent('Bakery & Dairy')}`
                }
            ]
           } 
        } />

        </li>    

        <li style={{width: '50%', height: '80%'}}>
            <NavSearchbar navigationData={
                {
                    placeholder: 'Search for products'
                } 
            }/>
        </li>
        
        <li>
            <NavLink navigationData={
                {
                    name: 'Cart',
                    linkTo: '/cart',
                    icon: 'IoCartOutline',
                    iconPosition: 'left'
                }
            } /> 
        </li>     

        <li>
            {loginLink}
        </li>

    </ul>      
    );
}

const mapStateToProps = (state) => {
    return {
        authData: state.authentication
    }
}

const mapDispatchToProps =(dispatch) => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Navigation));