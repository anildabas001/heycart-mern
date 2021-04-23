import React, {useState} from 'react';
import classes from './ProfileGeneral.module.css';
import InputField from '../../Components/UI/InputField/InputField';
import Button from '../UI/Button/Button';
import {fieldChangeHandler, formSubmitHandler} from '../../utils/forms';

const ProfileGeneral = (props) => {
    const [formError, setFormError] = useState('');
    const [nameState, setNameState] = useState({
        fieldName: 'input',
        fieldAttributes: {
            type: 'text',
            label: 'Name',
            name: 'name',
            placeholder: ''
        },
        showErrorMessage: false,
        value: props.userData.name,
        errorMessage: ['Name must not be empty'],
        isValid: true,
        isTouched: true,
        validate: {
            required: [true, 'Name must not be empty']
        }
    });

    const formSubmitAction = () => { 
        props.update(nameState.value, setFormError);
    };

    return (
        <div className={classes.ProfileGeneral}>
            <h1>My Profile</h1>
            <form onSubmit={(evnt)=>{formSubmitHandler([{nameState, setNameState}], formSubmitAction, evnt)}}>
             <fieldset style={{border: '1px solid #222', padding: '10px'}}>
              <legend style={{marginLeft: '10px'}}>General Information</legend>
              <InputField fieldName='input' fieldAttributes ={{
                    type: 'text',
                    label: 'Email',
                    name: 'email',
                    placeholder: '',
                    disabled:'disabled'
                }} value={props.userData.email} />
                <InputField showErrorMessage={nameState.showErrorMessage} errorMessage={nameState.errorMessage[0]} isTouched={nameState.isTouched} isValid={nameState.isValid} fieldName={nameState.fieldName} fieldAttributes={nameState.fieldAttributes} value={nameState.value} changeHandler = {(eve) => {fieldChangeHandler(nameState, setNameState, eve)}} />                
                <p style={{fontSize: '0.8rem', color: '#c1272d', textAlign: 'center'}}>{formError}</p>
                <div style={{width: '100%', margin: '10px auto'}}><Button>Save</Button></div>                
             </fieldset>
            </form>
        </div>
    );
}

export default ProfileGeneral;