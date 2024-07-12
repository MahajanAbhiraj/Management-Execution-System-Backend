const express = require('express');
const router = express.Router();
const packedItemController = require('../controllers/PackedItemController');

// Get all PackedItems
router.route('/').get(packedItemController.getAllPackedItems);

// Get PackedItem by Name
router.route('/:name').get(packedItemController.getPackedItemByName);

// Create or Update PackedItem
router.route('/').post(packedItemController.createOrUpdatePackedItem);

// Update PackedItem by Name
router.route('/:name').put(packedItemController.updatePackedItemByName);

// Delete PackedItem by Name
router.route('/:name').delete(packedItemController.deletePackedItemByName);

module.exports = router;
