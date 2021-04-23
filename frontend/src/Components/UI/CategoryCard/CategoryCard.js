import React from 'react';
import {Link} from 'react-router-dom';
import classes from './CategoryCard.module.css';

const CategoryCard = (props) => {
    return (
        <div className={classes.CategoryCard}>
           <Link to={props.link}>
           <div className={classes.CategoryImage}>
                <img src={props.source} alt={props.description}/>
            </div>
            <p className={classes.CategoryLabel}>{props.label}</p>
           </Link>
        </div>
    );
}

export default CategoryCard;