// app.js
const express = require('express');
const session = require('express-session');
const authRoutes = require('./routes/auth');
const propertiesRoutes = require('./routes/properties');

const app = express();

app.use(express.json());

// Setup session middleware
app.use(session({
  secret: 'your-session-secret-key',
  resave: false,
  saveUninitialized: true
}));

// Use authentication routes
app.use(authRoutes);

// Use properties routes
app.use(propertiesRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
