//Imports

import React, { useState, useEffect } from 'react';
import Header from '../../headers/Header';
import Footer from '../../headers/Footer';
import axios from 'axios'
import Cookies from 'js-cookie'
import { connect } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import * as Components from '../../../materialui/Imports'
import logo from '../../../images/icon-left-font-monochrome-black.png'

/** Login function for ADMIN**/


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

    let history = useHistory();

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
                var adminData = response.config.data
                const admin = JSON.parse(adminData)
                console.log(admin)
                if (admin.email == 'admin@admin.com' && admin.password == 'admin2') {
                    setState(prevState => ({
                        ...prevState,
                    }))
                    props.setLogin(response.data);
                    Cookies.set('token', response.data.token);
                    Cookies.set('userId', response.data.userId);
                    history.push('/admin')
                }//Na balo error
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
                    <Components.Paper elevation={9} className="login-box">
                        <section className="message-list" >
                            <img src={logo} alt="logo" className="login-logo"></img>
                            <Components.Button color="primary">
                                <p>Connexion Admin</p>
                            </Components.Button>
                            <div >
                                <form className="login__input">
                                    <div>
                                        <Components.TextField
                                            type="email"
                                            name="email"
                                            id="email"
                                            placeholder="email*"
                                            required maxLength="50"
                                            value={state.email}
                                            onChange={handleChange}
                                            label="email" />
                                    </div>
                                    <div>
                                        <Components.TextField
                                            type="password"
                                            name="password"
                                            id="password"
                                            placeholder="mot de passe*"
                                            required maxLength="50"
                                            value={state.password}
                                            onChange={handleChange}
                                            label="mot de passe"
                                        />
                                    </div>
                                    <div className="login__button">
                                        <Components.Button
                                            variant="outlined"
                                            color="primary"
                                            type="submit"
                                            onClick={handleSubmitClick}
                                            id="submit"
                                        >VALIDER
                                          </Components.Button>
                                    </div>
                                    <div className="login__input">
                                        <span>Vous n'avez pas encore de compte? </span>
                                        <Link to={'/'}>
                                            <Components.Button color="primary">Inscrivez-vous</Components.Button>
                                        </Link>
                                    </div>
                                </form>
                            </div>

                        </section>
                    </Components.Paper>
                </main>
                <Footer />
            </section>
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        setLogin: user => dispatch({ type: "SET_LOGIN_ADMIN", payload: user })
    };
};


export default connect(
    null,
    mapDispatchToProps
)(Login);