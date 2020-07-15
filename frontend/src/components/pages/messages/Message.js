//Imports

import React, { useState, useEffect, Component } from 'react';
import Header from '../../headers/Header';
import Footer from '../../headers/Footer';
import axios from 'axios';
import CommentForm from './commentform';
import Cookies from 'js-cookie'

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
        userId: "",
        
    })
    const [props, setName] = useState(match.params.id)
    const [messages, setFetchMessage] = useState([]);
    const [error, setError] = useState(null);
    Cookies.set('tokenId', props);
    //Fetches one message 
    const fetchMessage = () => {

        const messageById = {
            "id": state.id,
            "title": state.title,
            "content": state.content,
            "likes": state.likes,
            'userId': state.userId,
            'createdAt': state.createdAt,
        }

        axios.get(`http://localhost:8080/api/messages/${match.params.id}`, messageById)
            .then(function (response) {
                const messages = response.data
                setFetchMessage(messages)
                
                //console.log(messages)
        
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
                    <CommentForm props={props} />
                    <Footer />
                </section>
            </div>
        )
    }
}
export default Message