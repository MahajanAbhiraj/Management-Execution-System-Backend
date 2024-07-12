const Recipe = require('../models/Recipe');
const Ingredient = require('../models/Ingredient');

// Validate ingredients function
const validateIngredients = async (ingredients) => {
    const ingredientNames = ingredients.map(ing => ing.ingredient.trim());
    const validIngredients = await Ingredient.find({ name: { $in: ingredientNames } });
    return validIngredients.length === ingredients.length;
  };
  
// Create or update a recipe
exports.createRecipe = async (req, res) => {
    try {
      req.body.ingredients = req.body.ingredients.map(ing => ({ ingredient: ing.ingredient.trim(), quantity: ing.quantity }));
      const { name, ingredients } = req.body;
  
      // Check if the recipe already exists
      const existingRecipe = await Recipe.findOne({ name: name.trim() });
  
      // If the recipe exists, update it; otherwise, create a new one
      if (existingRecipe) {
        // Validate ingredients before updating
        const areIngredientsValid = await validateIngredients(ingredients);
        if (!areIngredientsValid) {
          return res.status(400).send({ error: 'Invalid ingredient entry' });
        }
  
        existingRecipe.ingredients = ingredients;
        existingRecipe.description = req.body.description;
        existingRecipe.preparationNotes = req.body.preparationNotes;
        existingRecipe.maxServings = req.body.maxServings;
        existingRecipe.totalWeight = req.body.totalWeight;
        const updatedRecipe = await existingRecipe.save();
        res.status(200).send(updatedRecipe);
      } else {
        // Validate ingredients before creating
        const areIngredientsValid = await validateIngredients(ingredients);
        if (!areIngredientsValid) {
          return res.status(400).send({ error: 'Invalid ingredient entry' });
        }
  
        const newRecipe = new Recipe(req.body);
        await newRecipe.save();
        res.status(201).send(newRecipe);
      }
    } catch (error) {
      res.status(400).send(error);
    }
  };
  
// Get recipe by ID
exports.getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).send({ error: 'Recipe not found' });
    }
    res.status(200).send(recipe);
  } catch (error) {
    res.status(500).send(error);
  }
};

//get recipe by name
exports.getRecipeByName = async (req, res) => {
  try {
    const recipe = await Recipe.findOne({name: req.params.name.toLowerCase()});
    if (!recipe) {
      return res.status(404).send({ error: 'Recipe not found' });
    }
    res.status(200).send(recipe);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Update a specific recipe by name
exports.updateRecipeByName = async (req, res) => {
  try {
    if (req.body.ingredients) {
      req.body.ingredients = req.body.ingredients.map(ing => ({ ingredient: ing.ingredient.trim(), quantity: ing.quantity }));
    }
    const { ingredients } = req.body;
    if (ingredients) {
      const areIngredientsValid = await validateIngredients(ingredients);
      if (!areIngredientsValid) {
        return res.status(400).send({ error: 'Invalid ingredient entry' });
      }
    }
    const recipe = await Recipe.findOneAndUpdate({ name: req.params.name.trim() }, req.body, { new: true, runValidators: true });
    if (!recipe) {
      return res.status(404).send({ error: 'Recipe not found' });
    }
    res.status(200).send(recipe);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Delete a specific recipe by name
exports.deleteRecipeByName = async (req, res) => {
  try {
    const recipe = await Recipe.findOneAndDelete({ name: req.params.name.trim() });
    if (!recipe) {
      return res.status(404).send({ error: 'Recipe not found' });
    }
    res.status(200).send({ message: 'Recipe deleted successfully' });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getAllRecipes = async (req, res) => {
    try {
      const recipes = await Recipe.find({});
      res.status(200).send(recipes);
    } catch (error) {
      res.status(500).send(error);
    }
  };