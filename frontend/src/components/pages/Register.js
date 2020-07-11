import React, { useState, useEffect } from 'react';
import Header from '../headers/Header';
import Footer from '../headers/Footer';
import { Link } from "react-router-dom";
import axios from "axios";
import { withRouter } from "react-router-dom";
import AsyncStorage from '@react-native-community/async-storage';


function Register(props) {
    const [state, setState] = useState({
        email: "",
        password: "",
        username: "",
        successMessage: null
    })

   
    
    const handleChange = (e) => {
        const { id, value } = e.target
        setState(prevState => ({
            ...prevState,
            [id]: value
        }))
    }

    /*const storeData = async (value) => {
        try {
          await AsyncStorage.setItem('@storage_Key', value)
        } catch (e) {
          // saving error
        }
      }*/

      
    const sendDetailsToServer = () => {
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
                    redirectToHome();
                    props.showError(null)
                } else {
                    props.showError("Some error ocurred");
                    console.log(response)
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        /*} else {
            props.showError('Please enter valid username and password')    
        }*/

    }
    const redirectToHome = () => {
        //props.updateTitle('Home')
        props.history.push('/messages');
    }
    const redirectToLogin = () => {
        //props.updateTitle('Login')
        props.history.push('/login');
    }
    const handleSubmitClick = (e) => {
        e.preventDefault();
        sendDetailsToServer()
        /* if(state.password === state.confirmPassword) {
                
         } else {
             props.showError('Passwords do not match');
         }*/
    }
    return (
        <div className="App">
            <section id="main-container">
                <Header />
                <main>
                    <section id="message-list" className="">
                        <div>
                            <div>
                                <p>SIGNUP</p>
                            </div>
                            <div id="form">
                                <form className="form_input">
                                    <input
                                        type="username"
                                        name="username"
                                        id="username"
                                        placeholder="username"
                                        value={state.username}
                                        onChange={handleChange}
                                        required
                                    />
                                    <label htmlFor="email"></label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        placeholder="Email"
                                        value={state.email}
                                        onChange={handleChange}
                                        required
                                    />

                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        placeholder="Password"
                                        value={state.password}
                                        onChange={handleChange}
                                        required
                                    />

                                    <div className="form__button">

                                        <button type="submit" onClick={handleSubmitClick} id="submit" className="btn-style">VALIDER</button>

                                    </div>
                                </form>
                                <div className="alert alert-success mt-2" style={{ display: state.successMessage ? 'block' : 'none' }} role="alert">
                                    {state.successMessage}
                                </div>
                                <div className="mt-2">
                                    <span>Already have an account? </span>
                                    <span className="loginText" onClick={() => redirectToLogin()}>Login here</span>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>
                <Footer />
            </section>
        </div>
    )
}

export default withRouter(Register);