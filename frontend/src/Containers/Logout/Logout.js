import React, { useEffect } from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {logout} from '../../Store/Actions/AuthActions';
import queryString from 'query-string';

const Logout = (props) => {    
    const redirectAddress = queryString.parse(props.location.search).redirectTo || '/';

    useEffect(() =>{
        props.logout();
    }, []);

    return (
        <Redirect to={`${redirectAddress}`} />
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(logout())
    }
}

export default connect(null, mapDispatchToProps)(Logout);