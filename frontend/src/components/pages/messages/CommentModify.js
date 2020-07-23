//Imports

import React, { useState, useEffect } from 'react';
import Header from '../../headers/Header';
import Footer from '../../headers/Footer';
import axios from 'axios';
import Cookies from 'js-cookie'
import { Link, useHistory } from "react-router-dom";

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
                            <div id="message-list" className="">
                                <div id="form">
                                    <form onSubmit={handleSubmit} className="form_input">
                                        <label htmlFor="content"></label>
                                        <input className="form_input-title"
                                            type="content"
                                            name="content"
                                            id="content"
                                            placeholder="Message*"
                                            value={state.content}
                                            onChange={handleChange}
                                        />
                                        <div className="form__button">
                                            <button type="submit" id="submit" className="btn-style">VALIDER</button>
                                        </div>
                                        <Link to={`/messages/${match.params.id}`}>
                                            <div className="form__button">
                                                <button type="submit" className="btn-style">ANNULER</button>
                                            </div>
                                        </Link>
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
export default CommentModify