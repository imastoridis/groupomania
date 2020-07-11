import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import store from '../src/store/index'
import { Provider } from 'react-redux'


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);










/*
ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route path='/' exact component={HomePage}/>
        <Route path='/messages' exact component={MessageTile}/>
        <Route path='/messages/new' component={NewMessage} />
        <Route path='/login' exact component={Login }/>
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
*/