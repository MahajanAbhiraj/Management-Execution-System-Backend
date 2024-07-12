const PackageLog = require('../models/packagelog');
const Package = require('../models/Package');

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

// Get PackageLog by ID
exports.getPackageLogById = async (req, res) => {
  try {
    const packageLog = await PackageLog.findById(req.params.id);
    if (!packageLog) {
      return res.status(404).json({ message: 'PackageLog not found' });
    }
    res.json(packageLog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new PackageLog
exports.createPackageLog = async (req, res) => {
  const { Name, Expected_Quantity, Obtained_Quantity, batchcode, approved } = req.body;
  if (!Name || !Expected_Quantity || !batchcode) {
    return res.status(400).json({ message: 'Name, Expected_Quantity, and batchcode are required' });
  }

  const packageLog = new PackageLog({
    Name,
    Expected_Quantity,
    Obtained_Quantity,
    batchcode,
    approved
  });

  try {
    const newPackageLog = await packageLog.save();
    res.status(201).json(newPackageLog);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update PackageLog by ID
exports.updatePackageLogById = async (req, res) => {
  try {
    const packageLog = await PackageLog.findById(req.params.id);
    if (!packageLog) {
      return res.status(404).json({ message: 'PackageLog not found' });
    }

    const { Name, Expected_Quantity, Obtained_Quantity, batchcode, approved } = req.body;

    if (Name != null) packageLog.Name = Name;
    if (Expected_Quantity != null) packageLog.Expected_Quantity = Expected_Quantity;
    if (Obtained_Quantity != null) packageLog.Obtained_Quantity = Obtained_Quantity;
    if (batchcode != null) packageLog.batchcode = batchcode;
    if (approved != null) packageLog.approved = approved;

    // Calculate Error
    const packageData = await Package.findOne({ name: packageLog.Name });
    if (packageData) {
      const weight = packageData.weight;
      packageLog.Error = (packageLog.Expected_Quantity - packageLog.Obtained_Quantity) * weight;
    } else {
      packageLog.Error = packageLog.Expected_Quantity - packageLog.Obtained_Quantity; // Default to difference if no package found
    }

    const updatedPackageLog = await packageLog.save();
    res.json(updatedPackageLog);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete PackageLog by ID
exports.deletePackageLogById = async (req, res) => {
  try {
    const result = await PackageLog.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({ message: 'PackageLog not found' });
    }
    res.json({ message: 'Deleted PackageLog' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
