import React, {useState, useCallback, useEffect, useMemo} from 'react';
import {withRouter} from 'react-router';
import AuthenticationForm from '../../Components/UI/AuthenticationForm/AuthenticationForm';
import InputField from '../../Components/UI/InputField/InputField';
import * as queryString from 'query-string';
import {connect} from 'react-redux';
import {login} from '../../Store/Actions/AuthActions';
import {Redirect} from 'react-router';
import Loader from '../../Components/UI/Loader/Loader';
import {fieldChangeHandler, formSubmitHandler} from '../../utils/forms';
import ErrorPage from '../../Components/ErrorPage/ErrorPage';

const Login = (props) => {    
    document.title = 'HeyCart Login';
    const [formErrorMessage, setFormErrorMessage] = useState('');
    const [LoaderState, setLoaderState] = useState(false);
    const [emailState, setEmailState] = useState({
        fieldName: 'input',
        fieldAttributes: {
            type: 'text',
            label: 'Email',
            name: 'email',
            placeholder: 'Enter Email'
        },
        showErrorMessage: false,
        value: '',
        errorMessage: ['Email must not be empty'],
        isValid: false,
        isTouched: false,
        validate: {
            required: [true, 'Email must not be empty'],
            email: [true, 'Email must be in correct format']
        }
    });

    const [passwordState, setPasswordState] = useState({
        fieldName: 'input',
        fieldAttributes: {
            type: 'password',
            label: 'Password',
            name: 'password',
            placeholder: 'Enter Password'
        },
        showErrorMessage: false,
        value: '',
        errorMessage: ['Password must not be empty'],
        isValid: false,
        isTouched: false,
        validate: {
            required: [true, 'Password must not be empty'],
            minLength: [6, 'Password length must be of more than 6 characters']
        }
    });  

    const formSubmitAction = () => { 
        props.loginOnSubmit(emailState.value, passwordState.value, setFormErrorMessage, setLoaderState);
    };

     useEffect(() => {
         return () => { 
            setLoaderState(false);   
         }
     }, []);
     
    const redirectAddress = queryString.parse(props.location.search).redirectTo || '/';

    const AuthForm = (
    <AuthenticationForm formErrorMessage={formErrorMessage} formSubmitHandler={useCallback((event) => formSubmitHandler([{emailState, setEmailState}, {passwordState, setPasswordState}], formSubmitAction, event), [emailState, passwordState,formSubmitAction])} AuthFormType={useMemo(() => 'Login', [])} heading={useMemo(() => 'Login Form', [])}>        
        <InputField showErrorMessage={emailState.showErrorMessage} errorMessage={emailState.errorMessage[0]} isTouched={emailState.isTouched} isValid={emailState.isValid} fieldName={emailState.fieldName} fieldAttributes ={emailState.fieldAttributes} value={emailState.value} changeHandler = {useCallback((e) => {const event = e; fieldChangeHandler(emailState, setEmailState, event)}, [emailState, fieldChangeHandler])}/>
        <InputField showErrorMessage={passwordState.showErrorMessage} errorMessage={passwordState.errorMessage[0]} isTouched={passwordState.isTouched} isValid={passwordState.isValid} fieldName={passwordState.fieldName} fieldAttributes ={passwordState.fieldAttributes} value={passwordState.value} changeHandler = {useCallback((e) => {const event = e; fieldChangeHandler(passwordState, setPasswordState, event)}, [])}/>                 
    </AuthenticationForm>);
    
    const FormElement = props.isLoggedin ? <Redirect to={redirectAddress} /> : AuthForm;

    return(
    <>
        { props.globalError ? <ErrorPage /> : LoaderState === true ? <Loader /> : FormElement }
    </>         
    );
} 

const mapDispatchToProps = (dispatch => {
    return {
        loginOnSubmit: (email, password, setFormErrorMessage, setLoaderState) => dispatch(login(email, password, setFormErrorMessage, setLoaderState))
    }
});

 const mapStateToProps = (state => {
     return { 
        isLoggedin: state.authentication.isLoggedin,
        globalError: state.globalError
     }    
 });

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));