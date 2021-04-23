import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import './ProductSlider.css';

const ProductSlider = (props) => {
    var settings = {
        infinite: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 4,
        responsive: [
          {
            breakpoint: 1300,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 4,
              infinite: false
            }
          },
          {
            breakpoint: 1210,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: false
            }
          },
          {
            breakpoint: 890,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 2
            }
          },
          {
            breakpoint: 640,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              className: 'ProductSlider'
            }
          }
        ]
      };

    return(
        <Slider {...settings}>
            {props.children}
        </Slider>
    );
}

export default ProductSlider;