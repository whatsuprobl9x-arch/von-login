import React from 'react';
export default function ForgotPasswordModal({ onClose }){
  return (
    <div style={{position:'fixed',inset:0,display:'flex',alignItems:'center',justifyContent:'center',background:'rgba(0,0,0,0.6)'}}>
      <div className="card" style={{width:420}}>
        <p>Please contact <b>@o_.block</b> on Discord to reset your password (only for employees)</p>
        <div style={{display:'flex',justifyContent:'flex-end',marginTop:12}}>
          <button onClick={onClose} className="btn" style={{background:'#23345a'}}>Close</button>
        </div>
      </div>
    </div>
  );
}
