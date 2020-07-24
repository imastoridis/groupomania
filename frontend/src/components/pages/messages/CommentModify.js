//Imports

import React, { useState, useEffect } from 'react';
import Header from '../../headers/Header';
import axios from 'axios';
import Cookies from 'js-cookie'
import { Link, useHistory } from "react-router-dom";

import * as Components from '../../../materialui/Imports'

function CommentModify({ match }) {
    useEffect(() => {
    }, [match.params.id])

    //Set state
    const [state, setState] = useState({
        id: match.params.id,
        title: "",
        content: "",
    })

    // Declarations
    const [error, setError] = useState(null);
    const messageId = Cookies.get('messageId')
    let history = useHistory();

    //HandleChange on form
    const handleChange = (e) => {
        const { id, value } = e.target
        setState(prevState => ({
            ...prevState,
            [id]: value
        }))
    }

    //Modifies the comment and redirects to the message
    const handleSubmit = e => {
        e.preventDefault();
        const messageByIdata = {
            "id": state.id,
            "content": state.content,
        };
        axios.put(`http://localhost:8080/api/comment/${match.params.id}`, messageByIdata)
            .then(response => {
                history.push(`/messages/${messageId}`)
            })
            .catch(function (error) {
                setError(error);
            });
    };

    if (error) {
        return <div><h3 className="error">{"Un problème technique ne permet pas d'accéder au service que vous désirez. Merci de réessayer ultérieurement"}</h3> </div>;
    } else {
        return (
            <div>
                <div className="App">
                    <section id="main-container">
                        <Header />
                        <main>
                        <Components.Paper elevation={6} className="form-container">
                                <div className="form">
                                    <Components.Button color="primary">
                                        <p>Modifier votre message</p>
                                    </Components.Button>
                                    <div className='form-flex'>
                                        <form onSubmit={handleSubmit} className="form__input">
                                            <div>Commentaire</div>
                                            <Components.TextareaAutosize
                                                className="form__input-title"
                                                rowsMin={10}
                                                type="content"
                                                name="content"
                                                id="content"
                                                placeholder="Message*"
                                                value={state.content}
                                                onChange={handleChange}
                                            />
                                            <div className='form__button-comment2'>
                                                <div >
                                                    <Components.Button
                                                        type="submit"
                                                        id="submit"
                                                        variant="contained"
                                                        color="primary"
                                                    >VALIDER</Components.Button>
                                                </div>
                                                <div >
                                                    <Link to={`/messages/${messageId}`}>
                                                        <Components.Button
                                                            type="submit"
                                                            variant="contained"
                                                            color="primary"
                                                        >ANNULER</Components.Button>
                                                    </Link>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </Components.Paper>
                        </main>
                    </section>
                </div>
            </div>
        )
    }
}
export default CommentModify