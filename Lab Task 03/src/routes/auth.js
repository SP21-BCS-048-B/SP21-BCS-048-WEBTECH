const express = require('express');
const session = require('express-session');
const User = require('../models/user');

const router = express.Router();

// Dummy users data (replace this with a database in a real project)
const users = [
  new User(1, 'john_doe', 'password123'),
  // Add more users as needed
];

// Login route
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Find the user by username
  const user = users.find(u => u.username === username);

  // If the user is not found or the password is incorrect
  if (!user || !user.comparePassword(password)) {
    return res.status(401).json({ error: 'Invalid username or password' });
  }

  // Set user information in the session
  req.session.user = { id: user.id, username: user.username };

  // Send a success response
  res.json({ success: true, user: req.session.user });
});

// Logout route
router.post('/logout', (req, res) => {
  // Destroy the session to log the user out
  req.session.destroy(err => {
    if (err) {
      return res.status(500).json({ error: 'Logout failed' });
    }
    res.json({ success: true });
  });
});

module.exports = router;
