import React from 'react';
import Header from '../headers/Header';
import Footer from '../headers/Footer';
import {Link} from "react-router-dom";


function Register() {
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
                                    <label htmlFor="firstname"></label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        id="firstname"
                                        placeholder="Prénom*"
                                        required maxLength="50"
                                        pattern="[^0-9]*"
                                        //value={firstname} 
                                        />
                                    <label htmlFor="lastname"></label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        id="lastname"
                                        placeholder="Nom*"
                                        required maxLength="50"
                                        pattern="[^0-9]*"
                                        //value={secondname} 
                                        />
                                    <label htmlFor="password"></label>
                                    <input
                                        type="text"
                                        name="password"
                                        id="password"
                                        placeholder="Mot de passe*"
                                        required maxLength="50"
                                        pattern="[^0-9]*"
                                        //value={password}
                                        />

                                    <div className="form__button">
                                    <Link to ={`/messages`}>
                                        <button type="submit" id="submit" className="btn-style">VALIDER</button>
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

export default Register;