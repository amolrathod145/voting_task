import React, { useState, useEffect } from 'react';
import UserLogin from './components/UserLogin';
import CandidateList from './components/CandidateList';

const App = () => {
  const [user, setUser] = useState(null);
  const [candidates, setCandidates] = useState([]); // Add this line

  useEffect(() => {
    // Fetch candidates data from the API
    // Assuming your API endpoint is http://localhost:3001/candidates
    fetch('http://localhost:3001/candidates')
      .then(response => response.json())
      .then(data => {
        setCandidates(data);
      })
      .catch(error => console.error('Error fetching candidates:', error));
  }, []);

  const handleLogin = loggedInUser => {
    setUser(loggedInUser);
  };

  const handleVote = candidateId => {
    // Call vote API
    // Assuming your API endpoint is http://localhost:3001/vote/:candidateId
    fetch(`http://localhost:3001/vote/${candidateId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId: user.id }),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data.message);
      })
      .catch(error => console.error('Vote error:', error));
  };

  return (
    <div>
      {user ? (
        <div>
          <h1>Welcome, {user.username}!</h1>
          <CandidateList candidates={candidates} onVote={handleVote} />
        </div>
      ) : (
        <UserLogin onLogin={handleLogin} />
      )}
    </div>
  );
};

export default App;
