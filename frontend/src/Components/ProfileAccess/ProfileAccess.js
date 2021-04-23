import React, {useState, useRef} from 'react';
import classes from './ProfileAccess.module.css';
import InputField from '../../Components/UI/InputField/InputField';
import Button from '../UI/Button/Button';
import {fieldChangeHandler, formSubmitHandler} from '../../utils/forms';

const ProfileAccess = (props) => {

    const password = useRef();
    const confirmPassword = useRef();
    const [formError, setFormError] = useState('');
    const [passwordStatus, setPasswordStatus] = useState('');
    
    const [passwordState, setPasswordState] = useState({
        fieldName: 'input',
        fieldAttributes: {
            type: 'password',
            label: 'New Password',
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
            label: 'Confirm New Password',
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
        props.update(passwordState.value, confirmPasswordState.value ,setFormError, setPasswordStatus);
    };

    return (
        <div className={classes.ProfileAccess}>
            <form onSubmit={(evnt)=>{formSubmitHandler([{passwordState, setPasswordState}, {confirmPasswordState, setConfirmPasswordState}], formSubmitAction, evnt)}}>
             <fieldset style={{border: '1px solid #222', padding: '10px'}}>
              <legend style={{marginLeft: '10px'}}>Password Update</legend>
                <InputField ref={password} showErrorMessage={passwordState.showErrorMessage} errorMessage={passwordState.errorMessage[0]} isTouched={passwordState.isTouched} isValid={passwordState.isValid} fieldName={passwordState.fieldName} fieldAttributes={passwordState.fieldAttributes} value={passwordState.value} changeHandler = {(eve) => {fieldChangeHandler(passwordState, setPasswordState, eve)}} />
                <InputField ref={confirmPassword} showErrorMessage={confirmPasswordState.showErrorMessage} errorMessage={confirmPasswordState.errorMessage[0]} isTouched={confirmPasswordState.isTouched} isValid={confirmPasswordState.isValid} fieldName={confirmPasswordState.fieldName} fieldAttributes={confirmPasswordState.fieldAttributes} value={confirmPasswordState.value} changeHandler = {(eve) => {fieldChangeHandler(confirmPasswordState, setConfirmPasswordState, eve)}} />
                <p style={{fontSize: '0.9rem', fontWeight: '400', color: '#4caf50', textAlign: 'center'}}>{passwordStatus}</p>
                <p style={{fontSize: '0.8rem', color: '#c1272d', textAlign: 'center'}}>{formError}</p>
                <div style={{width: '100%', margin: '10px auto'}}><Button>Update Password</Button></div>                
             </fieldset>
            </form>
        </div>
    );
}

export default ProfileAccess;