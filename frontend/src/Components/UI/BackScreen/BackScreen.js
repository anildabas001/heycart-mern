import React from 'react';
import classes from './BackScreen.module.css'

const BackScreen = (props) => {
    let element;
    let BackScreenClasses =[classes.BackScreen];
    // props.showBackScreen ? document.body.style.overflow = 'hidden !important' : document.body.style.overflow = 'scroll';
    
    if(props.showBackScreen) {
        BackScreenClasses.push(classes.open);
        document.body.style.overflow = 'hidden !important';
    }
//props.backScreenHandler
    element = props.showBackScreen ? <div onClick={props.backScreenHandler} className={BackScreenClasses.join(' ')}></div> : null;
    

    return (
        <>
            {element}
        </>
    );
}

export default BackScreen;