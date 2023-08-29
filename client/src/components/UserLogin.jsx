// UserLogin.js
import React, { useState } from 'react';

const UserLogin = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Call login API
    // Assuming your API endpoint is http://localhost:3001/login
    fetch('http://localhost:3001/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
      .then(response => response.json())
      .then(data => {
        onLogin(data.user);
      })
      .catch(error => console.error('Login error:', error));
  };

  return (
    <div>
      <input type="text" placeholder="Username" onChange={e => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default UserLogin;
