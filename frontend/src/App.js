//Imports

import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, useParams } from 'react-router-dom';
import NewMessage from './components/pages/messages/NewMessage';
import UserProfile from './components/pages/userprofile/UserProfile';
import Dashboard from './components/pages/messages/Dashboard';
import Login from './components/pages/authpages/Login';
import Register from './components/pages/authpages/Register';
import GuestRoute from './components/auth/GuestRoute'
import AuthRoute from './components/auth/AuthRoute';
import UserProfileUpdate from './components/pages/userprofile/UserProfileUpdate';
import Message from './components/pages/messages/Message';

//import AlertComponent from '../src/components/AlertComponent'

// Router Routes

function App() {
  const [title, updateTitle] = useState(null);
  const [errorMessage, updateErrorMessage] = useState(null);

  return (
    <div >
      <React.StrictMode>
        <Router>
          <Switch>
            <GuestRoute path='/' exact component={Register} showError={updateErrorMessage} updateTitle={updateTitle} />
            <GuestRoute path='/register' exact component={Register} showError={updateErrorMessage} updateTitle={updateTitle} />
            <GuestRoute path='/login' exact component={Login} showError={updateErrorMessage} updateTitle={updateTitle} />
            <AuthRoute path='/messages' exact component={Dashboard} showError={updateErrorMessage} updateTitle={updateTitle} />
            <AuthRoute path='/messages/new' component={NewMessage} />
            <AuthRoute path='/update' component={UserProfileUpdate} />
            <AuthRoute path='/userprofile' component={UserProfile} />
            <AuthRoute exact path='/messages/:id' component={Message} />
          </Switch>
        </Router>

      </React.StrictMode>,
    </div>
  );
}

export default App;



