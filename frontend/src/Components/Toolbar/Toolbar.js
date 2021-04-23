import React, {useContext} from 'react';
import heyCartLogo from '../../Assets/HeyCartLogo.png';
import Icon from '../UI/Icon/Icon';
import classes from './Toolbar.module.css';
import NavigationItems from '../NavigationItems/NavigationItems';
import NavLink from '../NavigationItems/NavigationItem/NavLink/NavLink';
import HamBurger from '../HamBurger/HamBurger';
import {Link} from 'react-router-dom';

const Toolbar = (props) => {
    return(
        <div style={{border: '1px solid #eee', paddingBottom: '2px'}}>
            <div className={classes.Toolbar}>             
                <HamBurger crossHamBurger={props.crossHamBurger} clickHandler={props.sideBarHandler} />
                <div className={classes.IconContainer}>
                    <Link to="/"><Icon source ={heyCartLogo} description='HeyCart logo'/></Link>
                </div>            
                <nav>
                    <NavigationItems />                                
                </nav>   
                <span className={classes.smallScreenNav}>
                    <NavLink navigationData={
                        {
                            name: 'Cart',
                            linkTo: '/cart',
                            icon: 'IoCartOutline',
                            iconPosition: 'left'
                        }
                    } 
                />
                </span>               
            </div>
        </div>
    )
}

export default React.memo(Toolbar);