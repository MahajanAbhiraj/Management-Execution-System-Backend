const express = require('express');
const router = express.Router();
const fgController = require('../controllers/fgController');

// Get all FGs
router.route('/').get(fgController.getAllFGs);
//router.route('/').post(finalProductController.createFinalProduct);
// Get FG by ID
router.route('/:recipeName').get(fgController.getFGByRecipeName);


// Create new FG
router.route('/').post(fgController.createFG);

// Update FG
router.route('/').put(fgController.updateFG);

// Delete FG
router.route('/:recipeName').delete(fgController.deleteFGByRecipeName);




module.exports = router;
