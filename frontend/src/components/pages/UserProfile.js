import React, { useEffect, useState } from 'react';
import Header from '../headers/Header';
import Footer from '../headers/Footer';
import axios from 'axios'



function UserProfile() {
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
    //const [error, setError] = useState(null);
    const getUserData = (e) => {
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
                console.log(userInfo)
                setUserData(userInfo)

            }

            )
            .catch(function (error) {
                console.log(error);
            });


    }

    return (
        <div className="App">
            <section id="main-container">
                <Header />
                <main>
                    {userInfo.map(user =>
                        <section id="message-list" className="" key={user.id}>
                            <p>profile</p>
                            <div>Username : {user.username}</div>
                            <div>Email : {user.email}</div>
                            <div>Bio : {user.bio}</div>
                            <div></div>
                        </section>


                    )}

                </main>
                <Footer />
            </section>
        </div>
    )
}

export default UserProfile;