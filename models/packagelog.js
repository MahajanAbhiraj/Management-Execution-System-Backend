const mongoose = require('mongoose');

const packageLogSchema = new mongoose.Schema({
  name: { type: String, required: true, lowercase: true },
  weight: { type: Number, required: true },
  products: [
    {
      recipe: { type: String, required: true, lowercase: true }, // Storing ingredient name directly
      quantity: { type: Number, required: true }
    }
  ],
  approved: { type: Boolean, required: true, default: false }
});

packageLogSchema.pre('save', function(next) {
  this.name = this.name.trim();
  next();
});

module.exports = mongoose.model('PackageLog', packageLogSchema);
