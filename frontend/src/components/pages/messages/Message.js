//Imports
import React, { useState, useEffect, Fragment } from 'react';
import Header from '../../headers/Header';
import Footer from '../../headers/Footer';
import Comments from './Comments';
import axios from 'axios';
import CommentForm from './Commentform';
import { Link, useHistory } from 'react-router-dom'
import Cookies from 'js-cookie'

import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';

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
                            <hr />
                            <div className="messageBox__middle">
                                <h2 className="messageBox__fields">{messages.title}</h2>
                                <h3 className="messageBox__fields">{messages.content}</h3>
                            </div>
                            <hr />
                            <div className="messageBox__down">
                                <div>Likes : {messages.likes}</div>
                                <div>Messages : number</div>
                            </div>
                            {userIdToken.userId === messages.UserId ? (
                                //If user wrote the message, shows modify/delete buttons
                                <Fragment>
                                    < div className="buttons" >
                                        <div>
                                            <Link to={`/modify/${messages.id}`}>
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    size="large"
                                                    startIcon={<SaveIcon />}>
                                                    Modify
                                                  </Button>
                                            </Link >
                                        </div>
                                        <div>
                                            <Button
                                                variant="contained"
                                                color="secondary"
                                                startIcon={<DeleteIcon />}
                                                onClick={deleteMessage}>
                                                Delete
                                             </Button>
                                        </div>
                                        <div>
                                            <Button
                                                //variant="contained"
                                                color="primary"
                                                startIcon={<ThumbUpIcon />}
                                                onClick={deleteMessage}>
                                            </Button>
                                        </div>
                                        <div>
                                            <Button
                                                //variant="contained"
                                                color="secondary"
                                                startIcon={<ThumbDownIcon />}
                                                onClick={deleteMessage}>
                                            </Button>
                                        </div>
                                    </div >
                                </Fragment>
                            ) : (
                                    <Fragment>
                                    </Fragment>
                                )}
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