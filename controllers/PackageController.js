const Package = require('../models/Package');

// Get all Packages
exports.getAllPackages = async (req, res) => {
  try {
    const packages = await Package.find();
    res.json(packages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Package by name
exports.getPackageByName = async (req, res) => {
  try {
    const package = await Package.findOne({ name: req.params.name.toLowerCase() });
    if (package == null) {
      return res.status(404).json({ message: 'Package not found' });
    }
    res.json(package);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new Package
exports.createPackage = async (req, res) => {
  const package = new Package({
    name: req.body.name,
    weight: req.body.weight,
    products: req.body.products
  });

  try {
    const newPackage = await package.save();
    res.status(201).json(newPackage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update Package by name
exports.updatePackageByName = async (req, res) => {
  try {
    const package = await Package.findOne({ name: req.params.name.toLowerCase() });
    if (package == null) {
      return res.status(404).json({ message: 'Package not found' });
    }

    if (req.body.name != null) {
      package.name = req.body.name;
    }
    if (req.body.weight != null) {
      package.weight = req.body.weight;
    }
    if (req.body.products != null) {
      package.products = req.body.products;
    }

    const updatedPackage = await package.save();
    res.json(updatedPackage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete Package by name
exports.deletePackageByName = async (req, res) => {
  try {
    const package = await Package.findOne({ name: req.params.name.toLowerCase() });
    if (package == null) {
      return res.status(404).json({ message: 'Package not found' });
    }

    await package.remove();
    res.json({ message: 'Deleted Package' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
