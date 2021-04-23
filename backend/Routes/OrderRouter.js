const express = require('express');
const {createOrder, getOrder, updateOrder, getOrderStatus, updatePaymentStatus, getOrders} = require('../Controllers/OrderController');
const {protectRoute} = require('../Controllers/AuthenticationController');

const orderRouter = express.Router();

orderRouter.route('/').post(protectRoute, createOrder);
orderRouter.route('/').get(protectRoute, getOrders);
orderRouter.route('/status/:orderId').get(protectRoute, getOrderStatus);
orderRouter.route('/payment/:orderId').post(protectRoute, updatePaymentStatus);
orderRouter.route('/:orderId').get(protectRoute, getOrder);
orderRouter.route('/:orderId').patch(protectRoute, updateOrder);


module.exports = orderRouter;
