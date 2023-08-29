// CandidateList.js
import React from 'react';

const CandidateList = ({ candidates, onVote }) => {
  return (
    <div>
      <h2>Candidates:</h2>
      <ul>
        {candidates.map(candidate => (
          <li key={candidate.id}>
            {candidate.name} - Votes: {candidate.votes}
            <button onClick={() => onVote(candidate.id)}>Vote</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CandidateList;
