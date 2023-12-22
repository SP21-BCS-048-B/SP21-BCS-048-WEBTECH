const express = require('express');
const router = express.Router();
const Property = require('../models/property');

// GET / (main site)
router.get('/', async (req, res) => {
  try {
    // Retrieve properties from the database
    const properties = await Property.find();

    // Render the main site with the retrieved data
    res.render('mainSite/properties', { properties });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
