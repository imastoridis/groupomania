//Imports

import React, { useState, useEffect } from 'react';
import Footer from '../../headers/Footer';
import axios from 'axios'
import { useHistory } from "react-router-dom";
import Header from '../../headers/Header';

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
                        <section id="message-list" className="">
                            <div id="form">
                                <form onSubmit={handleSubmit} className="form_input">
                                    <label htmlFor="title"></label>
                                    <input
                                        type="text"
                                        name="title"
                                        id="title"
                                        placeholder="Titre*"
                                        required maxLength="45"
                                        value={state.title}
                                        onChange={handleChange}
                                    />
                                    <label htmlFor="content"></label>
                                    <input className="form_input-title"
                                        type="content"
                                        name="content"
                                        id="content"
                                        placeholder="Message*"
                                        required maxLength="50"
                                        value={state.content}
                                        onChange={handleChange}
                                    />
                                    <div className="form__button">
                                        <button type="submit" id="submit" className="btn-style">VALIDER</button>
                                    </div>
                                </form>
                            </div>
                        </section>
                    </main>
                    <Footer />
                </section>
            </div>
        )
    }
}
export default MessageNew;