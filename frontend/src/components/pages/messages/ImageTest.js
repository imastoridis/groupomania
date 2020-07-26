
import React, { useState, useEffect } from 'react';
import axios from 'axios'


function ImageTest() {
    useEffect(() => {
        FetchMessages();
    }, []);

    //Set the state
    const [state] = useState({
        id: "",
        title: "",
        content: "",
        likes: "",
        userId: "",
        username: "",
        attachment: ""

    })
    //Declarations
    const [messages, setMessages] = useState([]);
    const [error, setError] = useState(null);

    //Gets all the messages
    const FetchMessages = (e) => {
        const messageData = {
            "id": state.id,
            "title": state.title,
            "content": state.content,
            "likes": state.likes,
            'userId': state.userId,
            'createdAt': state.createdAt,
            'username': state.username,
            'attachment' : state.attachment
        }
        //[0].Users[0].username
        axios.get("http://localhost:8080/api/imagetest", messageData)
            .then(function (response) {
                const messages = response.data
                setMessages(messages) 
            })
            .catch(function (error) {
                setError(error);
            });
    }



    return (
        <div>
            <div >
                <div>

                    <h2 >Connexion Admin</h2>
<div>{messages.attachment}</div>
                </div>
            </div>
        </div>
    )
}

export default ImageTest