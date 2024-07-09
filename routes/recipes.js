const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');

// Create a new recipe
router.route('/').post(recipeController.createRecipe);

// Get all recipes
router.route('/').get(recipeController.getAllRecipes);
//router.route('/:name').get(recipeController.getRecipeByName);
router.route('/:id').get(recipeController.getRecipeById);
router.route('/name/:name').get(recipeController.getRecipeByName);
// Get a specific recipe by ID
// Update a specific recipe by ID
router.route('/:name').patch(recipeController.updateRecipeByName);

// Delete a specific recipe by ID
router.route('/:name').delete(recipeController.deleteRecipeByName);

module.exports = router;
