
let initialState = {
    name: '',
    email: '',
    expiresAt: '',
    isLoggedin: false,
    expiryTimer: null
}

if(localStorage.getItem('authenticationData')) {
    let localAuthState = JSON.parse(localStorage.getItem('authenticationData'));
    if (new Date(localAuthState.expiresAt) > new Date()) {        
        initialState = localAuthState;
    }
    else {
        localStorage.removeItem("authenticationData");
    }       
}

const authReducer = (state=initialState, action) => {
    switch(action.type) {
        case 'LOGIN':
            const updatedState = {
                ...state,
                name: action.name,
                email: action.email,
                expiresAt: action.expiresAt,
                isLoggedin: action.isLoggedin,
                expiryTimer: action.expiryTimer             
            }

            localStorage.setItem("authenticationData", JSON.stringify(updatedState));
            return updatedState;
        case 'LOGOUT': 
            clearTimeout(state.expiryTimer);
            localStorage.removeItem("authenticationData");

            const updatedLogoutState = {
                name: '',
                email: '',
                expiresAt: '',
                isLoggedin: false,
                expiryTimer: null
            }
            
            return updatedLogoutState;

        case 'UPDATE_GENERAL_INFO': 
            const updatedStateGeneral = {
                ...state,
                name: action.name,            
            }

            localStorage.setItem("authenticationData", JSON.stringify(updatedStateGeneral));
            return updatedStateGeneral;

        default: 
            return state;
        
    }
}

export default authReducer;