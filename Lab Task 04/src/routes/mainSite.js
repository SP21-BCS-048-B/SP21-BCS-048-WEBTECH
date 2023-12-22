const express = require('express');
const Property = require('../models/property');

const router = express.Router();

// GET / (main site home page)
router.get('/', async (req, res) => {
  try {
    // Retrieve properties from the database
    const properties = await Property.find();

    // Render the main site home page with the retrieved data
    res.render('mainSite/properties', { properties });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
