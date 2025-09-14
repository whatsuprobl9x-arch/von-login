import React, { useState } from 'react';
import Login from './pages/Login.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import ModelDashboard from './pages/ModelDashboard.jsx';

export default function App(){
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);
  const [email, setEmail] = useState(null);

  function onLogin(r, t, e){
    setRole(r);
    setToken(t);
    setEmail(e);
  }
  function onLogout(){
    setRole(null); setToken(null); setEmail(null);
  }

  if (!token) {
    return <Login onLogin={onLogin} />;
  }
  if (role === 'admin') return <AdminDashboard token={token} email={email} onLogout={onLogout} />;
  return <ModelDashboard token={token} email={email} onLogout={onLogout} />;
}
