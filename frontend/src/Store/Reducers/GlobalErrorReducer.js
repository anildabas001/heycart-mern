let initialErrorState = false;

const globalErrorReducer = (state=initialErrorState, action) => {
    switch(action.type) {
        case 'SET_GLOBAL_ERROR':
            return true;
        
        case 'RESET_GLOBAL_ERROR':
            return false;

        default:
            return state;
    }
}

export default globalErrorReducer;
