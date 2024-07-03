const mongoose = require('mongoose');

const finalProductSchema = new mongoose.Schema({
  recipeName: { type: String, required: true, lowercase: true },
  finalWeight: { type: Number, required: true },
  batchCode: { type: String, required: false },
  ingredientsUsed: [
    {
      ingredientName: { type: String, required: true },
      weight: { type: Number, required: true }
    }
  ],
  approved: { type: Boolean, default: false, required: false },
});

module.exports = mongoose.model('Final', finalProductSchema);
