import React from 'react';
import classes from './FilterSection.module.css';
import Filter from './Filter/Filter';
import Button from '../../UI/Button/Button';
import CollapsibleControl from '../../UI/CollapsibleControl/CollapsibleControl';

const FilterSection = (props) => {    
    const titleElement = <p className={classes.FilterHeading}>Filters</p>;
    return (
    <form onSubmit={props.filterFormHandler}>
        <div className= {classes.FilterSection}>
        {
            props.filter[0].options.length > 0 ?                 
                <CollapsibleControl title={titleElement}>
                    <div style={{minHeight: '350px'}}>
                        {props.filter.map((filterElement) => <Filter key={filterElement.heading} heading={filterElement.heading} filterValues={filterElement.options}/>)}  
                    </div>
                    <Button >Apply Filters</Button>
                </CollapsibleControl>
          : null  
        }
        </div>        
    </form> 
    );
}

export default FilterSection;