const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  Name: { type: String, required: true, lowercase: true },
  Quantity: { type: Number, required: true },
  Remarks: { type: String, required: true }
});

orderSchema.pre('save', function(next) {
  this.Name = this.Name.trim();
  next();
});

module.exports = mongoose.model('order', orderSchema);