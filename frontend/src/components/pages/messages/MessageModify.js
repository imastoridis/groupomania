//Imports

import React, { useState, useEffect } from 'react';
import Header from '../../headers/Header';
import Footer from '../../headers/Footer';
import axios from 'axios';
import Cookies from 'js-cookie'
import Message from './Message';
import { useHistory } from "react-router-dom";

function MessageModify({ match }) {
    useEffect(() => {

    }, [match.params.id])

    //State
    const [state, setState] = useState({
        id: match.params.id,
        title: "",
        content: "",
    })

    //Const
    const [messages, setFetchMessage] = useState([]);
    const [error, setError] = useState(null);
    const token = Cookies.get('token')
    let history = useHistory();

    //HandleChange on forl
    const handleChange = (e) => {
        const { id, value } = e.target
        setState(prevState => ({
            ...prevState,
            [id]: value
        }))
    }

    //Modifies the message and redirects to the message
    const handleSubmit = e => {
        e.preventDefault();
        const messageByIdata = {
            "id": state.id, //userId??
            "title": state.title,
            "content": state.content,
        };

        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        axios.put(`http://localhost:8080/api/messages/${match.params.id}`, messageByIdata)
            .then(response => {
                history.push(`/messages/${match.params.id}`)
                //console.log(match.params.id)
                console.log(response)
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
                            <div id="message-list" className="">
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
                                        <input className="form_input-title"
                                            type="content"
                                            name="content"
                                            id="content"
                                            placeholder="Message*"
                                            maxLength="50"
                                            pattern="[^0-9]*"
                                            value={state.content}
                                            onChange={handleChange}
                                        />
                                        <div className="form__button">
                                            <button type="submit" id="submit" className="btn-style">VALIDER</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </main>
                        <Footer />
                    </section>
                </div>
            </div>

        )

    }
}
export default MessageModify