//Imports

import React, { useState, useEffect } from 'react';
import Header from '../../headers/Header';
import Footer from '../../headers/Footer';
import axios from 'axios'
import Cookies from 'js-cookie'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

/** Login function **/

function Login(props) {
    useEffect(() => {
    }, [])
    //Set state
    const [state, setState] = useState({
        email: "",
        password: "",
        token: "",
        successMessage: null
    })


    //Handlechange for form
    const handleChange = (e) => {
        const { id, value } = e.target
        setState(prevState => ({
            ...prevState,
            [id]: value
        }))
    }

    // Login onClick 
    const handleSubmitClick = (e) => {
        e.preventDefault();
        const payload = {
            "email": state.email,
            "password": state.password,
        }
        axios.post("http://localhost:8080/api/users/login", payload)
            .then(function (response) {
                if (response.status === 201) {
                    setState(prevState => ({
                        ...prevState,
                        'successMessage': 'Login successful. Redirecting to home page..'
                    }))
                    props.setLogin(response.data);
                    Cookies.set('token', response.data.token);
                    Cookies.set('userId', response.data.userId);
                    props.history.push('/messages')
                }
                else if (response.data.code === 204) {
                    props.showError("Username and password do not match");
                }
                else {
                    console.log(response)
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <div className="App">
            <section id="main-container">
                <Header />
                <main>
                    <section id="message-list" className="">
                        <div>
                            <div>
                                <p>LOGIN</p>
                            </div>
                            <div id="form">
                                <form className="form_input">
                                    <label htmlFor="email"></label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        placeholder="email*"
                                        required maxLength="50"
                                        value={state.email}
                                        onChange={handleChange}
                                    />
                                    <label htmlFor="password"></label>
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        placeholder="mot de passe*"
                                        required maxLength="50"
                                        value={state.password}
                                        onChange={handleChange}
                                    />
                                    <div className="form__button">
                                        <button type="submit" onClick={handleSubmitClick} id="submit" className="btn-style">VALIDER</button>
                                    </div>
                                    <div className="alert alert-success mt-2" style={{ display: state.successMessage ? 'block' : 'none' }} role="alert">
                                        {state.successMessage}
                                    </div>
                                    <div className="registerMessage">
                                        <span>Vous n'avez pas encore de compte? </span>
                                        <Link to={'/'}>
                                            <span className="loginText" >Inscrivez-vous</span>
                                        </Link>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </section>
                </main>
                <Footer />
            </section>
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        setLogin: user => dispatch({ type: "SET_LOGIN", payload: user })
    };
};


export default connect(
    null,
    mapDispatchToProps
)(Login);