//Imports

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie'
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
//import CommentFormTest from './CommentFormTest'


/** Comment form. It displays with button click on Message Component */
function CommentForm({ props }) {
    useEffect(() => {
    }, []);

    const [state, setState] = useState({
        content: "",
        id: "",
        MessageId: "",
        newMessageError: null
    })

    // Variables
    const token = Cookies.get('token')
    const [comments, setComments] = useState([]);
    const [error, setError] = useState(null);




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
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
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
                    //props.showError("Username does not exists");
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

/*     <form className="form_input">
                        <label htmlFor="content"></label>
                        <input className="form_input-title"
                            type="text"
                            name="content"
                            id="content"
                            placeholder="votre commentaire*"
                            value={state.content}
                            onChange={handleChange}
                        />

                    </form>

                    <div className="form__button">
                        <button type="submit" onClick={handleSubmit} id="submit" className="btn-style">Valider votre commentaire</button>
                    </div>*/