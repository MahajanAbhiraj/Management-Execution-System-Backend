const mongoose = require('mongoose');

const packageLogSchema = new mongoose.Schema({
  Name: { type: String, required: true, lowercase: true },
  Expected_Quantity: { type: Number, required: true },
  Obtained_Quantity: { type: Number, required: false, default: 0 },
  batchcode: { type: String, required: true },
  approved: { type: Boolean, required: false, default: false },
  Error: { type: Number, required: false }
});

packageLogSchema.pre('save', function(next) {
  this.Name = this.Name.trim();
  next();
});

module.exports = mongoose.model('PackageLog', packageLogSchema);

