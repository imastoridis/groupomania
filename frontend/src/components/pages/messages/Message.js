//Imports

import React, { useState, useEffect } from 'react';
import Header from '../../headers/Header';
import Footer from '../../headers/Footer';
import axios from 'axios';
import CommentForm from './Commentform';
import Cookies from 'js-cookie'
import Paper from '@material-ui/core/Paper';
import IconLabelButtons from '../../../materialui/IconLabelButtons';
import Comments from './Comments';
import { Divider } from '@material-ui/core';

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
        username: ""

    })


    const [showText, setShowText] = useState(false);
    const propId = match.params.id
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
            'username': state.username
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
                    <Paper elevation={4} className="messageBox" >
                        <div key={messages.id}>
                            <div className="messageBox__up">
                                <div className="messageBox_up-photo">
                                    <div>Photo</div>
                                </div>
                                <div className="messageBox_up-username">
                                    <div className="messageBox__fields">Username : {messages.username}</div>
                                    <div className="messageBox__fields">{messages.createdAt}</div>
                                </div>
                            </div>
                            <hr/>
                            <div className="messageBox__middle">
                                <h2 className="messageBox__fields">Title : {messages.title}</h2>
                                <h3 className="messageBox__fields">{messages.content}</h3>
                            </div>
                            <br></br>
                            <div className="messageBox__down">
                                <div>Likes : {messages.likes}</div>
                                <div>Messages : number</div>
                            </div>
                            <hr/>
                            <div>
                                <IconLabelButtons />
                             
                            </div>
                           
                        </div>
                    </Paper>
                    <div className="form__button">
                        <div className="form__comment-button">
                            <button type="submit"
                                onClick={() => setShowText(!showText)}
                                id="submit"
                                className="form__comment-button-style1">Laisser un commentaire</button>
                            {showText && <div><CommentForm props={propId} /></div>}
                        </div>

                    </div>
                    <div>
                        <Comments />
                    </div>
                    <Footer />
                </section>
            </div>
        )
    }
}
export default Message