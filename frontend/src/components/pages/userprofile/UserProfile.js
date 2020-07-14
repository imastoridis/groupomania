import React from 'react';
import Header from '../../../components/headers/Header';
import Footer from '../../../components/headers/Footer';
import UserProfileInfo from './UserProfileInfo';
import { Link } from 'react-router-dom'

function UserProfile() {

    return (

        <div className="App">
            <Header />
            <UserProfileInfo />
            <Link to={"/update"}>
                <h2>Modifiez votre profil</h2>
            </Link>
            <Footer />
        </div>

    )
}

export default UserProfile;