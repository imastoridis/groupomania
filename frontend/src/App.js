//Imports

import React, { useState } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import NewMessage from './components/pages/NewMessage';
import UserProfile from './components/pages/UserProfile';
import MessageTile from './components/pages/MessageTile';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import GuestRoute from './components/auth/GuestRoute'
import AuthRoute from './components/auth/AuthRoute';
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
            <GuestRoute path='/' exact component={Register} showError={updateErrorMessage} updateTitle={updateTitle}/>
            <GuestRoute path='/login' exact component={Login} showError={updateErrorMessage} updateTitle={updateTitle}/>
            <AuthRoute path='/messages' exact component={MessageTile} showError={updateErrorMessage} updateTitle={updateTitle}/>
            <AuthRoute path='/messages/new' component={NewMessage} />
            
            <AuthRoute path='/userprofile' component={UserProfile} />
          </Switch>
        </Router>

      </React.StrictMode>,
    </div>
  );
}

export default App;

/*
import React, {Component} from 'react';
import {Router, Scene} from 'react-native-router-flux';
import Authentication from './components/Authentication';

class App extends Component {
  render() {
    return(
      <Router>
        <Scene key='root'>
          <Scene
            component={Authentication}
            hideNavBar={true}
            initial={!this.state.hasToken}
            key='Authentication'
            title='Authentication'
          />
          <Scene
            component={HomePage}
            hideNavBar={true}
            initial={this.state.hasToken}
            key='HomePage'
            title='Home Page'
          />
        </Scene>
      </Router>
    )
  }
}

export default App;


*/







/*
*/