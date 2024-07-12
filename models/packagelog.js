const mongoose = require('mongoose');

const packageLogSchema = new mongoose.Schema({
  Name: { type: String, required: true},
  Weight: { type: Number, required: true },
  batchcode: { type: String, required: true },
  approved: { type: Boolean, required: false, default: false }
});

packageLogSchema.pre('save', function(next) {
  this.Name = this.Name.trim();
  next();
});

module.exports = mongoose.model('PackageLog', packageLogSchema);
