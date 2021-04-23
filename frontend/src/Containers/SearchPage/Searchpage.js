import React, {useReducer, useeffect, useEffect} from 'react';
import CategoryLayout from '../../Components/CategoryLayout/CategoryLayout';
import FilterSection from '../../Components/CategoryLayout/FilterSection/FilterSection'; 
import ProductsSection from '../../Components/CategoryLayout/ProductsSection/ProductsSection';
import Loader from '../../Components/UI/Loader/Loader';
import {connect} from 'react-redux';
const queryString = require('query-string');

const categoryReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_PRODUCTS_AND_FILTERS': 
      return ({
        ...state,
        productList: [...action.productList],
        filter: [
          {
            heading: 'Brands',
            options: [...action.brands]
          },
          {
            heading: 'Sub-Category',
            options: [...action.subCategories]
          },
          {
            heading: 'Discount',
            options: [...action.discounts]
          },
          {
            heading: 'Availability',
            options: [{name: 'exclude out Of stock', value: 'true'}]
          }
        ]
      });

      case 'STOP_LOADER':
        return(
          {
            ...state,
            loading: false
          }
        );

        case 'UPDATE_PRODUCTS':
        return({
          ...state,
          productList: [...action.productList],
        });

        case 'START_LOADER':
        return(
          {
            ...state,
            loading: true
          }
        );

        case 'STOP_PRODUCT_LOADER':
        return(
          {
            ...state,
            productLoading: false
          }
        );

        case 'START_PRODUCT_LOADER':
        return(
          {
            ...state,
            productLoading: true
          }
        );

        case 'RESET_INITIALSTATE': 
          return({
            ...action.initialCategoryState
          });
  }
  return state;
}

const SearchPage = (props) => {
    const productToSearch = queryString.parse(props.location.search).product;
    const pageHeading = `Search results for: "${productToSearch}"`;  
    document.title = pageHeading;  
    const initialCategoryState = {
      productList:[],
      filter: [
        {
          heading: 'Brands',
          options: []
        },
        {
          heading: 'Sub-Category',
          options: []
        },
        {
          heading: 'Discount',
          options: []
        },
        {
          heading: 'Availability',
          options: [{name: 'exclude out Of stock', value: 'true'}]
        }        
      ],
      loading: true
    };

    const [state, dispatch] = useReducer(categoryReducer, initialCategoryState);

    useEffect(() => {

      dispatch({type: 'RESET_INITIALSTATE', initialCategoryState});
      dispatch({type: 'START_LOADER'});

      let brands = [];
      let subCategories = [];
      let discounts = [];
      let productList= [];

      const url = encodeURI(`/api/v1/products?search=${productToSearch}&selectFields=-description,-primaryImage,-organic,-variants`);
      
      fetch(url)
      .then(response => response.json())
      .then(response=> {
        if (response.data.length > 0) {

          productList = [...response.data];

          var checkDuplicate ={};
          response.data.forEach((item) => {  

              if (! checkDuplicate[item.brand]) {
                brands.push({name: item.brand, value: item.brand});
                checkDuplicate[item.brand] = true;
              }

               item.categories.forEach(category => {                 
                 if(! checkDuplicate[category]) {
                   subCategories.push({name: category, value: category});                   
                   checkDuplicate[category] = true;
                 }
               });

              if (item.discountPercentage < 10 && item.discountPercentage > 0) {
                 if(discounts.indexOf('less than 10%') === -1) {
                   discounts[4] = {name: 'less than 10%', value: 'lt=10,gt=0'};
                 }                  
              }
              else if(item.discountPercentage >= 10 && item.discountPercentage < 20) {
                if(discounts.indexOf('less than 20%') === -1) {
                  discounts[3] = {name: 'less than 20%', value:'lt=20,gt=0'};
                } 
              }
              else if(item.discountPercentage >= 20 && item.discountPercentage < 30) {
                if(discounts.indexOf('less than 30%') === -1) {
                  discounts[2] = {name: 'less than 30%', value:'lt=30,gt=0'};
                } 
              }
              else if(item.discountPercentage >= 30 && item.discountPercentage < 40) {
                if(discounts.indexOf('less than 40%') === -1) {
                  discounts[1] = {name:'less than 40%', value: 'lt=40,gt=0'};
                } 
              }
              else if(item.discountPercentage >= 40 ) {
                if(discounts.indexOf('more than 40%') === -1) {
                  discounts[0] = {name: 'more than 40%', value: 'gte=40'};
                } 
              }
            })
        }
        else if (response.status === 'error') {
          props.setError(); 
          dispatch({type: 'STOP_LOADER'});
        } 

        dispatch({type: 'UPDATE_PRODUCTS_AND_FILTERS', productList, brands, subCategories, discounts});
        dispatch({type: 'STOP_LOADER'});
      })
      .catch(err => {props.setError(); dispatch({type: 'STOP_LOADER'});})
    },[pageHeading]);

    const filterFormHandler = (event) => {
      event.preventDefault();      
      dispatch({type: 'START_PRODUCT_LOADER'});
      var brands = [];
      var excludeOutOfStock = [];
      var subCategories = [];
      var discounts = [];
      var queryString = `/api/v1/products?search=${productToSearch}&selectFields=-description,-primaryImage,-organic,-variants`;
      
      Array.from(event.target.elements).forEach(input => {
        if (input.name === 'brands' && input.checked) {
          brands.push(input.value);
        }
        else if(input.name === 'sub-category' && input.checked) {
          subCategories.push(input.value);
        }
        else if(input.name === 'availability' && input.checked) {
          excludeOutOfStock.push(input.value);
        }
        else if(input.name === 'discount' && input.checked) {
          discounts.push(input.value);
        }
      });

      if (brands.length > 0) {
        queryString = `${queryString}&brand=${brands.join(',')}`
      }

      if (subCategories.length > 0) {
        queryString = `${queryString}&subCategories=${subCategories.join(',')}`
      }

      if (discounts.length > 0) {
        queryString = `${queryString}&discount=${discounts.join('|')}`
      }

      if (excludeOutOfStock.length > 0) {
        queryString = `${queryString}&excludeOutOfStock=${excludeOutOfStock.join('')}`
      }

      fetch(queryString).then(response => response.json()).then(data => {
        if (data.status === 'error') {
          props.setError(); 
          dispatch({type: 'STOP_PRODUCT_LOADER'});
        }

        dispatch({type: 'UPDATE_PRODUCTS', productList: data.data});    
        dispatch({type: 'STOP_PRODUCT_LOADER'})
      }).catch(err => {
        props.setError(); 
        dispatch({type: 'STOP_PRODUCT_LOADER'})
      });;

    }

    let categoryElement = (
      <CategoryLayout>
          <FilterSection filterFormHandler={filterFormHandler} productCount={state.productList.length} filter={state.filter}/>
          {state.productLoading ? <Loader/> : <ProductsSection productList={state.productList} pageHeading={pageHeading}/>}
      </CategoryLayout>  
    );

    if(state.loading) {
      categoryElement = <Loader />
    }

  return (
    <>
      {categoryElement}
    </>    
  )
};

const mapDispatchToProps = (dispatch) => {
  return {
    setError: () => dispatch({type: 'SET_GLOBAL_ERROR'})
  }
}

export default connect(null, mapDispatchToProps)(SearchPage);