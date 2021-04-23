import React from 'react';
import classes from '../CategoryLayout/CategoryLayout.module.css';

const CategoryLayout = (props) => {
    return (
        <div className={classes.CategoryLayout}>
            {props.children}
        </div>
    );
}

export default CategoryLayout;