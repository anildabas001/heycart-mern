import React from 'react';
import CollapsibleControl from '../../UI/CollapsibleControl/CollapsibleControl';
import NavLink from "../../NavigationItems/NavigationItem/NavLink/NavLink";
import classes from './SideBarCategorySection.module.css';

const SideBarCategorySection = (props) => {
    return(<section className={classes.SideBarCategory}>
    <CollapsibleControl title='Shop By Category'>
        <ul>
            <li>
                <NavLink navigationData={
                        {
                            name: 'Fruits & Vegetables',
                            linkTo: `/category/${encodeURIComponent('fruits & vegetables')}`                 
                        }       
                    } 
                />
            </li>

            <li>
                <NavLink navigationData={
                        {
                            name: 'Beverages',
                            linkTo: '/category/beverages'
                        }     
                    } 
                />
            </li>

            <li>
                <NavLink navigationData={
                        {
                            name: 'Snacks',
                            linkTo: '/category/Snacks'
                        }     
                    } 
                />
            </li>

            <li>
                <NavLink navigationData={
                        {
                            name: 'Eggs, Meat & Fish',
                            linkTo: `/category/${encodeURIComponent('Eggs, Meat & Fish')}`
                        }      
                    } 
                />
            </li>

            <li>
                <NavLink navigationData={
                        {
                            name: 'Bakery & Dairy',
                            linkTo: `/category/${encodeURIComponent('Bakery & Dairy')}`
                        }      
                    } 
                />
            </li>
        </ul>
    </CollapsibleControl>
    </section>);
}

export default SideBarCategorySection;
