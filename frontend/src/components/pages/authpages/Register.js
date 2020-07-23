//Imports

import React, { useState } from 'react';
import Header from '../../headers/Header';
import Footer from '../../headers/Footer';
import { Link } from "react-router-dom";
import axios from "axios";
import { withRouter } from "react-router-dom";
import * as Components from '../../../materialui/Imports'
import logo from '../../../images/icon-left-font-monochrome-black.png'


/**Register function **/

function Register(props) {

    //Set state
    const [state, setState] = useState({
        email: "",
        password: "",
        username: "",
        successMessage: null
    })

    //HandleChange for form
    const handleChange = (e) => {
        const { id, value } = e.target
        setState(prevState => ({
            ...prevState,
            [id]: value
        }))
    }

    //HandleSubmitClick - Creates new user, stores it in DB and redirects to Login page
    const handleSubmitClick = (e) => {
        /*if(state.email.length && state.password.length) {
            props.showError(null);}*/
        const payload = {
            "email": state.email,
            "username": state.username,
            "password": state.password,
        }
        axios.post("http://localhost:8080/api/users/register", payload)
            .then(function (response) {
                if (response.status === 201) {
                    setState(prevState => ({
                        ...prevState,
                        'successMessage': 'Registration successful. Redirecting to home page..'
                    }))
                    props.history.push('/login')
                } else {
                    console.log(response)
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        e.preventDefault();
    }

    return (
        <div className="App">
            <section id="main-container">
                <Header />
                <main>
                    <Components.Paper elevation={9} className="login-box">
                        <section id="message-list" className="">
                            <img src={logo} alt="logo" className="login-logo"></img>
                            <Components.Button color="primary">
                                <p>Inscription</p>
                            </Components.Button>
                            <div id="form">
                                <form className="form_input">
                                    <div>
                                        <Components.TextField
                                            type="username"
                                            name="username"
                                            id="username"
                                            placeholder="username*"
                                            value={state.username}
                                            onChange={handleChange}
                                            required />
                                    </div>
                                    <div>
                                        <Components.TextField
                                            type="email"
                                            name="email"
                                            id="email"
                                            placeholder="e-mail*"
                                            value={state.email}
                                            onChange={handleChange}
                                            required />
                                    </div>
                                    <div>
                                        <Components.TextField
                                            type="password"
                                            name="password"
                                            id="password"
                                            placeholder="mot de passe*"
                                            value={state.password}
                                            onChange={handleChange}
                                            required />
                                    </div>
                                    <div className="form__button">
                                        <Components.Button
                                            type="submit"
                                            onClick={handleSubmitClick}
                                            id="submit"
                                            variant="outlined"
                                            color="primary">VALIDER
                                        </Components.Button>
                                    </div>
                                </form>
                                <div className="alert alert-success mt-2" style={{ display: state.successMessage ? 'block' : 'none' }} role="alert">
                                    {state.successMessage}
                                </div>
                                <div className="mt-2">
                                    <span>Vous avez déjà un compte? </span>
                                    <Link to={'/login'}>
                                        <Components.Button color="primary">Connectez-vous</Components.Button>
                                    </Link>
                                </div>
                            </div>
                        </section>
                    </Components.Paper>
                </main>
                <Footer />
            </section>
        </div>
    )
}

export default withRouter(Register);