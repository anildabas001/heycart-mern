import React from 'react';
import classes from './ProfileHeader.module.css';
import {IoPersonOutline} from 'react-icons/io5';


const ProfileHeader = (props) => {
    return(
        <>        
            <div className={classes.UserIcon}>
                {<IoPersonOutline />}
            </div>  
            <p style={{textAlign: 'center', fontWeight: 400, fontSize: '1.4rem', padding: '5px', height: '40px', backgroundColor: '#8a92a3', color: '#fff'}}>Welcome to HeyCart</p>  
        </> 
    );
}

export default ProfileHeader;