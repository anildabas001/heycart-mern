import React from 'react';
import classes from './Icon.module.css';

const Icon = (props) => {
   return <img className={classes.Icon} src={props.source} alt={props.description}></img>
      
}

export default React.memo(Icon);