import React from 'react'
import { useAuth } from '../context/AuthContext'
import { Navigate, useLocation, Outlet } from 'react-router-dom';

const ProtectedRoute = ({roles}) => {
    const{isAuthenticated, isLoading, role} = useAuth(); 
    const location = useLocation();

    if(isLoading){
        return <div>Loading...</div>
    }

    if(!isAuthenticated){
        return <Navigate to="/login" state={{from: location}} replace/>
    }

    if (roles && !roles.includes(role)) {
        return <Navigate to="/login" state={{from: location}} replace />; // Redirect to home if role doesn't match
    }

    // Use Outlet to render child routes
    return <Outlet />;
}

export default ProtectedRoute