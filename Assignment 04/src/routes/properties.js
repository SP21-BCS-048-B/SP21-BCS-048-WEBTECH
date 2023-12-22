// routes/properties.js
const express = require('express');
const authenticateToken = require('./auth');
const Property = require('../models/property');

const router = express.Router();

const properties = [];

// GET /api/properties (public)
router.get('/api/properties', (req, res) => {
  res.json({ properties });
});

// POST /api/properties (protected with token-based authentication)
router.post('/api/properties', authenticateToken, (req, res) => {
  // Check if the user is authenticated
  if (!req.user) {
    return res.status(403).json({ error: 'Access denied. Invalid token.' });
  }

  // Implement logic to create a new property
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: 'Property name is required.' });
  }

  const newProperty = new Property(properties.length + 1, name);

  // Add the property to the database or perform other actions
  properties.push(newProperty);

  res.json({ success: true, message: `Property "${name}" created successfully.`, property: newProperty });
});

module.exports = router;
