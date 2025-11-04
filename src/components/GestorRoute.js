import React from 'react';
import { Navigate } from 'react-router-dom';

function GestorRoute({ user, element }) {
  
  if (user.role === 'gestor') {
    return element;
  }
  alert('Você não tem permissão para acessar a área de gestão.')
  return <Navigate to="/" replace />;
}

export default GestorRoute;