
const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  name: String,
});

const Property = mongoose.model('Property', propertySchema);

module.exports = Property;
