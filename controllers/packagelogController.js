const PackageLog = require('../models/packagelog');

// Get all PackageLogs
exports.getAllPackageLogs = async (req, res) => {
  try {
    const packageLogs = await PackageLog.find();
    res.json(packageLogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get PackageLog by name
exports.getPackageLogByName = async (req, res) => {
  try {
    const packageLog = await PackageLog.findOne({ name: req.params.name.toLowerCase() });
    if (packageLog == null) {
      return res.status(404).json({ message: 'PackageLog not found' });
    }
    res.json(packageLog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new PackageLog
exports.createPackageLog = async (req, res) => {
  const packageLog = new PackageLog({
    name: req.body.name,
    weight: req.body.weight,
    products: req.body.products,
    approved: req.body.approved
  });

  try {
    const newPackageLog = await packageLog.save();
    res.status(201).json(newPackageLog);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update PackageLog by name
exports.updatePackageLogByName = async (req, res) => {
  try {
    const packageLog = await PackageLog.findOne({ name: req.params.name.toLowerCase() });
    if (packageLog == null) {
      return res.status(404).json({ message: 'PackageLog not found' });
    }

    if (req.body.name != null) {
      packageLog.name = req.body.name;
    }
    if (req.body.weight != null) {
      packageLog.weight = req.body.weight;
    }
    if (req.body.products != null) {
      packageLog.products = req.body.products;
    }
    if (req.body.approved != null) {
      packageLog.approved = req.body.approved;
    }

    const updatedPackageLog = await packageLog.save();
    res.json(updatedPackageLog);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete PackageLog by name
exports.deletePackageLogByName = async (req, res) => {
  try {
    const packageLog = await PackageLog.findOne({ name: req.params.name.toLowerCase() });
    if (packageLog == null) {
      return res.status(404).json({ message: 'PackageLog not found' });
    }

    await packageLog.remove();
    res.json({ message: 'Deleted PackageLog' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
