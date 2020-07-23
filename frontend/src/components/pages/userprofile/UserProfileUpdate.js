import React, { useState } from 'react';
import Header from '../../../components/headers/Header';
import Footer from '../../../components/headers/Footer';
import axios from 'axios'
import UserProfileInfo from './UserProfileInfo';
import * as Components from '../../../materialui/Imports'

//User can update his profil info
function UserProfileUpdate() {

    //Set state
    const [state, setState] = useState({
        id: "",
        email: "",
        username: "",
        bio: ""
    })

    //HandleInput for form
    const handleInput = (e) => {
        const { id, value } = e.target
        setState(prevState => ({
            ...prevState,
            [id]: value
        }))
    }
    //Updates the profile 
    const handleForm = e => {
        e.preventDefault();
        const data = {
            "id": state.id,
            "email": state.email,
            "username": state.username,
            "bio": state.bio,
        };
        axios
            .put("http://localhost:8080/api/users/me", data)
            .then(res => {
                console.log(res);
                window.location.reload();
            })
            .catch(e => this.setState({ errors: e.response.data }));
    };

    return (
        <div className="App">
            <Header />
            <UserProfileInfo />
            <main className="message-box">
                <div className="form ">
                    <Components.Paper elevation={6} className="messagBox-flex-profil" >
                        <div className='profil'>
                            <form onSubmit={handleForm}  >
                                <div>Username</div>
                                <Components.TextareaAutosize
                                    type="text"
                                    name="username"
                                    id="username"
                                    placeholder="username"
                                    maxLength="10"
                                    variant="outlined"
                                    className="form__input-title"
                                    value={state.username}
                                    onChange={handleInput} />
                                <div>Email</div>
                                <Components.TextareaAutosize
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="email"
                                    maxLength="20"
                                    variant="outlined"
                                    className="form__input-title"
                                    value={state.email}
                                    onChange={handleInput} />
                                <div>À propos </div>
                                <Components.TextareaAutosize
                                    type="bio"
                                    name="bio"
                                    id="bio"
                                    placeholder="a propos"
                                    maxLength="100"
                                    variant="outlined"
                                    className="form__input-title"
                                    value={state.bio}
                                    onChange={handleInput} />
                                <div className="button">
                                    <Components.Button
                                        type="submit"
                                        id="submit"
                                        variant="contained"
                                        color="primary">
                                        VALIDER</Components.Button>
                                </div>
                            </form>
                        </div>
                    </Components.Paper>
                </div>
            </main>
            <Footer />
        </div>
    )
}

export default UserProfileUpdate