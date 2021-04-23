import React, {useState, useRef, useCallback, useEffect} from 'react';
import useInputHandler from '../../Custom Hooks/useInputHandler';
import AuthenticationForm from '../../Components/UI/AuthenticationForm/AuthenticationForm';
import InputField from '../../Components/UI/InputField/InputField';
import Loader from '../../Components/UI/Loader/Loader';
import {Redirect} from 'react-router';
import * as queryString from 'query-string';
import {connect} from 'react-redux';
import {signup} from '../../Store/Actions/AuthActions';
import {fieldChangeHandler, formSubmitHandler} from '../../utils/forms';

const Signup = (props) => {
    document.title = 'HeyCart Signup';
    const [formErrorMessage, setFormErrorMessage] = useState('');
    const [LoaderState, setLoaderState] = useState(false);

    const password = useRef();

    const [nameState, setNameState] = useState({
        fieldName: 'input',
        fieldAttributes: {
            type: 'text',
            label: 'Name',
            name: 'name',
            placeholder: 'Enter Your Name'
        },
        showErrorMessage: false,
        value: '',
        errorMessage: ['Name must not be empty'],
        isValid: false,
        isTouched: false,
        validate: {
            required: [true, 'Name must not be empty']
        }
    });

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

    const [confirmPasswordState, setConfirmPasswordState] = useState({
        fieldName: 'input',
        fieldAttributes: {
            type: 'password',
            label: 'Confirm Password',
            name: 'confirmPassword',
            placeholder: 'Confirm Password'
        },
        showErrorMessage: false,
        value: '',
        errorMessage: ['Confirm Password must not be empty'],
        isValid: false,
        isTouched: false,
        validate: {
            required: [true, 'Confirm Password must not be empty'],
            validator: [ (value) => {
                if(password.current.value !== value) {
                    return false;
                }
                else {
                    return true;
                }
            },
            'Confirm Password and Password fields are not matching'
            ]
        }
    });

    const formSubmitAction = () => { 
        props.signupOnSubmit(nameState.value, emailState.value, passwordState.value, confirmPasswordState.value, setFormErrorMessage, setLoaderState);
    }

    useEffect(() => {
         return () => { 
            setLoaderState(false);   
         }
    }, []);

    const redirectAddress = queryString.parse(props.location.search).redirectTo || '/';

    const AuthForm = (
        <AuthenticationForm formErrorMessage={formErrorMessage} formSubmitHandler={(event) => formSubmitHandler([{emailState, setEmailState}, {passwordState, setPasswordState}, {confirmPasswordState, setConfirmPasswordState}, {nameState, setNameState}], formSubmitAction, event)} AuthFormType='Signup' heading="Signup Form">
            <InputField showErrorMessage={nameState.showErrorMessage} errorMessage={nameState.errorMessage[0]} isTouched={nameState.isTouched} isValid={nameState.isValid} fieldName={nameState.fieldName} fieldAttributes ={nameState.fieldAttributes} value={nameState.value} changeHandler = {useCallback((e) => {const event = e; fieldChangeHandler(nameState, setNameState, event)}, [nameState, fieldChangeHandler])}/>
            <InputField showErrorMessage={emailState.showErrorMessage} errorMessage={emailState.errorMessage[0]} isTouched={emailState.isTouched} isValid={emailState.isValid} fieldName={emailState.fieldName} fieldAttributes ={emailState.fieldAttributes} value={emailState.value} changeHandler = {useCallback((e) => {const event = e; fieldChangeHandler(emailState, setEmailState, event)}, [emailState, fieldChangeHandler])}/>
            <InputField ref={password} showErrorMessage={passwordState.showErrorMessage} errorMessage={passwordState.errorMessage[0]} isTouched={passwordState.isTouched} isValid={passwordState.isValid} fieldName={passwordState.fieldName} fieldAttributes ={passwordState.fieldAttributes} value={passwordState.value} changeHandler = {useCallback((e) => { const event = e; fieldChangeHandler(passwordState, setPasswordState, event)},[passwordState, fieldChangeHandler])}/>
            <InputField showErrorMessage={confirmPasswordState.showErrorMessage} errorMessage={confirmPasswordState.errorMessage[0]} isTouched={confirmPasswordState.isTouched} isValid={confirmPasswordState.isValid} fieldName={confirmPasswordState.fieldName} fieldAttributes ={confirmPasswordState.fieldAttributes} value={confirmPasswordState.value} changeHandler = {useCallback((e) => {const event = e; fieldChangeHandler(confirmPasswordState, setConfirmPasswordState, event)}, [confirmPasswordState, fieldChangeHandler])}/>  
        </AuthenticationForm>
    );

    const FormElement = props.isLoggedin ? <Redirect to={redirectAddress} /> : AuthForm;

    return (
    <>
        { LoaderState === true ? <Loader /> : FormElement }
    </> 
    );
} 

const mapDispatchToProps = (dispatch => {
    return {
        signupOnSubmit: (name, email, password, confirmPassword, setFormErrorMessage, setLoaderState) => dispatch(signup(name, email, password, confirmPassword, setFormErrorMessage, setLoaderState))
    }
});

 const mapStateToProps = (state => {
     return { 
        isLoggedin: state.authentication.isLoggedin
     }    
 });

export default connect(mapStateToProps, mapDispatchToProps)(Signup);