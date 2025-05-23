import React, { useState } from 'react';
import AuthService from '../services/authservice';
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      var data = {
        email: email,
        password: password
      };
      try {
        const response = await AuthService.login(data);
        if (response.data.access_token) {
            console.log('Login successful');
            const token = response.data.access_token;
            localStorage.setItem('token', token);
            window.location.href = `/`;
        } else {
            console.error('Login failed:', response.data.message);
            alert(`Login failed: ${response.data.message}`);
        }
      } catch (error) {
          console.error('An error occurred:', error);
          // Handle error here
      }
    } catch (error) {
      console.error('Login failed:', error);
      alert(`Login failed: ${error.response.data.message}`);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
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
        <button type="submit">Login</button>
      </form>
      <p>No account yet? <Link to="/register">Register here</Link></p>
    </div>
  );
};

export default Login;
