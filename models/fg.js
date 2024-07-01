const mongoose = require('mongoose');

const fgSchema = new mongoose.Schema({
  recipeName: { type: String, required: true },
  TotalWeight: { type: Number, required: true },
  ingredientsUsed: [
    {
      ingredientName: { type: String, required: true }
    }
  ]
});

module.exports = mongoose.model('fg', fgSchema);