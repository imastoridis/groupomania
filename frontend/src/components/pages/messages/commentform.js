
//Imports

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie'
import { useHistory } from "react-router-dom";


function CommentForm({ props }) {
    useEffect(() => {
        //let id = req.body.id
        //console.log(id)
    }, []);

    const [state, setState] = useState({
        content: "",
        
        //messageId : {props},
        newMessageError: null
    })
    // Variables
    let history = useHistory();
    const token = Cookies.get('token')
    const [comments, setComments] = useState([]);
    const [error, setError] = useState(null);


    //Handlechange
    const handleChange = (e) => {
        const { id, value } = e.target
        setState(prevState => ({
            ...prevState,
            [id]: value
        }))
    }


    //HandleSubmit - creates new comment, adds it to DB 
    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = {
            "content": state.content,
            //"id":state.id
            //"messageId" : state.messageId
        }

        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        axios.post("http://localhost:8080/api/comment", payload)
            .then(function (response) {
                console.log(response)
                if (response.status === 201) {
                    setComments(response.data)
                    

                    //history.push('/messages')
                }
                else if (response.data.code === 204) {
                    console.log(error);
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
    return (
        <div id="form">

            <form className="form_input">
                
                <label htmlFor="content"></label>
                <input
                    type="text"
                    name="content"
                    id="content"
                    placeholder="votre commentaire*"
                    value={state.content}
                    onChange={handleChange}
                />
                <div className="form__button">
                    <button type="submit" onClick={handleSubmit} id="submit" className="btn-style">VALIDER</button>
                </div>
            </form>
            <div>is : {props}</div>
        </div>
    )
}

export default CommentForm