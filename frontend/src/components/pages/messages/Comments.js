//Imports

import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie'
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import { Link } from 'react-router-dom'

function Comments() {
    useEffect(() => {
        fetchComments();
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    //Set the state
    const [state] = useState({
        id: "",
        MessageId: "",
        content: "",
        likes: "",
        UserId: ""
    })

    //Declarations
    const [comments, setComments] = useState([]);
    const [error, setError] = useState(null);
    const token = Cookies.get('token')
    const cookie = Cookies.get('messageId')
    const userIdToken = JSON.parse(atob(token.split('.')[1]));


    //Fetches all messages from API
    const fetchComments = (e) => {
        const commentData = {
            "id": state.id,
            "MessageId": state.MessageId,
            "content": state.content,
            "likes": state.likes,
            'UserId': state.UserId,
            'createdAt': state.createdAt
        }

        axios.get(`http://localhost:8080/api/comment/`, commentData)
            .then(function (response) {
                //Checks if message
                let i = -1
                while (i < response.data.length) {
                    i++
                    if (response.data[i].MessageId == cookie) { //For username
                        var commentsAll = comments.push(response.data[i])
                        setComments(comments)
                        console.log(response.data[i])
                    } else {
                        continue
                    }
                }
            })
            .catch(function (error) {
                setError(error);
            });
    }

    //Deletes comment
    const deleteComment = (e) => {
        //axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        axios.delete(`http://localhost:8080/api/comment/${e}`)
            .then(function (response) {
                window.location.reload()
            })
            .catch(function (error) {
                console.log(error);
            });
    }
// {messages.map(message => (message.Users).map(username =>
    return (
        <div >
            {comments.map(comment =>
                <div className="App" key={comment.id}>
                    <section id="main-container">
                        <Paper elevation={4} className="messageBox" >
                            <div >
                                <div className="messageBox__up">
                                    <div className="messageBox__up-photo">
                                        <div >Photo</div>
                                    </div>
                                    <div className="messageBox__up-username">
                                        <div className="messageBox__fields">UserId : {comment.UserId}</div>
                                        <div className="messageBox__fields">{comment.createdAt}</div>
                                    </div>
                                </div>
                                <hr />
                                <div className="messageBox__middle">
                                    <h3 className="messageBox__fields">{comment.content}</h3>
                                </div>
                                <hr />
                                <div className="messageBox__down">
                                    <div>Likes : {comment.likes} </div>
                                    <div>MessageId : {comment.MessageId}</div>
                                </div>
                            </div>
                            {userIdToken.userId === comment.userId ? (
                                <Fragment>
                                    <div className="buttons">
                                        <div >
                                            <Link to={`/modifycomment/${comment.id}`}>
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
                                                onClick={e => deleteComment(comment.id)}>
                                                Delete
                                            </Button>
                                        </div>
                                        <div>
                                            <Button
                                                //variant="contained"
                                                color="primary"
                                                startIcon={<ThumbUpIcon />}>
                                            </Button>
                                        </div>
                                        <div>
                                            <Button
                                                //variant="contained"
                                                color="secondary"
                                                startIcon={<ThumbDownIcon />}>
                                            </Button>
                                        </div>
                                    </div>

                                </Fragment>
                            ) : (
                                    <Fragment>
                                    </Fragment>
                                )}

                        </Paper>
                        <div className="space-between-messages"></div>
                    </section>
                </div>
            )}
        </div>
    )
}

export default Comments