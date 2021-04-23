import React from 'react';
import ProductCard from '../UI/ProductCard/ProductCard';
import Section from '../UI/Section/Section';
import SectionHeading from '../UI/SectionHeading/SectionHeading';
import classes from './DealSection.module.css';
import ProductSlider from '../UI/ProductSlider/ProductSlider';
import egg from '../../Assets/egg_cat.jpg'

const DealSection = (props) => {    

    return (
        <Section className={classes.DealSection}>
            <SectionHeading>HeyCart Deals</SectionHeading>
            <ProductSlider>
                {props.data.map(product => <ProductCard key ={product.id} product={{
                    name: product.name,
                    mrp: product.mrp,
                    price: product.price,
                    discount: product.discountPercentage,
                    images: product.images,
                    id: product.id,
                    quantity: product.quantity,
                    stockQuantity: product.stockQuantity
                }}/>)}    
            </ProductSlider>
        </Section>
    );
}

export default DealSection;