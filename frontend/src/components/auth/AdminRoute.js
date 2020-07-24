//Imports

import { Route, Redirect } from 'react-router-dom'
import React from 'react'
import { connect } from 'react-redux'

//Route for user logged in
const AdminRoute = ({ component: Component, ...rest }) => {
    console.log(rest)
  return (
    <Route
      {...rest}
      render={props =>
        rest.isAdmin ? (
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
    loggedIn: state.auth.loggedIn,
    isAdmin : state.auth.isAdmin
  };
};
export default connect(mapStateToProps)(AdminRoute);
