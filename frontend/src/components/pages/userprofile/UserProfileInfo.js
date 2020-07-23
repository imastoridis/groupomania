//Imports
import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom'
import * as Components from '../../../materialui/Imports'

//Fetches and display profile info of user
function UserProfileInfo(props) {
    useEffect(() => {
        getUserData()
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    //Set state
    const [state, setState] = useState({
        id: "",
        email: "",
        username: "",
        bio: ""
    })

    //Declarations
    const [userInfo, setUserData] = useState([]);

    //Fetches user info
    const getUserData = e => {
        const userData = {
            "id": state.id,
            "email": state.email,
            "username": state.username,
            "bio": state.bio,
        }
        axios.get("http://localhost:8080/api/users/me", userData)
            .then(function (response) {
                setState(prevState => ({
                    ...prevState,
                    'successMessage': 'Login successful. Redirecting to home page..'
                }))
                const userInfo = [response.data]
                setUserData(userInfo)
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <section className="App">
            <main id="main-container">
                {userInfo.map(user =>
                    <div key={user.id} className="message-box" >
                        <div className="form">
                            <Components.Paper elevation={6} className="messagBox-flex-profil">
                                <div className="profil">
                                    <Components.Button color="primary"
                                        variant="contained">
                                        <h2>VOTRE PROFIL</h2>
                                    </Components.Button>
                                    <div className="profil-data">
                                        <h3>Username : {user.username}</h3>
                                    </div>
                                    <div className="profil-data">
                                        <h3>Email : {user.email}</h3>
                                    </div>
                                    <div className="profil-data">
                                        <Components.Card >
                                            <Components.CardContent>
                                                <Components.Typography variant="h5" component="h2">
                                                    À propos
                                                </Components.Typography>
                                                <Components.Typography variant="body2" component="p">
                                                    {user.bio}
                                                </Components.Typography>
                                            </Components.CardContent>
                                        </Components.Card >
                                    </div>
                                    <Link to={"/update"}  className="button">
                                        <Components.Button
                                           
                                            type="submit"
                                            variant="contained"
                                            color="primary"
                                        >Modifier votre profil</Components.Button>
                                    </Link>
                                </div>
                            </Components.Paper>
                        </div>
                    </div>
                )}
            </main>
        </section>
    )
}

export default UserProfileInfo