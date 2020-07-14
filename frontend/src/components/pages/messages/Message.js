//Imports

import React, { useState, useEffect } from 'react';
import Header from '../../headers/Header';
import Footer from '../../headers/Footer';
import axios from 'axios';

// Displays one message after clicking on dashboard
function Message({ match }) {

    useEffect(() => {
        fetchMessage()
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [match.params.id])

    const [state, setState] = useState({
        id: "",
        title: "",
        content: "",
        likes: "",
        userId: ""
    })
    const [messages, setFetchMessage] = useState([]);
    const [error, setError] = useState(null);

    //Fetches one message 
    const fetchMessage = () => {
        
        const messageById = {
            "id": state.id,
            "title": state.title,
            "content": state.content,
            "likes": state.likes,
            'userId': state.userId,
            'createdAt': state.createdAt
        }

        axios.get(`http://localhost:8080/api/messages/${match.params.id}`, messageById)
            .then(function (response) {
                const messages = response.data
                setFetchMessage(messages)
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
                <section id="main-container">
                    <Header />
                    <div className="messageBox" key={messages.id}>
                        <div className="messageBox-upper">
                            <div>Photo</div>
                            <div>Username : {messages.title}</div>
                            <div>{messages.createdAt}</div>
                        </div>
                        <div>
                            <h2>{messages.title}</h2>
                            <div>{messages.content}</div>
                        </div>
                        <div>{messages.likes}</div>
                    </div>
                    <Footer />
                </section>
            </div>
        )
    }
}
export default Message