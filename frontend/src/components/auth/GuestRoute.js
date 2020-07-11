import {Route, Redirect} from 'react-router-dom'
import React from 'react'
import Cookies from 'js-cookie'

const GuestRoute = ({ component: Component, ...rest }) => {
const token = Cookies.get('token')

    return (
      <Route
        {...rest}
        render={props =>
          !token ? (
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
  }

  export default GuestRoute