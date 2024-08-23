const Ingredient = require('../models/Ingredient');
const nodemailer = require('nodemailer');

// Configure your email transport service
const transporter = nodemailer.createTransport({
  service: 'Gmail', // or any other service provider
  auth: {
    user: 'abhi70288@gmail.com',
    pass: 'alulhzzisovglgby',
  },
});

// Function to send an email
function sendEmail(ingredient, quantity) {
  const mailOptions = {
    from: 'abhi70288@gmail.com',
    to: 'mahajanabhiraj9@gmail.com',
    subject: 'Ingredient Quantity Alert',
    text: `The quantity of ${ingredient} has exceeded the limit. Current quantity: ${quantity}`,
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

// Create a new ingredient or update if exists
exports.createOrUpdateIngredient = async (req, res) => {
  try {
    const ingredientData = req.body;
    ingredientData.name = ingredientData.name.trim();

    const existingIngredient = await Ingredient.findOne({ name: ingredientData.name });
    if (existingIngredient) {
      Object.assign(existingIngredient, ingredientData);
      await existingIngredient.save();
      return res.status(200).send(existingIngredient);
    } else {
      const ingredient = new Ingredient(ingredientData);
      await ingredient.save();
      return res.status(201).send(ingredient);
    }
  } catch (error) {
    res.status(400).send(error);
  }
};

// Get a specific ingredient by name
exports.getIngredientByName = async (req, res) => {
  try {
    const name = req.params.name.trim();
    const ingredient = await Ingredient.findOne({ name });
    if (!ingredient) {
      return res.status(404).send({ error: 'Ingredient not found' });
    }
    res.status(200).send(ingredient);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Update a specific ingredient by name
exports.updateIngredientByName = async (req, res) => {
  try {
    const name = req.params.name.trim();
    const updateData = req.body;
    updateData.name = updateData.name ? updateData.name.trim() : updateData.name;

    const ingredient = await Ingredient.findOneAndUpdate({ name }, updateData, { new: true, runValidators: true });
    if(ingredient.quantity<100)
    {
      sendEmail(ingredient.name,ingredient.quantity);
    }
    if (!ingredient) {
      return res.status(404).send({ error: 'Ingredient not found' });
    }
    res.status(200).send(ingredient);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Delete a specific ingredient by name
exports.deleteIngredientByName = async (req, res) => {
  try {
    const name = req.params.name.trim();
    const ingredient = await Ingredient.findOneAndDelete({ name });
    if (!ingredient) {
      return res.status(404).send({ error: 'Ingredient not found' });
    }
    res.status(200).send({ message: 'Ingredient deleted successfully' });
  } catch (error) {
    res.status(500).send(error);
  }
};

//get all ingredients
exports.getAllIngredients = async (req, res) => {
    try {
      const ingredients = await Ingredient.find({});
      res.status(200).send(ingredients);
    } catch (error) {
      res.status(500).send(error);
    }
  };