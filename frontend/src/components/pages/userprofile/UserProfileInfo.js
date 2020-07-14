import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios'

function UserProfileInfo() {
    useEffect(() => {
        getUserData()
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const [state, setState] = useState({
        id: "",
        email: "",
        username: "",
        bio: ""
    })

    const [userInfo, setUserData] = useState([]);
    
    const getUserData = e => {
        //e.preventDefault();
        const userData = {
            "id": state.id,
            "email": state.email,
            "username": state.username,
            "bio": state.bio,
        }

        axios.get("http://localhost:8080/api/users/me", userData)
            .then(function (response) {
                //console.log(response)
                setState(prevState => ({
                    ...prevState,
                    'successMessage': 'Login successful. Redirecting to home page..'
                }))
                const userInfo = [response.data]
                //console.log(userInfo)
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
                    <section id="message-list" className="" key={user.id}>
                        <p>profile</p>
                        <div>Username : {user.username}</div>
                        <div>Email : {user.email}</div>
                        <div>Bio : {user.bio}</div>

                    </section>
                )}
            </main>
        </section>
    )
}

export default UserProfileInfo