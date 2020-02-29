import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { UserContext } from './UserContext';

function PrivateRoute({ component: Component, ...restProps }) {
  const { user } = useContext(UserContext);

  return (
    <Route
      {...restProps}
      render={props => {
        return user ? (
          <Component {...props}></Component>
        ) : (
            <Redirect
              to={{
                pathname: '/login',
                state: {
                  from: props.location
                }
              }}
            ></Redirect>
          );
      }}
    ></Route>
  );
}

export default PrivateRoute;
