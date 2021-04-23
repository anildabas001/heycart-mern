import React, {useState, useEffect} from 'react';
import ImageSection from '../../Components/ImageSection/ImageSection';
import DealSection from '../../Components/DealSection/DealSection';
import CategorySection from '../../Components/CategorySection/CategorySection';
import AboutSection from '../../Components/AboutSection/AboutSection';

const Home = (props) => {
    document.title = 'HeyCart';
    const [products, updateProducts] = useState([]);
    
    useEffect(() => {
        fetch('/api/v1/products/top-deals')
        .then(response => response.json())
        .then((productData) => {
            if (productData.data.length > 0) {                
                updateProducts(productData.data)
            }
        })
        .catch(err => {updateProducts([])});
    }, []);

    return (
        <>
            <ImageSection />
            {products.length > 0 ? <DealSection data={products}/>: null}
            <CategorySection />
            <AboutSection />
        </>        
    );
}

export default React.memo(Home);