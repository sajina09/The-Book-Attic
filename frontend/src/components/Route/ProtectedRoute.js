import React, { Fragment } from 'react'
import { useSelector } from 'react-redux';
import { Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({component :Component,...rest}) => {
    const {loading,isAuthenticated,user} = useSelector ((state)=>state.user);
  return (
    <Fragment>
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
    </Fragment>
     
     );
}

export default ProtectedRoute