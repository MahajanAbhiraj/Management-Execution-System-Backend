const express = require('express');
const router = express.Router();
const packageLogController = require('../controllers/packagelogController');

// Get all PackageLogs
router.route('/').get(packageLogController.getAllPackageLogs);

// Get PackageLog by name
router.route('/:id').get(packageLogController.getPackageLogById);

// Create new PackageLog
router.route('/').post(packageLogController.createPackageLog);

// Update PackageLog by name
router.route('/:id').put(packageLogController.updatePackageLogById);

// Delete PackageLog by name
router.route('/:id').delete(packageLogController.deletePackageLogById);

module.exports = router;
