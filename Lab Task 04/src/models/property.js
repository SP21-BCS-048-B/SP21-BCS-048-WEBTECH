const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  name: { type: String, required: true },
  // Add more fields as needed for property information
});

const Property = mongoose.model('Property', propertySchema);

module.exports = Property;
