import React from 'react';
import classes from './SideBar.module.css';
import HamBurger from '../HamBurger/HamBurger';
import SideBarLogin from './SideBarLogin/SideBarLogin';
import SideBarCategorySection from './SideBarCategorySection/SideBarCategorySection';

const SideBar = (props) => {
    let SideBarClasses = [classes.sideBar];
    if(props.sideBarVisible) {
        SideBarClasses.push(classes.openSideBar)
    }

    const sidebarCloseHandler = (event) => {
        if(event.target.matches('a')) {
            props.sideBarHandler();
        }
    }

    return(
        <React.Fragment>
            <div onClick={sidebarCloseHandler}  className={SideBarClasses.join(' ')}>
                <div style={{padding: '10px'}}>
                    <HamBurger clickHandler={props.sideBarHandler} crossHamBurger={true}/>
                </div>  
                <p style={{textAlign: 'center', fontWeight: 'bold', fontSize: '1.4rem', padding: '5px', height: '40px', backgroundColor: '#8a92a3', color: '#fff'}}>Welcome</p>              
                <nav>
                    <SideBarLogin />
                    <SideBarCategorySection />
                </nav>            
            </div>
        </React.Fragment>        
    );
}

export default SideBar;