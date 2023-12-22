const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

const router = express.Router();

// POST /register (user registration)
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the username is already taken
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: 'Username already taken' });
    }

    // Hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user in the database
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    res.json({ success: true, message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST /login (user login)
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user by username
    const user = await User.findOne({ username });

    // If the user is not found or the password is incorrect
    if (!user || !await user.comparePassword(password)) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Set user information in the session
    req.session.user = { id: user.id, username: user.username };

    res.json({ success: true, user: req.session.user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST /logout (user logout)
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
