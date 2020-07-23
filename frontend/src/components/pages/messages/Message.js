//Imports
import React, { useState, useEffect, Fragment } from 'react';
import Header from '../../headers/Header';
import Comments from './Comments';
import CommentForm from './Commentform';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom'
import Cookies from 'js-cookie'

import * as Components from '../../../materialui/Imports'

// Displays one message after clicking on dashboard
function Message({ match }) {
    useEffect(() => {
        fetchMessage()
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [match.params.id])

    const [state] = useState({
        id: "",
        title: "",
        content: "",
        likes: "",
        userId: "",
        username: ""

    })

    //Declarations
    let history = useHistory();
    const [showText, setShowText] = useState(false);
    const [props] = useState(match.params.id)
    const [messages, setFetchMessage] = useState([]);
    const [error, setError] = useState(null);

    Cookies.set('messageId', props);
    const token = Cookies.get('token')
    const userIdToken = JSON.parse(atob(token.split('.')[1]));
    const propId = match.params.id

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

    //Deletes message
    const deleteMessage = () => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        axios.delete(`http://localhost:8080/api/messages/${match.params.id}`)
            .then(function (response) {
                console.log(response)
                history.push('/messages')
            })
            .catch(function (error) {
                console.log(error);
            });
    }


    /*{messages.map(message => (message.Users).map(username =>
        <div className="" key={username}>Username: {username.username}</div>
    ))}*/
    if (error) {
        return <div><h3 className="error">{"Un problème technique ne permet pas d'accéder au service que vous désirez. Merci de réessayer ultérieurement"}</h3> </div>;
    } else {
        return (
            <div>
                <section>
                    <Header />
                    <main>
                        <div key={messages.id} className="message-box" >
                            <Components.Paper elevation={6} className="messagBox-flex">
                                <div className="grid-container" >
                                    <div className="Photo">
                                        <div>Photo</div>
                                    </div>
                                    <div className="Username">
                                    </div>
                                    <div className="Comments">
                                        <h3 className="">{messages.content}</h3>
                                    </div>
                                    <div className="Createdat">
                                        <div className="">{messages.createdAt}</div>
                                    </div>
                                    <div className="Title">
                                        <h2 className="">{messages.title}</h2>
                                    </div>
                                    <div className="Other">
                                        {userIdToken.userId === messages.UserId ? (
                                            //If user wrote the message, shows modify/delete buttons
                                            <Fragment>
                                                <Link to={`/modify/${messages.id}`}>
                                                    <Components.IconButton
                                                        color="primary"                                                        >
                                                        <Components.CreateIcon />
                                                    </Components.IconButton>
                                                </Link >
                                                <Components.IconButton
                                                    color="secondary"
                                                    onClick={deleteMessage}>
                                                    <Components.DeleteIcon />
                                                </Components.IconButton>
                                                <Components.IconButton
                                                    color="primary"
                                                    onClick={deleteMessage}>
                                                    <Components.ThumbUpIcon />
                                                </Components.IconButton>
                                                <Components.IconButton
                                                    color="secondary"
                                                    onClick={deleteMessage}>
                                                    <Components.ThumbDownIcon />
                                                </Components.IconButton>
                                            </Fragment>
                                        ) : (
                                                <Fragment>
                                                </Fragment>
                                            )}
                                        <div>Likes : {messages.likes}</div>
                                    </div>
                                </div>
                            </Components.Paper>
                        </div>
                    </main>
                    <div className="form__button">
                        <div className="form__comment-button">
                            <Components.Button
                                variant="contained"
                                type="submit"
                                color="primary"
                                onClick={() => setShowText(!showText)}
                                id="submit"
                                className="form__comment-button-style1">Laisser un commentaire</Components.Button>
                            {showText && <div><CommentForm props={propId} /></div>}
                        </div>
                    </div>
                    <div>
                        <Comments />
                    </div>

                </section >
               
            </div >
        )
    }
}
export default Message