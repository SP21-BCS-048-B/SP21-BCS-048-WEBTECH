// Import necessary modules
const express = require('express');
const session = require('express-session');
const bcrypt = require('bcryptjs');

// Create an Express application
const app = express();

// Middleware for parsing JSON in requests
app.use(express.json());

// Setup session middleware
app.use(session({
  secret: 'your-secret-key', // Change this to a strong, unique secret
  resave: false,
  saveUninitialized: true
}));

// Dummy users data (replace this with a database in a real project)
const users = [
  {
    id: 1,
    username: 'john_doe',
    // Hashed password for 'password123'
    passwordHash: '$2a$10$FMS0QAYP3Zf8zqErvrg8R.QpxwFg2V09TFf3kDJVeUdJoTbsfC4q6'
  },
  // Add more users as needed
];

// Helper function to find a user by username
function findUserByUsername(username) {
  return users.find(user => user.username === username);
}

// Route for user login
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Find the user by username
  const user = findUserByUsername(username);

  // If the user is not found or the password is incorrect
  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    return res.status(401).json({ error: 'Invalid username or password' });
  }

  // Set user information in the session
  req.session.user = { id: user.id, username: user.username };

  // Send a success response
  res.json({ success: true, user: req.session.user });
});

// Route for checking the current user session
app.get('/current_user', (req, res) => {
  // Check if the user is logged in
  if (!req.session.user) {
    return res.status(401).json({ error: 'Not logged in' });
  }

  // Send the current user information
  res.json({ user: req.session.user });
});

// Route for user logout
app.post('/logout', (req, res) => {
  // Destroy the session to log the user out
  req.session.destroy(err => {
    if (err) {
      return res.status(500).json({ error: 'Logout failed' });
    }
    res.json({ success: true });
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
