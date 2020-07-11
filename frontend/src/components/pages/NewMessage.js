import React, { useState, useEffect } from 'react';
import Header from '../headers/Header';
import Footer from '../headers/Footer';
//import { Link } from "react-router-dom";
import axios from 'axios'
import Cookies from 'js-cookie'
var jwtUtils = require('../../utils/jwt.utils')

function NewMessage() {

    useEffect(() => {
        getCookies()
    }, []);


    const [state, setState] = useState({
        title: "",
        content: "",
        newMessageError: null
    })



    /* this.handleSubmit = this.handleSubmit.bind(this);
     this.handleChange = this.handleChange.bind(this);*/

    const getCookies = () => {
        Cookies.get('token')
        console.log(Cookies.get('token'))
        Cookies.get('userId')
        console.log(Cookies.get('userId'))
        Cookies.get('token1')
        console.log(Cookies.get('token1'))
    }


    /*const handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }*/

    const handleChange = (e) => {
        const { id, value } = e.target
        setState(prevState => ({
            ...prevState,
            [id]: value
        }))
    }

    const [messages, setMessages] = useState([]);

    const [error, setError] = useState(null);

    const cookieId = Cookies.get('token')
    const cookieIdBack = Cookies.get('token1')

    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = {
            "title": state.title,
            "content": state.content,
        }
        if (cookieId === cookieIdBack) {
            axios.post("http://localhost:8080/api/messages/new", payload)
                .then(function (response) {

                    if (response.status === 201) {
                        const messages = response.data.json();
                        setMessages(messages)
                        console.log(messages)


                        //redirectToHome();
                        //props.showError(null)
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

    }


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