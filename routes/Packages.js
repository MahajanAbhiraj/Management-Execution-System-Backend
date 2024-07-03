const express = require('express');
const router = express.Router();
const packageController = require('../controllers/PackageController');

// Get all Packages
router.route('/').get(packageController.getAllPackages);

// Get Package by ID
router.route('/:name').get(packageController.getPackageByName);

// Create new Package
router.route('/').post(packageController.createPackage);

// Update Package
router.route('/:id').put(packageController.updatePackageByName);

// Delete Package
router.route('/:name').delete(packageController.deletePackageByName);

module.exports = router;
