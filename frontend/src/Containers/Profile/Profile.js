import React from 'react';
import ProfileContainer from '../../Components/UI/ProfileContainer/ProfileContainer';
import ProfileHeader from '../../Components/ProfileHeader/ProfileHeader';
import ProfileGeneral from '../../Components/ProfileGeneral/ProfileGeneral';
import ProfileAccess from '../../Components/ProfileAccess/ProfileAccess';
import {updateGeneralInfo, updatePassword} from '../../Store/Actions/AuthActions';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

const Profile = (props) => {
    document.title = 'HeyCart profile';
    const updateGeneral = (name, setFormErrorMessage) => {
        props.updateGeneralInfo(name, setFormErrorMessage);
    }

    const updateProfilePassword = (password, confirmPassword, setFormErrorMessage, setPasswordStatus) => {
        props.updatePassword(password, confirmPassword, setFormErrorMessage, setPasswordStatus);
    }

    let element = <ProfileContainer>
            <ProfileHeader />
            <ProfileGeneral update={updateGeneral} userData={props.authData} />
            <ProfileAccess update={updateProfilePassword} />
        </ProfileContainer>;    

    if(!props.authData.isLoggedin) {
        element = <Redirect to={`/login?redirectTo=/myprofile`} />
    }

    return(
    <>
        {element}
    </>
    );
}

const mapStateToProps = (state) => {
    return {
        authData: state.authentication
    }    
};

const mapDispatchToProps = (dispatch => {
    return {
        updateGeneralInfo: (name, setFormErrorMessage) => dispatch(updateGeneralInfo(name, setFormErrorMessage)),
        updatePassword: (password, confirmPassword, setFormErrorMessage, setPasswordStatus) => dispatch(updatePassword(password, confirmPassword,setFormErrorMessage,setPasswordStatus))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);