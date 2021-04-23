import React from 'react';
import NavSearchbar from '../NavigationItems/NavigationItem/NavSearchbar/NavSearchbar';
import classes from './ResponsiveSearchbar.module.css';

const ResponsiveSearchbar = (props) => {
    return (
        <div className ={classes.ResponsiveSearchbar}>
            <NavSearchbar {...props} />
      </div> 
    );
}

export default ResponsiveSearchbar;