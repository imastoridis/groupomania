import React from 'react';
import Header from '../../../components/headers/Header';
import Footer from '../../../components/headers/Footer';
import UserProfileInfo from './UserProfileInfo';


/* Displays user profile */
function UserProfile() {
    return (
        <div className="App">
            <Header />
            <UserProfileInfo />
            <Footer />
        </div>
    )
}

export default UserProfile;