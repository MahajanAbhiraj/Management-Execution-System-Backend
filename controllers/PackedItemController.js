const PackedItem = require('../models/PackedItem');

// Get all PackedItems
exports.getAllPackedItems = async (req, res) => {
  try {
    const packedItems = await PackedItem.find();
    res.json(packedItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get PackedItem by Name
exports.getPackedItemByName = async (req, res) => {
  try {
    const name = req.params.name.toLowerCase();
    const packedItem = await PackedItem.findOne({ Name: name });
    if (!packedItem) {
      return res.status(404).json({ message: 'PackedItem not found' });
    }
    res.json(packedItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create or Update PackedItem
exports.createOrUpdatePackedItem = async (req, res) => {
  const { Name, Total_Quantity } = req.body;
  if (!Name || !Total_Quantity) {
    return res.status(400).json({ message: 'Name and Total_Quantity are required' });
  }

  try {
    let packedItem = await PackedItem.findOne({ Name: Name.toLowerCase() });
    if (packedItem) {
      // If packed item exists, update the total quantity
      packedItem.Total_Quantity += Total_Quantity;
    } else {
      // If packed item does not exist, create a new one
      packedItem = new PackedItem({ Name, Total_Quantity });
    }
    const savedPackedItem = await packedItem.save();
    res.status(201).json(savedPackedItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update PackedItem by Name
exports.updatePackedItemByName = async (req, res) => {
  try {
    const name = req.params.name.toLowerCase();
    const packedItem = await PackedItem.findOne({ Name: name });
    if (!packedItem) {
      return res.status(404).json({ message: 'PackedItem not found' });
    }

    const { Name, Total_Quantity } = req.body;
    if (Total_Quantity != null) packedItem.Total_Quantity = Total_Quantity;

    const updatedPackedItem = await packedItem.save();
    res.json(updatedPackedItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete PackedItem by Name
exports.deletePackedItemByName = async (req, res) => {
  try {
    const name = req.params.name.toLowerCase();
    const result = await PackedItem.deleteOne({ Name: name });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'PackedItem not found' });
    }
    res.json({ message: 'Deleted PackedItem' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
