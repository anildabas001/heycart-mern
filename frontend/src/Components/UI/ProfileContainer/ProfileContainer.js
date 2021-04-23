import React from 'react';
import classes from './ProfileContainer.module.css';


const ProfileContainer = (props) => {
    return(
        <div className={classes.ProfileContainer}>
            {props.children}
        </div>
    );
}

export default ProfileContainer;