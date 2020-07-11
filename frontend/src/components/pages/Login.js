//LOGIN 
import React, { useState, useEffect } from 'react';
import Header from '../headers/Header';
import Footer from '../headers/Footer';
//import { Link } from "react-router-dom";
import axios from 'axios'
//import AsyncStorage from '@react-native-community/async-storage';
import Cookies from 'js-cookie'
import {connect} from 'react-redux'

function Login(props) {

    useEffect(() => {
        
    }, [])

    const [state, setState] = useState({
        email: "",
        password: "",
        token: "",
        successMessage: null
    })

    const handleChange = (e) => {
        const { id, value } = e.target
        setState(prevState => ({
            ...prevState,
            [id]: value
        }))
    }

/*
    const storeData = async (value) => {
        try {
          await AsyncStorage.setItem('token', value)
        } catch (e) {
          // saving error
        }
      }

    const getData = async () => {
        try {
            const value = await AsyncStorage.getItem('token')
            if (value !== null) {
                // value previously stored
            }
        } catch (e) {
            // error reading value
        }
    }
*/
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

                    /*console.log(response)
                    console.log(response.data.token)
                    AsyncStorage.setItem('token', response.data.token)*/
                    props.setLogin(response.data);
                    Cookies.set('token', response.data.token);
                    //Cookies.set('userId', response.data.userId)
                    console.log(response)
                   
                    redirectToHome();
                    //props.showError(null)
                }
                else if (response.data.code === 204) {
                    props.showError("Username and password do not match");
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
    const redirectToHome = () => {
        //props.updateTitle('dashboard')
        props.history.push('/messages/new');
    }
    const redirectToRegister = () => {
        //props.history.push('/register');
        props.updateTitle('Register');
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
                                        //pattern="[^0-9]*"
                                        value={state.email}
                                        onChange={handleChange}
                                    />
                                    <label htmlFor="password"></label>
                                    <input
                                        type="text"
                                        name="password"
                                        id="password"
                                        placeholder="Mot de passe*"
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
                                        <span>Dont have an account? </span>
                                        <span className="loginText" onClick={() => redirectToRegister()}>Register</span>
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