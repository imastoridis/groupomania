//Imports

import React, { useState, useEffect } from 'react';
import axios from 'axios';



function Comments({ match }) {

    useEffect(() => {
        fetchComments();

        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // }, [match.params.id]);

    const [error, setError] = useState(null);

    //Set the state
    const [state, setState] = useState({
        id: "",
        MessageId: "",
        content: "",
        likes: "",
        UserId: ""
    })


    //const [props, setName] = useState(match.params.id)
    const [comments, setComments] = useState([]);


    //const props = match.params.id
    const fetchComments = (e) => {
        const commentData = {
            "id": state.id,
            "MessageId": state.MessageId,
            "content": state.content,
            "likes": state.likes,
            'UserId': state.UserId,
            'createdAt': state.createdAt
        }

        axios.get(`http://localhost:8080/api/comment/`, commentData) //Fetches all messages from API
            .then(function (response) {
                const comments = response.data
                setComments(comments)
                
                
                // console.log(response.data)
                /*let i = 0
                while (i < response.data.length) {
                    i++
                    if (response.data[i].MessageId = 2) {
                        const comments = response.data[i]
                        setComments(comments)
                        //continue
                    }

                }*/

                /*
                    console.log(response.data.length)
                    //console.log(response.data)
                    while ( i <response.data.length ) {
                        if (response.data[i].MessageId = 2) {
                            const comments = response.data[i]
                            console.log(response.data[i])
                            console.log(response.data)
                            console.log(response.data[i].MessageId)
                            //console.log(state.MessageId)
                            setComments(comments) //Sets the data in "comments"
                           
                        } else {
                            response.status(404).json({ "error": "no comments found" });
                        }
                        i++
                    }*/

                /* for (i = 0; i < response.data.length; i++) {
                     if (response.data[i].MessageId === 2) {
                         const comments = response.data[i]
                         console.log(response.data[i])
                         console.log(response.data)
                         console.log(response.data[i].MessageId)
                         //console.log(state.MessageId)
                         setComments(comments) //Sets the data in "comments"
                     } else {
                         response.status(404).json({ "error": "no comments found" });
                     }
                 }*/
            })
            .catch(function (error) {
                setError(error);
            });
    }

    return (
        <div>
            {comments.map(comment =>
                <div className="App" key={comment.id}>
                    <section id="main-container">
                        <div className="messageBox" >
                            <div className="messageBox-up">
                                <div>Photo</div>
                                <div>UserId : {comment.UserId}</div>
                                <div>{comment.createdAt}</div>
                            </div>
                            <div className="messageBox-middle">
                                <div>{comment.content}</div>
                            </div>
                            <div className="messageBox-down">
                                <div>Likes : {comment.likes} </div>
                                <div>MessageId : {comment.MessageId}</div>
                            </div>
                        </div>
                    </section>
                </div>
            )
            }

        </div>

    )

}

export default Comments