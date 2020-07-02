import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import * as serviceWorker from './serviceWorker';
import HomePage from './components/pages/Homepage';
import NewMessage from './components/pages/NewMessage';
import {
  Route,
  BrowserRouter as Router,
  Switch,
  //Redirect
} from "react-router-dom";
import Register from './components/pages/Register';
import UserProfile from './components/pages/UserProfile';


ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route path='/' exact component={Register}/>
        <Route path='/messages' component={HomePage}/>
        <Route path='/messages/new' component={NewMessage} />
        <Route path='/userprofile' component={UserProfile}/>
      </Switch>
    </Router>

  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
