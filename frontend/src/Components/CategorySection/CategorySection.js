import React from 'react';
import Section from '../UI/Section/Section';
import SectionHeading from '../UI/SectionHeading/SectionHeading';
import CategoryCard from '../UI/CategoryCard/CategoryCard';
import fruitsVeg from '../../Assets/fruitsVeg.jpg';
import beverages from '../../Assets/beverages.jpg';
import eggs from '../../Assets/egg_cat.jpg';
import breadDairy from '../../Assets/bread-dairy.jpg';
import classes from './CategorySection.module.css';
import { Link } from 'react-router-dom';

const CategorySection = (props) => {
    return(
        <Section>
            <SectionHeading>
                Popular Categories
            </SectionHeading>
            <div className={classes.CategoryContainer}>
                <CategoryCard link={`/category/${encodeURIComponent('fruits & vegetables')}` } source={fruitsVeg} label='Fruits & Vegetables' description='Fruits and Vegetables images' />
                <CategoryCard link={'/category/beverages'} source={beverages} label='Beverages' description='Beverages images' />
                <CategoryCard link={`/category/${encodeURIComponent('Eggs, Meat & Fish')}`} source={eggs} label='Eggs, Meat & Fish' description='Eggs images' />
                <CategoryCard link={`/category/${encodeURIComponent('Bakery & Dairy')}`} source={breadDairy} label='Bread & Dairy' description='Bread and Dairy images' />
            </div>            
        </Section>
    );
}

export default CategorySection;