const express = require('express');
const router = express.Router();
const packageLogController = require('../controllers/packagelogController');

// Get all PackageLogs
router.route('/').get(packageLogController.getAllPackageLogs);

// Get PackageLog by name
router.route('/:name').get(packageLogController.getPackageLogByName);

// Create new PackageLog
router.route('/').post(packageLogController.createPackageLog);

// Update PackageLog by name
router.route('/:name').put(packageLogController.updatePackageLogByName);

// Delete PackageLog by name
router.route('/:name').delete(packageLogController.deletePackageLogByName);

module.exports = router;
