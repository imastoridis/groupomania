//Imports

import { Route, Redirect } from 'react-router-dom'
import React from 'react'
import { connect } from 'react-redux'

//Route for user logged in
const GuestRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        !rest.loggedIn ? (
          <Component {...props} />
        ) : (
            <Redirect
              to={{
                pathname: "/messages",
                state: { from: props.location }
              }}
            />
          )
      }
    />
  );
};

const mapStateToProps = state => {
  return {
    loggedIn: state.auth.loggedIn
  };
};
export default connect(mapStateToProps)(GuestRoute);
