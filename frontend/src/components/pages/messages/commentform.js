//Imports

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Divider from '@material-ui/core/Divider';


/** Comment form. It displays with button click on Message Component */
function CommentForm({ props }) {
    useEffect(() => {
    }, []);

    //Set state
    const [state, setState] = useState({
        content: "",
        id: "",
        MessageId: "",
        newMessageError: null
    })

    // Declarations
    const [comments, setComments] = useState([]);
    const [error] = useState(null);

    //Handlechange for form
    const handleChange = (e) => {
        const { id, value } = e.target
        setState(prevState => ({
            ...prevState,
            [id]: value
        }))
    }

    //HandleSubmit - creates new comment, adds it to DB 
    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = {
            "content": state.content,
            "MessageId": props
        }
        //Gets token for user
        axios.post("http://localhost:8080/api/comment", payload)
            .then(function (response) {
                console.log(response)
                if (response.status === 201) {
                    const comments = response.data
                    setComments(comments)
                    window.location.reload()
                }
                else if (response.data.code === 204) {
                    console.log(error);
                }
                else {
                    console.log(response)
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    if (error) {
        return <div><h3 className="error">{"Un problème technique ne permet pas d'accéder au service que vous désirez. Merci de réessayer ultérieurement"}</h3> </div>;
    } else {
        //Displays the comment form
        return (
            <div className="form">
                <form className="form__input" noValidate autoComplete="off">
                    <div >
                        <TextareaAutosize
                            rowsMin={10}
                            id="content"
                            placeholder="Votre commentaire*"
                            value={state.content}
                            onChange={handleChange}
                            label="Votre commentaire"
                            variant="outlined"
                            className="form__input-title"
                        />
                    </div>
                    <div className="form__comment-button">
                        <button type="submit"
                            onClick={handleSubmit}
                            id="submit"
                            className="form__comment-button-style">Valider</button>
                    </div>
                </form>
                <Divider />
            </div>
        )
    }
}

export default CommentForm