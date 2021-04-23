import React, {useState, useRef} from 'react';
import {Link, withRouter} from 'react-router-dom'
import * as ReactIcons from 'react-icons/io5';
import classes from './NavSearchbar.module.css';

const NavSearchbar = (props) => {
    const [input, updateInput] = useState('');

    const inputHandler = (event) => {
        updateInput(event.target.value);
    }

    const formSubmitHandler = (event) => {
        event.preventDefault();
        if (input.trim().length > 0) {
            props.history.push(`/search?product=${input}`);
        }        
    }

    let element = <span className={classes.searchForm}>  
    <form onSubmit={formSubmitHandler} className={classes.AlignIcon}>
        <input type="text" onChange={inputHandler} placeholder={props.navigationData.placeholder}/> 
        {input.trim().length > 0 ?<Link style={{height: '35px'}} to={`/search?product=${input}`}><ReactIcons.IoSearchOutline /></Link> : <Link onClick={(event) => event.preventDefault()} style={{height: '35px'}} to={`#`}><ReactIcons.IoSearchOutline /></Link>}                   
    </form>
</span>;

return (
    <>
        {element}
    </>
);
}

export default withRouter(NavSearchbar);




/* <datalist id="suggestions">
            {props.searchOptions.map(value => <option key={value} value={value} />)} 
        </datalist>    */