import React from 'react';
import { Navigate } from 'react-router-dom';

// Supondo que você armazena o token no localStorage
const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};

const AuthRoute: React.FC<{ element: React.ReactElement }> = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to="/Login" />;
};

export default AuthRoute;
