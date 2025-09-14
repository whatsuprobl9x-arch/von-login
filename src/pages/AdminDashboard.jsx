import React, { useEffect, useState } from 'react';

export default function AdminDashboard({ token, email, onLogout }){
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({});
  const [toEmail, setToEmail] = useState('');
  const [amount, setAmount] = useState('');

  useEffect(()=>{
    fetch('/api/admin/stats', { headers: { Authorization: 'Bearer '+token } })
      .then(r=>r.json()).then(setStats).catch(()=>{});
    fetch('/api/admin/users', { headers: { Authorization: 'Bearer '+token } })
      .then(r=>r.json()).then(d=>setUsers(d.users||[])).catch(()=>{});
  },[]);

  async function sendUsd(e){
    e.preventDefault();
    await fetch('/api/admin/send-usd', {
      method:'POST', headers:{'Content-Type':'application/json', Authorization: 'Bearer '+token},
      body: JSON.stringify({ to_email: toEmail, amount })
    });
    alert('Sent (fake) USD recorded.');
  }

  async function sendGift(e){
    e.preventDefault();
    const code = prompt('Enter gift card code to send');
    if (!code) return;
    await fetch('/api/admin/send-giftcard', {
      method:'POST', headers:{'Content-Type':'application/json', Authorization: 'Bearer '+token},
      body: JSON.stringify({ to_email: toEmail, code })
    });
    alert('Gift recorded.');
  }

  return (
    <div>
      <div className="sidebar">
        <h3>Admin</h3>
        <div className="small">Signed in as {email}</div>
        <a href="#" className="link" onClick={onLogout}>Logout</a>
      </div>
      <div className="content">
        <div className="header">
          <h1>Admin Dashboard</h1>
          <div className="small">Total content: {stats.totalContent ?? '—'}</div>
        </div>

        <div className="card" style={{marginBottom:12}}>
          <h4>Users</h4>
          <div style={{maxHeight:220,overflow:'auto'}}>
            {users.map(u=>(
              <div key={u.id} style={{padding:8,borderBottom:'1px solid #071826'}}><b>{u.email}</b> — {u.role}</div>
            ))}
          </div>
        </div>

        <div className="card" style={{marginBottom:12}}>
          <h4>Send USD (fake)</h4>
          <form onSubmit={sendUsd}>
            <input className="input" placeholder="To email" value={toEmail} onChange={e=>setToEmail(e.target.value)} />
            <input className="input" placeholder="Amount" value={amount} onChange={e=>setAmount(e.target.value)} style={{marginTop:8}} />
            <div style={{marginTop:8}}>
              <button className="btn" type="submit">Send USD</button>
              <button type="button" onClick={sendGift} className="btn" style={{marginLeft:8,background:'#2b8a5f'}}>Send Giftcard</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
