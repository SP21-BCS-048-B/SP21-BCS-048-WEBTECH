
const express = require('express');
const router = express.Router();
const Property = require('../models/property');

// GET /properties (server-side rendered page)
router.get('/properties', async (req, res) => {
  try {
    // Retrieve properties from the database
    const properties = await Property.find();

    // Render the properties page with the retrieved data
    res.render('properties', { properties });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET /properties/:id (server-side rendered page for a single property)
router.get('/properties/:id', async (req, res) => {
  try {
    // Retrieve a property by ID from the database
    const property = await Property.findById(req.params.id);

    // Render the property details page with the retrieved data
    res.render('propertyDetails', { property });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET /properties/create (server-side rendered page for creating a property)
router.get('/properties/create', (req, res) => {
  // Render the property creation page
  res.render('createProperty');
});

// POST /properties (create a new property)
router.post('/properties', async (req, res) => {
  try {
    // Create a new property in the database
    const property = await Property.create(req.body);

    // Redirect to the property details page after creation
    res.redirect(`/properties/${property._id}`);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// ... Additional routes for updating and deleting properties

module.exports = router;
