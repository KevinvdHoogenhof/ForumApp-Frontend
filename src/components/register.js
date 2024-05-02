import React, { useState } from 'react';
import AuthService from '../services/authservice';
import { Link } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!acceptedTerms) {
      alert('You must accept the terms of service to register.');
      return;
    }
    try {
        const response = await AuthService.register(username, password);
        const token = response.data.token;
        localStorage.setItem('token', token);
        window.location.href = `/`;
    } catch (error) {
      console.error('Registration failed:', error);
      // Handle registration failure, show error message, etc.
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <div>
          <label>
            Username:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              checked={acceptedTerms}
              onChange={(e) => setAcceptedTerms(e.target.checked)}
            />
            I have read and accept the <Link to="/termsofservice">terms of service</Link>
          </label>
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
