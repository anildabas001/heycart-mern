import React,{useState} from 'react';
import classes from './CollapsibleControl.module.css';
import { IoAddOutline, IoRemoveOutline} from "react-icons/io5";

const CollapsibleControl = (props) => {
    let icon = <IoAddOutline />;    
    let collapseClass = classes.close;
    const [collapseState, setCollapseState] = useState(true );

    if(collapseState) {
        icon = <IoRemoveOutline />;
        collapseClass=classes.open;
    }

    const collapseHandler = (event) => {
        setCollapseState(state => !state);
    }

    return (
        <>
            <div style={{marginBottom: '5px'}} onClick={collapseHandler} className={classes.CollapseTitle}>{props.title} <span className={classes.CollapsibleIcon}>{icon}</span></div>
            <div className={collapseClass}>
                {props.children}
            </div>
        </>
    );
}

export default CollapsibleControl;