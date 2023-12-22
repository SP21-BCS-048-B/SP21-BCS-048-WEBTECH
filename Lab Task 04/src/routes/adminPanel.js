const express = require('express');
const router = express.Router();

// GET /admin/dashboard (admin panel)
router.get('/dashboard', (req, res) => {
  // Render the admin panel dashboard
  res.render('adminPanel/dashboard');
});

module.exports = router;
