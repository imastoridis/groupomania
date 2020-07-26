//Imports
import FormData from 'form-data'
import React, { useState, useEffect } from 'react';
import Footer from '../../headers/Footer';
import axios from 'axios'
import { useHistory, Link } from "react-router-dom";
import Header from '../../headers/Header';
import Cookies from 'js-cookie'
import * as Components from '../../../materialui/Imports'
var fs = require('fs');
var querystring = require('querystring');

/** New message creation function**/

function MessageNew() {
    useEffect(() => {
    }, []);

    //Set state
    const [state, setState] = useState({
        title: "",
        content: "",
        file: "",
        newMessageError: null,
        selectedFile: null

    })

    // Variables
    let history = useHistory();
    const [messages, setMessages] = useState([]);
    const [error] = useState(null);

    //HandleChange for text message
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
                console.log(response)
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
            })
    }

    //HandleChange for photo message
    const handleOnUploadFile = (e) => {
        console.log(e.target.files[0])
        setState({
            selectedFile: e.target.files[0],
            loaded: 0,
        });
    }

    //Creates new message with photo, saves the photot locally and adds the name to the DB
    const imageClick = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("file", state.selectedFile);

        axios.post("http://localhost:8080/api/messages/newimage/", formData)
            .then(response => {
                console.log(response)
                if (response.status === 201) {
                    setMessages(response.data)
                    history.push('/messages')
                }
                else if (response.data === 204) {
                    console.log(error);
                }
                else {
                    console.log(response)
                }
            })
            .catch(function (error) {
                console.log(error);
            })
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
                                <Components.Button  size="large" color="primary" >
                                    <p>NOUVEAU MESSAGE</p>
                                </Components.Button>
                                <div className='form-flex'>
                                    <form className="form__input" onSubmit={handleSubmit}>
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
                                            type="text"
                                            name="content"
                                            id="content"
                                            placeholder="Message*"
                                            value={state.content}
                                            onChange={handleChange}
                                        />
                                        <div className='form__button-comment2'>
                                            <div className="font-size">
                                                <Components.Button
                                                    size="large"
                                                    type="submit"
                                                    id="submit"
                                                    variant="contained"
                                                    color="primary"
                                                >VALIDER</Components.Button>
                                            </div>
                                            <div >
                                                <Link to={`/`}>
                                                    <Components.Button
                                                        size="large"
                                                        type="submit"
                                                        variant="contained"
                                                        color="primary"
                                                    >ANNULER</Components.Button>
                                                </Link>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <Components.Divider />
                                <Components.Button  size="large" color="primary" >
                                    <p>NOUVEAU MESSAGE AVEC PHOTO</p>
                                </Components.Button>
                                <div className='form-flex'>
                                    <form className="form__input">
                                        <div className='form__button-comment2'>
                                            <input
                                                className='input'
                                                name="file"
                                                id="attachment"
                                                type='file'
                                                onChange={handleOnUploadFile}
                                            />
                                        </div>
                                        <div className='form__button-comment2'>
                                            <Components.Button
                                                type="submit"
                                                id="submit"
                                                variant="contained"
                                                color="primary"
                                                onClick={imageClick}
                                            >VALIDER la photo</Components.Button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </Components.Paper>
                    </main>
                </section>
            </div>
        )
    }
}
export default MessageNew;

//onClick={imageClick}