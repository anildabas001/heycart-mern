import React, {memo} from 'react';
import classes from './InputField.module.css';
import ErrorField from '../ErrorField/ErrorField';

const InputField = (props, ref) => {
    
    switch(props.fieldName) {
        case 'input': 
            let inputClass;
            if (props.isValid && props.isTouched) {
                inputClass = classes.InputValid;
            }
            else if (!props.isValid && !props.isTouched) {
                inputClass = null;
            }
            else {
                inputClass = classes.InputInValid;
            }

            return (
                <div className={classes.InputFieldContainer}>
                    <div className={classes.FieldRow}>
                        <label htmlFor={props.fieldAttributes.name}>{props.fieldAttributes.label}</label>
                        <div className={classes.InputDiv}>                            
                            <input {...props.fieldAttributes} ref={ref}  value={props.value} id={props.fieldAttributes.name} onChange={props.changeHandler} />
                            {props.errorMessage && props.showErrorMessage ? <ErrorField>{props.errorMessage}</ErrorField>: null}
                        </div>
                    </div> 
                </div>
            );
    }
}

export default memo(React.forwardRef(InputField));