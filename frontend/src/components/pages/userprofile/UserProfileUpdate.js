import React, { useEffect, useState } from 'react';
import Header from '../../../components/headers/Header';
import Footer from '../../../components/headers/Footer';
import axios from 'axios'
import UserProfileInfo from './UserProfileInfo';

//User can update his profil info
function UserProfileUpdate() {

    const [state, setState] = useState({
        id: "",
        email: "",
        username: "",
        bio: ""
    })

    //const [userInfo, setUserData] = useState([]);
    const handleInput = (e) => {
        const { id, value } = e.target
        setState(prevState => ({
            ...prevState,
            [id]: value
        }))
    }

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
                window.location.reload(false);
                // this.props.updateUser(res.data.user);
            })
            .catch(e => this.setState({ errors: e.response.data }));
    };

    return (
        <div className="App">
            <Header />
            <UserProfileInfo />
            <section id="form">
                <p id="textForm">Changez</p>

                <form onSubmit={handleForm} className="form__input" >
                    <label htmlFor="username" ></label>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        placeholder="username"
                        maxLength="50"

                        value={state.username}
                        onChange={handleInput} />

                    <label htmlFor="email"></label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="email"
                        maxLength="50"
                        value={state.email}
                        onChange={handleInput} />
                    <label htmlFor="bio"></label>
                    <input
                        type="bio"
                        name="bio"
                        id="bio"
                        placeholder="bio"
                        maxLength="100"
                        value={state.bio}
                        onChange={handleInput} />

                    <div className="form__button">
                        <button type="submit" id="submit" className="btn-style">VALIDER</button>
                    </div>
                </form>
            </section>
            <Footer />
        </div>

    )

}

export default UserProfileUpdate