//Imports

import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie'
import { Link } from 'react-router-dom'
import * as Components from '../../../materialui/Imports'
import moment from 'moment';
import Container from '@material-ui/core/Container';
/* Displays the comments under the message */
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


    //Fetches all comments from API
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

    return (
        <div >
            <section>
                <Container maxWidth="lg">
                    {comments.map(comment =>
                        <div key={comment.id} className="message-box" >
                            <Components.Paper elevation={6} className="messagBox-flex">
                                <div key={comment.id} className="grid-container-comment" >
                                    <div className="Comments">
                                        <h3 className="">{comment.content}</h3>
                                    </div>
                                    <div className="Createdat">
                                        <div className="">Crée le : {moment(comment.createdAt).format("dddd, MMMM Do YYYY, h:mm:ss a")}</div>
                                    </div>
                                    <div className="Title">
                                        <h2 className="">{comment.title}</h2>
                                    </div>
                                    <div className="Other">
                                        {userIdToken.userId === comment.userId ? (
                                            //If user wrote the comment, shows modify/delete buttons
                                            <Fragment>
                                                <Link to={`/modifycomment/${comment.id}`}>
                                                    <Components.IconButton
                                                        variant="contained"
                                                        color="primary"
                                                        size="small">
                                                        <Components.CreateIcon />
                                                    </Components.IconButton>
                                                </Link >
                                                <Components.IconButton
                                                    variant="contained"
                                                    color="secondary"
                                                    size="small"
                                                    onClick={e => deleteComment(comment.id)}>
                                                    <Components.DeleteIcon />
                                                </Components.IconButton >
                                            </Fragment>
                                        ) : (
                                                <Fragment>
                                                </Fragment>
                                            )}
                                    </div>
                                </div>
                            </Components.Paper>
                        </div>
                    )}
                </Container>
            </section>
        </div>
    )

}


export default Comments