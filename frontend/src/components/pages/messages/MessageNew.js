//Imports

import React, { useState, useEffect } from 'react';
import Footer from '../../headers/Footer';
import axios from 'axios'
import { useHistory, Link } from "react-router-dom";
import Header from '../../headers/Header';

import * as Components from '../../../materialui/Imports'

/** New message creation function**/

function MessageNew() {
    useEffect(() => {
    }, []);

    //Set state
    const [state, setState] = useState({
        title: "",
        content: "",
        newMessageError: null
    })

    // Variables
    let history = useHistory();
    const [messages, setMessages] = useState([]);
    const [error] = useState(null);

    //HandleChange
    const handleChange = (e) => {
        const { id, value } = e.target
        setState(prevState => ({
            ...prevState,
            [id]: value
        }))
    }

    //HandleSubmit - creates new message, adds it to DB and redirects to dashboard
    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = {
            "title": state.title,
            "content": state.content,
        }
        axios.post("http://localhost:8080/api/messages/new", payload)
            .then(response => {
                if (response.status === 201) {
                    setMessages(response.data)
                    history.push('/messages')
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

    //Message form
    if (error) {
        return <div><h3 className="error">{"Un problème technique ne permet pas d'accéder au service que vous désirez. Merci de réessayer ultérieurement"}</h3> </div>;
    } else {
        return (
            <div className="App">
                <section id="main-container">
                    <Header />
                    <main>
                        <Components.Paper elevation={6} className="form-container">
                            <div className="form">
                                <Components.Box bgcolor="primary.main" color="primary.contrastText">
                                    <p>NOUVEAU MESSAGE</p>
                                </Components.Box>
                                <div className='form-flex'>
                                    <form onSubmit={handleSubmit} className="form__input">
                                        <div>Titre</div>
                                        <Components.TextareaAutosize
                                            className="form__input-title"
                                            rowsMin={3}
                                            type="text"
                                            name="title"
                                            id="title"
                                            placeholder="Titre*"
                                            maxLength="28"
                                            variant="outlined"
                                            value={state.title}
                                            onChange={handleChange}
                                        />
                                        <div>Message</div>
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
                                        <div className='button-flex'>
                                            <div >
                                                <Components.Button
                                                    type="submit"
                                                    id="submit"
                                                    variant="contained"
                                                    color="primary"
                                                >VALIDER</Components.Button>
                                            </div>
                                            <div >
                                                <Link to={`/`}>
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
                    <Footer />
                </section>
            </div>
        )
    }
}
export default MessageNew;