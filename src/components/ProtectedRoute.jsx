import React from 'react'
import { useAuth } from '../context/AuthContext'
import { Navigate, useLocation, Outlet } from 'react-router-dom';

const ProtectedRoute = ({roles}) => {
    const{isAuthenticated, isLoading, role} = useAuth(); 
    const location = useLocation();

    if(isLoading){
        return <div>Loading...</div>
    }

    if(!isAuthenticated || (roles && !roles.includes(role))){
        return <Navigate to="/login" state={{from: location}} replace/>
    }

    return <Outlet />;
}

export default ProtectedRoute