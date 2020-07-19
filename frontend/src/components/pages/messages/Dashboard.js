//Imports

import React, { useState, useEffect } from 'react';
import Header from '../../headers/Header';
import Footer from '../../headers/Footer';
import { Link } from 'react-router-dom'
import axios from 'axios'
import Paper from '@material-ui/core/Paper';
import IconLabelButtons from '../../../materialui/IconLabelButtons';

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
        userId: "",
        username: ""

    })


    //Gets all the messages
    const FetchMessages = (e) => {
        const messageData = {
            "id": state.id,
            "title": state.title,
            "content": state.content,
            "likes": state.likes,
            'userId': state.userId,
            'createdAt': state.createdAt,
            'username': state.username
        }

        axios.get("http://localhost:8080/api/messages", messageData) //Fetches all messages from API
            .then(function (response) {
                const messages = response.data
                //console.log(response.data)
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
                    {messages.map(message => (message.Users).map(username =>
                        <div >
                            <Paper elevation={4} className="messageBox" >
                                <div key={message.id}>
                                    <Link to={`/messages/${message.id}`} >
                                        <div className="messageBox__up" >
                                            <div className="messageBox__up-photo">
                                                <div>Photo</div>
                                            </div>
                                            <div className="messageBox__up-username">
                                                <div className="messageBox__fields">Username : {username.username}</div>
                                                <div className="messageBox__fields">{message.createdAt}</div>
                                            </div>

                                        </div>
                                        <div className="messageBox__middle">
                                            <h2 className="messageBox__fields">{message.title}</h2>
                                            <h3 className="messageBox__fields">{message.content}</h3>
                                        </div>
                                        <div className="messageBox__down">
                                            <div>Likes : {message.likes}</div>
                                        </div>
                                    </Link>
                        
                                </div>
                            </Paper>
                            <div className="space-between-messages"></div>
                        </div>
                    ))}

                    <Footer />
                </section>


            </div>
        )
    }
}


export default Dashboard

