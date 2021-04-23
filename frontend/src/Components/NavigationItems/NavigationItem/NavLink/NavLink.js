import React from 'react';
import * as ReactIcons from 'react-icons/io5';
import classes from './NavLink.module.css';
import {Link} from 'react-router-dom';

const NavLink = (props) => {
    let ReactIcon;
    let element;     

    let link = <Link className={classes.NavLink} to={props.navigationData.linkTo}>{props.navigationData.name}</Link>;   
            if(props.navigationData.icon) { 
                ReactIcon = ReactIcons[`${props.navigationData.icon}`];
                link = props.navigationData.iconPosition.toLowerCase() === 'right' ? <Link className={classes.NavLink} to={props.navigationData.linkTo}><span className={classes.AlignIcon}>{props.navigationData.name}<ReactIcon /></span></Link> : <Link className={classes.NavLink} to={props.navigationData.linkTo}><span className={classes.AlignIcon}><ReactIcon />{props.navigationData.name}</span></Link>;
            }

            element = link;

    return (
    <>
        {element}
    </>     
    );
}

export default NavLink;