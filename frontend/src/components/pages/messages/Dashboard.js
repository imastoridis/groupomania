//Imports

import React, { useState, useEffect } from 'react';
import Header from '../../headers/Header';
import { Link } from 'react-router-dom'
import axios from 'axios'
import Paper from '@material-ui/core/Paper';
import { connect } from "react-redux";
import moment from 'moment';

//Fetches and displays all messages on the dashboard
function Dashboard(params) {
    useEffect(() => {
        FetchMessages(params);
    }, []);

    //Set the state
    const [state] = useState({
        id: "",
        title: "",
        content: "",
        likes: "",
        userId: "",
        username: "",
        attachment: ""

    })
    //Declarations
    const [messages, setMessages] = useState([]);
    const [error, setError] = useState(null);

    //Gets all the messages
    const FetchMessages = (e) => {
        const messageData = {
            "id": state.id,
            "title": state.title,
            "content": state.content,
            "likes": state.likes,
            'userId': state.userId,
            'createdAt': state.createdAt,
            'username': state.username,
            'attachment' : state.attachment
        }
        //[0].Users[0].username
        axios.get("http://localhost:8080/api/messages", messageData)
            .then(function (response) {
                const messages = response.data
                setMessages(messages) 
            })
            .catch(function (error) {
                setError(error);
            });
    }

    // {messages.map(message => (message.Users).map(username => 
    if (error) {
        return <div><h3 className="error">{"Un problème technique ne permet pas d'accéder au service que vous désirez. Merci de réessayer ultérieurement"}</h3> </div>;
    } else {
        return (
            <div>
                <section  >
                    <Header />
                    <main>
                        {messages.map(message =>
                            <div key={message.id} className="message-box" >
                                <div >
                                    <Paper elevation={6} className="messagBox-flex">
                                        <Link to={`/messages/${message.id}`} >
                                            <div key={message.id} className="grid-container" >
                                                <div className="Photo">
                                                    <div>{messages.attachment}</div>
                                                </div>
                                                <div className="Username">
                                                    {messages.map(message => (message.Users).map(username =>
                                                        <div className="" key={username}>Username: {username.username}</div>
                                                    ))}
                                                </div>
                                                <div className="Comments">
                                                    <h3 className="">{message.content}</h3>
                                                </div>
                                                <div className="Createdat">
                                                    <div className="">Crée le : {moment(message.createdAt).format("dddd, MMMM Do YYYY, h:mm:ss a")}</div>
                                                </div>
                                                <div className="Title">
                                                    <h2 className="">{message.title}</h2>
                                                </div>
                                                <div className="Other">
                                                </div>
                                            </div>
                                        </Link>
                                    </Paper>
                                </div>
                            </div>
                        )}
                    </main>
                </section>
            </div >
        )
    }
}

const mapStateToProps = state => {
    return {
        loggedIn: state.auth.loggedIn
    };
};


export default connect(
    mapStateToProps,
)(Dashboard);

