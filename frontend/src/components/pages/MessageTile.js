import React, { useState, useEffect } from 'react';
import Header from '../headers/Header';
import Footer from '../headers/Footer';
import AsyncStorage from '@react-native-community/async-storage';

function MessageTile() {
    useEffect(() => {
        FetchMessages();
        getData();
    }, []);

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
    const [messages, setMessages] = useState([]);

    const [error, setError] = useState(null);
    const FetchMessages = async () => {
        try {
            const data = await fetch('http://localhost:8080/api/messages') //Fetches all messages from API
            const messages = await data.json();
            const value = await AsyncStorage.getItem('token')
            setMessages(messages) //Sets the data in "messages"
            console.log(value)
        } catch (error) {
            setError(error);
        }
    }

    if (error) {
        return <div><h3 className="error">{"Un problème technique ne permet pas d'accéder au service que vous désirez. Merci de réessayer ultérieurement"}</h3> </div>;
    } else {
        return (

            <div className="App">
                <section id="main-container">
                
                {messages.map(message =>
                    <div className="messageBox" key={message.id}>
                        <div className="messageBox-upper">
                            <div>Photo</div>
                            <div>Username : {message.Users.username}</div>
                            <div>{message.createdAt}</div>
                        </div>
                        <div>
                            <h2>{message.title}</h2>
                            <div>{message.content}</div>
                        </div>
                        <div>{message.likes}</div>
                    </div>
                )}

                <Footer />
                </section>
            </div>
        )
    }
}


export default MessageTile

