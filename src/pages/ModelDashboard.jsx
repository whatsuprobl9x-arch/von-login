import React, { useState, useEffect } from 'react';
export default function ModelDashboard({ token, email, onLogout }){
  const [contentUrl, setContentUrl] = useState('');
  const [notes, setNotes] = useState('');
  const [balance, setBalance] = useState(null);
  const [supportMsg, setSupportMsg] = useState('');

  useEffect(()=>{
    fetch('/api/model/balance', { headers: { Authorization: 'Bearer '+token } })
      .then(r=>r.json()).then(d=>setBalance(d.balance)).catch(()=>{});
  },[]);

  async function sendContent(e){
    e.preventDefault();
    if (!contentUrl) return alert('content URL is REQUIRED');
    await fetch('/api/model/send-content', {
      method:'POST', headers:{'Content-Type':'application/json', Authorization: 'Bearer '+token},
      body: JSON.stringify({ content_url: contentUrl, notes })
    });
    alert('Content sent to admins.');
    setContentUrl(''); setNotes('');
  }

  async function requestPayout(){
    const res = await fetch('/api/model/request-payout', {
      method:'POST', headers:{'Content-Type':'application/json', Authorization: 'Bearer '+token}
    });
    const data = await res.json();
    alert(data.message || 'Requested');
  }

  async function sendSupport(e){
    e.preventDefault();
    await fetch('/api/support/send', {
      method:'POST', headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ email, message: supportMsg })
    });
    alert('Support message sent.');
    setSupportMsg('');
  }

  return (
    <div>
      <div className="sidebar">
        <h3>Model</h3>
        <div className="small">Signed in as {email}</div>
        <a href="#" className="link" onClick={onLogout}>Logout</a>
      </div>
      <div className="content">
        <div className="header">
          <h1>Model Dashboard</h1>
          <div className="small">Balance: {balance !== null ? '$' + balance : '—'}</div>
        </div>

        <div className="card" style={{marginBottom:12}}>
          <h4>Send Content to Admins</h4>
          <form onSubmit={sendContent}>
            <label className="small">Content URL (REQUIRED)</label>
            <input className="input" placeholder="https://mega.nz/..." value={contentUrl} onChange={e=>setContentUrl(e.target.value)} />
            <textarea className="input" placeholder="Notes (optional)" value={notes} onChange={e=>setNotes(e.target.value)} style={{height:120,marginTop:8}} />
            <div style={{marginTop:8}}><button className="btn" type="submit">Send</button></div>
          </form>
          <div style={{marginTop:8}} className="note">
            In order to send your content, please host it using <a href="https://mega.nz" target="_blank" rel="noreferrer">MEGA</a> or <a href="https://www.mediafire.com" target="_blank" rel="noreferrer">MediaFire</a> and enter the link here!
          </div>
        </div>

        <div className="card" style={{marginBottom:12}}>
          <h4>Request Payout</h4>
          <p className="small">Payouts processed once a month on the 25th. You can request a payout (backend enforces date).</p>
          <button className="btn" onClick={requestPayout}>Request Payout</button>
        </div>

        <div className="card">
          <h4>Support</h4>
          <form onSubmit={sendSupport}>
            <textarea className="input" placeholder="Describe your issue" value={supportMsg} onChange={e=>setSupportMsg(e.target.value)} style={{height:120}} />
            <div style={{marginTop:8}}>
              <button className="btn" type="submit">Send Support Message</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
