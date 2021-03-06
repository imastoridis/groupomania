//Imports

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import store from '../src/store/index'
import { Provider } from 'react-redux'
import axios from "axios";
import Cookies from "js-cookie";
import jwt from 'jsonwebtoken'


const JWT_SIGN_SECRET = 'qsf5578QSdfsqfQSSQFsqdfghkjqs7680sqf';
let token = Cookies.get("token");

if (token) {
  jwt.verify(token, JWT_SIGN_SECRET, (err, decoded) => {
    if (err) {
      Cookies.remove("token");
      token = null;
    } else {
      if (decoded.iss !== "http://localhost:8080/api/users/login") {
        Cookies.remove("token");
        token = null;
      }
    }
  });
}

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
  );
}

if (token) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  axios.post("http://localhost:8080/api/users/me").then(res => {
    console.log(res.data.email)
    if (res.data.email == 'admin@admin.com') {
      store.dispatch({ type: "SET_LOGIN_ADMIN", payload: res.data });
      render();
    } else {
      store.dispatch({ type: "SET_LOGIN", payload: res.data });
      render();
    }
  });
} else {
  render();
}






