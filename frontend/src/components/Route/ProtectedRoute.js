<<<<<<< HEAD
import React, { Fragment } from 'react'
import { useSelector } from 'react-redux';
import { Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
=======
import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Navigate, Route } from "react-router-dom";
>>>>>>> 9d1ca120b4e01253ff4cc7d09de46161ff9cfca9

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);
  return (
    <Fragment>
<<<<<<< HEAD
        {!loading && (
            <Route
            {...rest}
            render={(props)=> {
                if (!isAuthenticated){
                    return<Navigate to ="/login" />;
                }
                return <Component{...props}/>;
            }}
            />
        )}
=======
      {!loading && (
        <Route
          {...rest}
          render={(props) => {
            if (!isAuthenticated) {
              return <Navigate to="/login" />;
            }
            return <Component {...props} />;
          }}
        />
      )}
>>>>>>> 9d1ca120b4e01253ff4cc7d09de46161ff9cfca9
    </Fragment>
  );
};

export default ProtectedRoute;
