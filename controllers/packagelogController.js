const PackageLog = require('../models/packagelog');

// Get all PackageLogs
exports.getAllPackageLogs = async (req, res) => {
  try {
    const { approved } = req.query;
    let filter = {};
    if ( approved === 'true' || approved === 'false' ){
      filter.approved = approved === 'true';
    }
    const packageLogs = await PackageLog.find(filter);
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
    Name: req.body.Name,
    Weight: req.body.Weight,
    batchcode:req.body.batchcode,
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
exports.updatePackageLogbyId = async (req, res) => {
  try {
    const packageLog = await PackageLog.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!packageLog) {
      return res.status(404).json({ message: 'Final product not found' });
    }
    res.status(200).json(packageLog);
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
