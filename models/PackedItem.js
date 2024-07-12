const mongoose = require('mongoose');

const PackedItemSchema = new mongoose.Schema({
  Name: { type: String, required: true, lowercase: true },
  Total_Quantity: { type: Number, required: true }
});

module.exports = mongoose.model('PackedItem', PackedItemSchema);