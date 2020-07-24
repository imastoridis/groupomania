import React from 'react';
import Header from '../../../components/headers/Header';
import UserProfileInfo from './UserProfileInfo';


/* Displays user profile */
function UserProfile() {
    return (
        <div className="App">
            <Header />
            <UserProfileInfo />
        </div>
    )
}

export default UserProfile;