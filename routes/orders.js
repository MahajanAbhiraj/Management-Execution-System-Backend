const express = require('express');
const router = express.Router();
const orderController = require('../controllers/OrderController');

// Get all Orders
router.route('/').get(orderController.getAllOrders);

// Get Order by Name
//router.route('/name/:name').get(orderController.getOrderByName);

// Get Order by ID
router.route('/:id').get(orderController.getOrderById);

// Create new Order
router.route('/').post(orderController.createOrder);

// Update Order by ID
router.route('/:id').put(orderController.updateOrderById);

// Delete Order by ID
router.route('/:id').delete(orderController.deleteOrderById);

module.exports = router;
