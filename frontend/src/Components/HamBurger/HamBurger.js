import React, {useContext} from 'react';
import classes from './HamBurger.module.css';


const HamBurger = (props) => { 

    var hamBurgerClasses=[classes.hamBurger];
    if(props.crossHamBurger) {
        hamBurgerClasses.push(classes.crossHamBurger);
    }

    return (
        <div className ={hamBurgerClasses.join(' ')} onClick={props.clickHandler}>
            <div></div>
            <div></div>
            <div></div>
        </div>
    );
}

export default HamBurger;
