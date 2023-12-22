const express = require('express');
const router = express.Router();
const Property = require('../models/property');

// GET /properties (server-side rendered page with pagination and filtering)
router.get('/properties', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const filter = req.query.filter || '';

    // Construct the MongoDB query for pagination and filtering
    const query = {
      name: { $regex: filter, $options: 'i' } // Case-insensitive search for property name
    };

    // Count total properties based on the filter
    const totalProperties = await Property.countDocuments(query);

    // Calculate total pages based on the page size
    const totalPages = Math.ceil(totalProperties / pageSize);

    // Ensure page is within valid range
    const validPage = Math.min(Math.max(page, 1), totalPages);

    // Calculate skip value for pagination
    const skip = (validPage - 1) * pageSize;

    // Retrieve properties from the database based on pagination and filtering
    const properties = await Property.find(query)
      .skip(skip)
      .limit(pageSize);

    // Render the properties page with the retrieved data and pagination information
    res.render('properties', {
      properties,
      filter,
      page: validPage,
      pageSize,
      totalPages,
      totalProperties,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// ... Other routes

module.exports = router;
