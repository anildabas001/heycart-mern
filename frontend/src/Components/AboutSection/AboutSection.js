import React from 'react';
import Section from '../UI/Section/Section';
import SectionHeading from '../UI/SectionHeading/SectionHeading';
import classes from './AboutSection.module.css';
import groceryBag from '../../Assets/groceryBag.jpg';

const AboutSection = (props) => {
    return(
        <Section>
            <SectionHeading>About HeyCart</SectionHeading>
            <div className={classes.AboutContent}>
                <p className={classes.paragraph}> HeyCart is an online food and grocery store. 
                    HeyCart allows you to walk away from the drudgery of grocery shopping and welcome an easy relaxed way of browsing and shopping for groceries. 
                    Discover new products and shop for all your food and grocery needs from the comfort of your home or office. No more getting stuck in traffic jams, paying for parking, standing in long queues and carrying heavy bags – get everything you need, when you need, right at your doorstep. 
                    Food shopping online is now easy as every product on your monthly shopping list, is now available online at HeyCart
                </p>
                <img src={groceryBag} alt='grocery bag' />
            </div>
                        
        </Section>
    );
}

export default AboutSection;