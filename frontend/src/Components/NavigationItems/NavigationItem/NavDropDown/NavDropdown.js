import React from 'react';
import * as ReactIcons from 'react-icons/io5';
import classes from './NavDropdown.module.css';
import {Link} from 'react-router-dom';

const NavDropdown = (props) => {
    let ReactIcon;
    let element;
    let dropdownName = <span className={classes.Dropdown}>{props.navigationData.name}</span>; 
    let icon;  
    const navClasses = [classes.dropdownItems];
    
    const closeDropdownHandler = (event) => {
         if(event.target.matches('a')) {
             event.target.parentNode.parentNode.style.display = 'none';
         }
    }

    const openDropdownHandler = (event) => {
        if (event.target.nextSibling) {
            event.target.nextSibling.style.display = 'block';
        }        
    }

    if(props.navigationData.icon) {
        ReactIcon = ReactIcons[`${props.navigationData.icon}`];
        icon = props.icon;
        dropdownName = props.navigationData.iconPosition === 'right'?  <a href='#' onMouseOver={openDropdownHandler} className={[classes.Dropdown, classes.AlignIcon].join(' ')}><span className={ classes.IconRight}>{props.navigationData.name}</span><ReactIcon /></a> : <a onMouseOver={openDropdownHandler} href='#' className={[classes.Dropdown, classes.AlignIcon].join(' ')}><ReactIcon /><span className={classes.IconRight}>{props.navigationData.name}</span></a>
    }

    if(props.navigationData.position === 'right') {
        navClasses.push(classes.Right);
    }

    element = 
        <>
        {dropdownName} 
            <ul className={navClasses.join(' ')} onClick={(closeDropdownHandler)}>
                {props.navigationData.dropdownData.map(data => <li key={data.linkName}><Link to={data.linkTo}>{data.linkName}</Link></li>)}
            </ul>
    </> ;

    return (
    <>
        {element}
    </>     
    );
}

export default NavDropdown;