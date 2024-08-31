import React from 'react';
import './Login.css';
import logo from './assets/images/logo.svg';


function Login() {
  return (
    <div>
      <nav>
      <img src={logo} alt="Logo" />
      </nav>
      <div className="form-wrapper">
        <h2>Sign In</h2>
        <form action="#">
          <div className="form-control">
            <input type="text" required />
            <label>Email or phone number</label>
          </div>
          <div className="form-control">
            <input type="password" required />
            <label>Password</label>
          </div>
          <button type="submit">Sign In</button>
          <div className="form-help">
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
