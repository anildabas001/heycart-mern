import React from 'react';
import classes from './Filter.module.css';

const Filter = (props) => {
    return (<section className={classes.Filter}>
        <p style={{borderBottom: '1px solid #eee'}} className={classes.Heading}>{props.heading}</p>
        {props.filterValues.map((option, index) => {
            if(option) {
                return (
                    <div className={classes.filterField} key={option.name}>
                        <input value={option.value} id={option.name} name={props.heading.toLowerCase()} type='checkbox' />
                        <label htmlFor={option.name}>{option.name}</label>
                    </div>
                )
            }
            else {
                return null;
            }
        })}
    </section> 
    );
}

export default Filter;