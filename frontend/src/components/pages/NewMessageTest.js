new message
import React, { useState, useEffect } from 'react';
import Header from '../headers/Header';
import Footer from '../headers/Footer';
//import { Link } from "react-router-dom";
import axios from 'axios'
import Cookies from 'js-cookie'

class NewMessage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            content: '',
            newMessageError: false
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        console.log(Cookies.get('token'))
        Cookies.get('token')
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(event) {
        const token = Cookies.get('token')
        const message = this.state

        axios
            .post('http://localhost:8080/api/messages/new', message)
            .then(response => {
                const messages = response.data.json()
                setMessages(messages)
            })
            .catch(error => {
                this.setState({ newMessageError: true })
                console.log(error)
            })
        event.preventDefault()
    }

    
    // empty dependency array means this effect will only run once (like componentDidMount in classes)
    render() {
        const { title, content } = this.state
        return (
            <div className="App">
                <section id="main-container">
                    <Header />
                    <main>
                        <section id="message-list" className="">
                            <div id="form">
                                <form onSubmit={this.handleSubmit} className="form_input">
                                    <label htmlFor="title"></label>
                                    <input
                                        type="text"
                                        name="title"
                                        id="title"
                                        placeholder="Titre*"
                                        required maxLength="50"
                                        pattern="[^0-9]*"
                                        value={title}
                                        onChange={this.handleChange}

                                    />
                                    <label htmlFor="content"></label>
                                    <input
                                        type="content"
                                        name="content"
                                        id="content"
                                        placeholder="Message*"
                                        required maxLength="50"
                                        pattern="[^0-9]*"
                                        value={content}
                                        onChange={this.handleChange}

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