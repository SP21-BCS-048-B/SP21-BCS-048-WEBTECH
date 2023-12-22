
const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
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

// Setup EJS view engine
app.set('view engine', 'ejs');
app.set('views', 'src/views');

// Connect to MongoDB (replace the connection string with your MongoDB URI)
mongoose.connect('mongodb://localhost:27017/real-estate', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// ... Additional middleware for user authentication and registration

// Use authentication routes
app.use(authRoutes);

// Use properties routes
app.use(propertiesRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
