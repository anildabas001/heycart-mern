import React from 'react';
import classes from './AuthenticationForm.module.css';
import Button from '../Button/Button';
import ErrorField from '../ErrorField/ErrorField';
import HeyCartLogo from '../../../Assets/HeyCartLogo.png';
import Icon from '../Icon/Icon';
import {Link} from 'react-router-dom';
import queryString from 'query-string';
import {withRouter} from 'react-router';

const AuthenticationForm = (props) => { 
    const redirectAddress = queryString.parse(props.location.search).redirectTo || '/';  

    return (
    <div className={classes.AuthenticationForm}>
        <Link to='/'><Icon source={HeyCartLogo} description='HeyCart Logo'></Icon></Link>
        <div className={classes.FormContainer}>
            <h2>{props.heading}</h2>
            <form onSubmit={props.formSubmitHandler}>                
                {props.children}
                <ErrorField style={{textAlign: 'center'}}>{props.formErrorMessage}</ErrorField>
                <Button>{props.AuthFormType}</Button>
            </form>
            {/* {props.AuthFormType.toLowerCase() === 'login' ? <p className={classes.AuthLink}><Link to='/'>{'Forgot Password?'}</Link></p> : null} */}
            <p className={classes.AuthLink}>{props.AuthFormType.toLowerCase() === 'login' ? <Link to={`/signup?redirectTo=${redirectAddress}`}>{'New to HeyCart? Create an account'}</Link> : <Link to={`/login?redirectTo=${redirectAddress}`}>{'Already having HeyCart Account? Please Login'}</Link> }</p>
        </div>
    </div>          
    );
}  

export default React.memo(withRouter(AuthenticationForm));