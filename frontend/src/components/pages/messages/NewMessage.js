//Imports

import React, { useState, useEffect } from 'react';
import Footer from '../../headers/Footer';
import axios from 'axios'
import Cookies from 'js-cookie'
import { useHistory } from "react-router-dom";
import Header from '../../headers/Header';

/** New message creation function**/

function NewMessage() {
    useEffect(() => {
    }, []);

    const [state, setState] = useState({
        title: "",
        content: "",
        newMessageError: null
    })

    // Variables
    let history = useHistory();
    const token = Cookies.get('token')
    const [messages, setMessages] = useState([]);
    const [error, setError] = useState(null);

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

        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        axios.post("http://localhost:8080/api/messages/new", payload)
            .then(function (response) {
                console.log(response)
                if (response.status === 201) {
                    setMessages(response.data)
                    history.push('/messages')
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
                                        required maxLength="50"
                                        pattern="[^0-9]*"
                                        value={state.title}
                                        onChange={handleChange}

                                    />
                                    <label htmlFor="content"></label>
                                    <input
                                        type="content"
                                        name="content"
                                        id="content"
                                        placeholder="Message*"
                                        required maxLength="50"
                                        pattern="[^0-9]*"
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
export default NewMessage;