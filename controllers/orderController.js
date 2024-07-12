const Order = require('../models/order');

// Get all Orders
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Order by ID
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new Order
exports.createOrder = async (req, res) => {
  const { Name, Quantity, Remarks } = req.body;
  if (!Name || !Quantity || !Remarks) {
    return res.status(400).json({ message: 'Name, Quantity, and Remarks are required' });
  }

  const order = new Order({
    Name,
    Quantity,
    Remarks
  });

  try {
    const newOrder = await order.save();
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update Order by ID
exports.updateOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    const { Name, Quantity, Remarks } = req.body;
    if (Name != null) order.Name = Name;
    if (Quantity != null) order.Quantity = Quantity;
    if (Remarks != null) order.Remarks = Remarks;

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete Order by ID
exports.deleteOrderById = async (req, res) => {
  try {
    const result = await Order.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json({ message: 'Deleted Order' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
