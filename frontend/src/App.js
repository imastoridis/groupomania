//Imports

import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import MessageNew from './components/pages/messages/MessageNew';
import UserProfile from './components/pages/userprofile/UserProfile';
import Dashboard from './components/pages/messages/Dashboard';
import Login from './components/pages/authpages/Login';
import Register from './components/pages/authpages/Register';
import AdminRoute from './components/auth/AdminRoute'
import GuestRoute from './components/auth/GuestRoute'
import AuthRoute from './components/auth/AuthRoute';
import UserProfileUpdate from './components/pages/userprofile/UserProfileUpdate';
import Message from './components/pages/messages/Message';
import MessageModify from './components/pages/messages/MessageModify';
import CommentModify from './components/pages/messages/CommentModify';
import AdminDashboard from './components/pages/admin/AdminDashboard';
import LoginAdmin from './components/pages/authpages/LoginAdmin';

//import AlertComponent from '../src/components/AlertComponent'

// Router Routes

function App() {

  return (
    <div >
      <React.StrictMode>
        <Router>
          <Switch>
            <GuestRoute path='/' exact component={Register} />
            <GuestRoute path='/register' exact component={Register} />
            <GuestRoute path='/login' exact component={Login} />
            <GuestRoute path='/adminlogin' exact component={LoginAdmin} />
            <AuthRoute path='/messages' exact component={Dashboard} />
            <AuthRoute path='/messages/new' component={MessageNew} />
            <AuthRoute path='/update' component={UserProfileUpdate} />
            <AuthRoute path='/userprofile' component={UserProfile} />
            <AdminRoute path='/admin' component={AdminDashboard} />
            <AuthRoute exact path='/messages/:id' component={Message} />
            <AuthRoute exact path='/modify/:id' component={MessageModify} />
            <AuthRoute exact path='/modifycomment/:id' component={CommentModify} />
          </Switch>
        </Router>
      </React.StrictMode>,
    </div>
  );
}

export default App;



