import React from 'react';
import groceryImage from '../../Assets/grocery-1.jpg'
import classes from './ImageSection.module.css';

const ImageSection = (props) => {
    return (
        <section className={classes.ImageSection}>
            <div className={classes.imageContainer}>
                <img src={groceryImage}/>
                <div className={classes.HeroText}>                    
                    <h1>Welcome to HeyCart.<br/>Fill your Cart with Happiness!!</h1>
                </div>
            </div>
        </section>
    );
}

export default ImageSection;