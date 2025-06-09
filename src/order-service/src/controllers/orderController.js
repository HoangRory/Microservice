import * as Order from '../models/orderModel.js';

export const create = async (req, res) => {
  const { userId, productId, total } = req.body;
  try {
    const order = await Order.createOrder(userId, productId, total);
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: 'Error creating order', error: err.message });
  }
};

export const get = async (req, res) => {
  try {
    const userId = req.query.userId;
    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }
    const orders = await Order.getAllOrders(userId);
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching orders', error: err.message });
  }
};
