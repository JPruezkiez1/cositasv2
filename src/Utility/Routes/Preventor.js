import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { DefaultContext } from '../../Context/Context';

const ProtectedRoute = ({ children }) => {
    const { isLogged } = useContext(DefaultContext);

    return isLogged ? children : <Navigate to="/" />;
};

const AuthRoutes = ({ children }) => {
    const context = useContext(DefaultContext);
    if (context.isLogged) {
        return <Navigate to="/" />;
    } else {
        return children;
    }
};

export { AuthRoutes };
export default ProtectedRoute;