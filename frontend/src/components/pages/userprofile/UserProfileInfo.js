//Imports
import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { Link, useHistory } from 'react-router-dom'
import * as Components from '../../../materialui/Imports'
import Cookies from 'js-cookie'

//Fetches and display profile info of user
function UserProfileInfo(props) {
    useEffect(() => {
        getUserData()
        Cookies.get('token');
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
    let history = useHistory();

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
                }))
                const userInfo = [response.data]
                setUserData(userInfo)
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    //Deletes message
    const deleteUser = () => {
        axios.delete('http://localhost:8080/api/users/me')
            .then(function (response) {
                Cookies.remove('token');
                window.location.reload()
                history.push('/')
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
                                    <Components.Button color="primary">
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
                                    <Link to={"/update"} className="button">
                                        <Components.Button

                                            type="submit"
                                            variant="contained"
                                            color="primary"
                                        >Modifier votre profil</Components.Button>
                                    </Link>
                                    <div className="button">
                                        <Components.Button
                                            onClick={deleteUser}
                                            type="submit"
                                            variant="contained"
                                            color="secondary"
                                        >Supprimer votre profil</Components.Button>
                                    </div>
                                </div>
                            </Components.Paper>
                        </div>
                    </div>
                )}
            </main>
        </section >
    )
}

export default UserProfileInfo