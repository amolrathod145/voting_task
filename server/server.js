const express = require('express');
const faker = require('faker');
const cors = require('cors');

const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());

const users = [];
const candidates = [];

// Create fake users
for (let i = 0; i < 10; i++) {
  users.push({
    id: i,
    username: faker.internet.userName(),
    password: faker.internet.password(),
    role: 'Voter',
    voted: false,
  });
}

// Create fake candidates
for (let i = 0; i < 5; i++) {
  candidates.push({
    id: i,
    name: faker.name.findName(),
    votes: 0,
  });
}

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);

  if (!user) {
    res.status(401).json({ error: 'Invalid credentials' });
  } else {
    res.json({ user });
  }
});

app.post('/vote/:candidateId', (req, res) => {
  const { candidateId } = req.params;
  const userId = req.body.userId;

  const user = users.find(u => u.id === userId);
  const candidate = candidates.find(c => c.id == candidateId);

  if (!user) {
    res.status(404).json({ error: 'User not found' });
  } else if (user.voted) {
    res.status(400).json({ error: 'User has already voted' });
  } else if (!candidate) {
    res.status(404).json({ error: 'Candidate not found' });
  } else {
    user.voted = true;
    candidate.votes += 1;
    res.json({ message: 'Vote successful' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
