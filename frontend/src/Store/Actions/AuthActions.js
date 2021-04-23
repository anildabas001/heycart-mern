const AsyncAuthMehtod = (reqBody, url, setErrorMessage, setLoaderState) => {
    setLoaderState(true);

    return (dispatch, getState) => {
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': 'true',
                
             },
            credentials: 'include',
            mode: 'cors',
            body: JSON.stringify(reqBody)
        }).then (response => response.json())
        .then(response => { 
            if(response.status === 'success') {
                let expiryTimer = getState().expiryTimer;
                let timer = new Date(response.data.expiresAt).getTime() - Date.now() + 10000;

                if(expiryTimer) {
                    clearTimeout(expiryTimer);                    
                }

                expiryTimer = setTimeout(() => {
                    dispatch({type:'LOGOUT'});
                }, timer)

                setLoaderState(false);                 
                dispatch({type:'LOGIN', name: response.data.user, email: response.data.email, expiresAt: response.data.expiresAt, isLoggedin: true, expiryTimer: expiryTimer});
            }
            else {
                setLoaderState(false);
                setErrorMessage(response.message);                
            }

        }).catch(err=>{
            dispatch({type: 'SET_GLOBAL_ERROR'});
            // dispatch({type: 'ERROR', error: err.message});
        })
    }
}

export const login = (email, password, setErrorMessage, setLoaderState) => {
    return AsyncAuthMehtod({email: email, password: password}, '/api/v1/user/login', setErrorMessage, setLoaderState);
}

export const signup = (name, email, password, confirmPassword, setErrorMessage, setLoaderState) => {
    return AsyncAuthMehtod({name: name, email: email, password: password, confirmPassword: confirmPassword}, '/api/v1/user/signup', setErrorMessage, setLoaderState);
}

export const logout = () => {
    return (dispatch) => {
        fetch('/api/v1/user/logout', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': 'true',
                
             },
            credentials: 'include',
            mode: 'cors'
        })
        .then(response => response.json())
        .then(response => {
            dispatch({type: 'LOGOUT'});            
        })
        .catch(err => dispatch({type: 'LOGOUT'})    );
    }
}

export const updateGeneralInfo = (name, setErrorMessage) => {
    const reqBody = {
        name
    }
    return (dispatch, getState) => { 
        fetch('/api/v1/user/modify?fieldToModify=name', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': 'true'
             },
            credentials: 'include',
            mode: 'cors',
            body: JSON.stringify(reqBody)
        }).then(response => response.json())
        .then(
            response => {
                if(response.status === 'success') {
                    dispatch({type:'UPDATE_GENERAL_INFO', name: response.data.name});
                }
                else if(response.status === 'fail') {
                    setErrorMessage(response.message);
                }  
                else {
                    dispatch({type: 'SET_GLOBAL_ERROR'});
                }              
            }
        ).catch(err=>{
            dispatch({type: 'SET_GLOBAL_ERROR'});
            // dispatch({type: 'ERROR', error: err.message});
        })
    }
}

export const updatePassword = (password, confirmPassword, setErrorMessage, setPasswordStatus) => {
    const reqBody = {
        password,
        confirmPassword
    }
    return (dispatch) => { 
        fetch('/api/v1/user/modify?fieldToModify=password', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': 'true'
             },
            credentials: 'include',
            mode: 'cors',
            body: JSON.stringify(reqBody)
        }).then(response => response.json())
        .then(
            response => {
                if(response.status === 'success') {
                    setPasswordStatus('password updated');
                    setTimeout(() => {
                        setPasswordStatus('');
                    }, 3000);
                }
                else if (response.status === 'fail') { 
                    setErrorMessage(response.message);
                }            
            }
        ).catch(err=>{
            dispatch({type: 'SET_GLOBAL_ERROR'});
        })
    }
}