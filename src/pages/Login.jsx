import React, { useState } from 'react';
import ForgotPasswordModal from '../components/ForgotPasswordModal.jsx';

export default function Login({ onLogin }){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showForgot, setShowForgot] = useState(false);

  async function submit(e){
    e.preventDefault();
    const res = await fetch('/api/auth', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (res.ok){
      onLogin(data.role, data.token, data.email);
    } else {
      alert(data.message || 'Login failed');
    }
  }

  return (
    <div style={{display:'flex',height:'100vh',alignItems:'center',justifyContent:'center'}}>
      <form onSubmit={submit} className="card" style={{width:420}}>
        <h2 style={{margin:0}}>Login</h2>
        <p className="small">Enter your email and password. No signups.</p>
        <div style={{marginTop:12}}>
          <input className="input" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        </div>
        <div style={{marginTop:12}}>
          <input type="password" className="input" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
        </div>
        <div style={{display:'flex',gap:8,marginTop:14}}>
          <button className="btn" type="submit">Login</button>
          <button type="button" onClick={()=>setShowForgot(true)} className="btn" style={{background:'#23345a'}}>Forgot?</button>
        </div>
        <div style={{marginTop:10}}>
          <p className="small">No create account button. Accounts are managed in Supabase.</p>
        </div>
      </form>
      {showForgot && <ForgotPasswordModal onClose={()=>setShowForgot(false)} />}
    </div>
  );
}
