//Imports
import React, { useState, useEffect, Fragment } from 'react';
import Header from '../../headers/Header';
import Comments from './Comments';
import CommentForm from './Commentform';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom'
import Cookies from 'js-cookie'
import moment from 'moment';
import Container from '@material-ui/core/Container';
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
                let obj = {
                    
                }
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
            <div>
                <section>
                    <Header />
                    <Container maxWidth="lg">
                        <div key={messages.id} className="message-box" >
                            <Components.Paper elevation={6} className="messagBox-flex">
                                <div className="grid-container" >
                                    <div className="Photo">
                                        <div></div>
                                    </div>
                                    <div className="Username">
                                    </div>
                                    <div className="Comments">
                                        <img src={`/images/${messages.attachment}`} onError={i => i.target.style.display = 'none'} className="image"></img>
                                        <h3 className="">{messages.content}</h3>
                                    </div>
                                    <div className="Createdat">
                                        <div className="">Crée le : {moment(messages.createdAt).format("dddd, MMMM Do YYYY, h:mm:ss a")}</div>
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
                                            </Fragment>
                                        ) : (
                                                <Fragment>
                                                </Fragment>
                                            )}
                                    </div>
                                </div>
                            </Components.Paper>
                        </div>
                    </Container>
                    <div className="form__button-comment">
                        <div className="form__button-newcomment">
                            <Components.Button
                                variant="contained"
                                type="submit"
                                color="primary"
                                onClick={() => setShowText(!showText)}
                                id="submit"
                            >Laisser un commentaire</Components.Button>
                            {showText &&
                                <div className="section2" ><CommentForm props={propId} /></div>}
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