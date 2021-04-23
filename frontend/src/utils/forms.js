export const validate = (fieldState, value) => {
    let errorMessage = [];
    let isValid = true;

    const validate = fieldState.validate;

    if (validate.required) {
        if (!value.trim().length > 0) {
            isValid = false;
            errorMessage.push(validate.required[1]);
        }             
    }

    if (validate.email) {
        if (! /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(value)) {
            isValid = false;
            errorMessage.push(validate.email[1]);
        }
    }

    if (validate.minLength) {
        if (value.length <= validate.minLength[0]) {
            isValid = false;
            errorMessage.push(validate.minLength[1]);
        }
    }

    if(validate.validator) {
        if(! validate.validator[0](value)) {
            isValid = false;
            errorMessage.push(validate.validator[1]);
        }
    }

    return {isValid, errorMessage};
};

export const fieldChangeHandler = (fieldState, setFieldState, event) => {  

    var isTouched = true;
    isTouched = event.target.value.length < 1 ?  false : true;

    setFieldState((currentState)=>{
        return{
            ...currentState,
            value: event.target.value,
            isTouched,
            showErrorMessage: false
        }
    });

    const {isValid, errorMessage} = validate(fieldState, event.target.value);

    setFieldState((currentState)=>{            
        return{
            ...currentState,
            isValid,
            errorMessage
        }
    });
};

export  const formSubmitHandler = (fields, formSubmitAction, event) => {
    event.preventDefault();
    let valid = true;

    fields.map((field) => {            
        const [state, updateState] =  Object.keys(field);
        const fieldState = field[state];
        const updateFieldState = field[updateState];
        valid = fieldState.isValid && valid;

         if(!valid) {
            updateFieldState( currentField => {
                 return {
                     ...currentField,
                     showErrorMessage: true
                 }
            })
        }           
    });
    
    if(valid) {
        formSubmitAction();
    }
};
