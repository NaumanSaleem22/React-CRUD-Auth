import React from 'react'
import { Navigate } from 'react-router-dom'
import { getToken } from '../utils/auth'


const ProtectedRoute = ({ children }) => {

    const token = getToken();

    if (!token) {
        // User login nahi hai → redirect to login
        return <Navigate to="/login" />
    }

    // User logged in → render the component
    return children;
}

export default ProtectedRoute