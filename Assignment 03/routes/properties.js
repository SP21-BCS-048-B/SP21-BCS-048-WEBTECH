// routes/properties.js
const express = require('express');
const router = express.Router();

// GET /api/properties (protected route)
router.get('/api/properties', (req, res) => {
  // Check if the user is logged in
  if (!req.session.user) {
    return res.status(401).json({ error: 'Not logged in' });
  }

  // Implement logic to retrieve and return a list of properties
  res.json({ properties: [{ id: 1, name: 'Property 1' }, { id: 2, name: 'Property 2' }] });
});

module.exports = router;
