//Imports

import React, { useState, useEffect } from 'react';
import Header from '../../headers/Header';
import Footer from '../../headers/Footer';
import { Link } from 'react-router-dom'
import axios from 'axios'


function Dashboard() {
    useEffect(() => {
        FetchMessages();
    }, []);

    /* Constants */

    const [messages, setMessages] = useState([]);

    const [error, setError] = useState(null);
    //Set the state

    const [state, setState] = useState({
        id: "",
        title: "",
        content: "",
        likes: "",
        userId: ""

    })

    //Gets all the messages
    const FetchMessages = (e) => {
        const messageData = {
            "id": state.id,
            "title": state.title,
            "content": state.content,
            "likes": state.likes,
            'userId': state.userId,
            'createdAt': state.createdAt
        }

        axios.get("http://localhost:8080/api/messages", messageData) //Fetches all messages from API
            .then(function (response) {
                const messages = response.data
                setMessages(messages) //Sets the data in "messages"

            })
            .catch(function (error) {
                setError(error);
            });
    }

    if (error) {
        return <div><h3 className="error">{"Un problème technique ne permet pas d'accéder au service que vous désirez. Merci de réessayer ultérieurement"}</h3> </div>;
    } else {
        return (

            <div className="App">
                <section id="main-container" >
                    <Header />
                    {messages.map(message =>

                        <div className="messageBox" key={message.id}>
                            <Link to={`/messages/${message.id}`} >
                                <div className="messageBox-up" >
                                    <div>Photo</div>
                                    <div>{message.title}</div>

                                    <div>{message.createdAt}</div>
                                </div>
                                <div className="messageBox-middle">

                                    <div>{message.content}</div>
                                </div>
                                <div className="messageBox-down">
                                    <div>Likes : {message.likes}</div>
                                    <div>Username : {message.Users.username}</div>
                                </div>
                            </Link>
                        </div>

                    )}

                    <Footer />
                </section>
            </div>
        )
    }
}


export default Dashboard

