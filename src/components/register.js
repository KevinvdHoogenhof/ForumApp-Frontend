import React, { useState } from 'react';
import AuthService from '../services/authservice';
import { Link } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!acceptedTerms) {
      alert('You must accept the terms of service to register.');
      return;
    }
    try {
        var data = {
          username: username,
          email: email,
          password: password
        };
        const response = await AuthService.register(data);
        //const token = response.data.token;
        alert(response.data.message + ". Please login to your account.");
        //localStorage.setItem('token', token);
        window.location.href = `/login`;
    } catch (error) {
      console.error('Registration failed:', error);
      if (error.response && error.response.data && error.response.data.message) {
        alert(`Registration failed: ${error.response.data.message}`);
      } else {
        alert('Registration failed. Please try again.');
      }
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
            Email:
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
