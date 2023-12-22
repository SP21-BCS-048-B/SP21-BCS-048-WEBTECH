// app.js
const express = require('express');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const propertiesRouter = require('./routes/properties');

const app = express();

app.use(express.json());
app.use(session({
  secret: 'your-session-secret-key',
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

// ... Other middleware for user authentication and registration

app.use(propertiesRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
