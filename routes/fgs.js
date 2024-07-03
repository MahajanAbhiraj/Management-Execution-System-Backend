const express = require('express');
const router = express.Router();
const fgController = require('../controllers/fgController');

// Get all FGs
router.get('/', fgController.getAllFGs);

// Get FG by ID
router.get('/:id', fgController.getFGById);

// Create new FG
router.post('/', fgController.createFG);

// Update FG
router.put('/:id', fgController.updateFG);

// Delete FG
router.delete('/:id', fgController.deleteFG);




module.exports = router;
