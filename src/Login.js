import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';  // Importa Link de react-router-dom
import { useAuth } from './AuthContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch('https://mcsbt-integration1.ew.r.appspot.com/handle-login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ username, password })
});

    if (response.ok) {
      // If the session exists, update and redirect to dashboard
      login();
      navigate('/dashboard');
    } else {
      // If credentials are wrong, display error message
      alert('Invalid username or password');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit">Login</button>
      <p>No account? <Link to="/create-account">Create account</Link></p>
    </form>
  );
};

export default Login;