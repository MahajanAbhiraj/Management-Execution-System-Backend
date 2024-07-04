const FG = require('../models/fg');

// Get all FG records
exports.getAllFGs = async (req, res) => {
  try {
    const fgs = await FG.find();
    res.json(fgs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get FG by recipeName
exports.getFGByRecipeName = async (req, res) => {
  try {
    const fg = await FG.findOne({ recipeName: req.params.recipeName });
    if (fg == null) {
      return res.status(404).json({ message: 'FG not found' });
    }
    res.json(fg);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new FG
exports.createFG = async (req, res) => {
  const fg = new FG({
    recipeName: req.body.recipeName,
    TotalWeight: req.body.TotalWeight
  });

  try {
    const newFG = await fg.save();
    res.status(201).json(newFG);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update FG by recipeName
exports.updateFG = async (req, res) => {
  try {
    const fg = await FG.findOne({ recipeName: req.body.recipeName });

    if (fg) {
      // FG with the recipeName exists, update TotalWeight
      fg.TotalWeight += req.body.TotalWeight;
      
      const updatedFG = await fg.save();
      res.json(updatedFG);
    } else {
      // FG with the recipeName does not exist, create new FG
      const newFG = new FG({
        recipeName: req.body.recipeName,
        TotalWeight: req.body.TotalWeight
      });
      await newFG.save();
      res.status(201).json(newFG);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete FG by recipeName
exports.deleteFGByRecipeName = async (req, res) => {
  try {
    const fg = await FG.findOne({ recipeName: req.params.recipeName });
    if (fg == null) {
      return res.status(404).json({ message: 'FG not found' });
    }

    await fg.remove();
    res.json({ message: 'Deleted FG' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
