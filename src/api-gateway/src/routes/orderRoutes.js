import '../config/env.js'; // Load environment variables
import { Router } from 'express';
const router = Router();
import get from 'axios';
const ORDER_SERVICE_URL = process.env.ORDER_SERVICE_URL;

router.get('/', async (req, res) => {
  try {
    const response = await get(`${ORDER_SERVICE_URL}/orders?userId=${req.user.id}`);

    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Order Service Error' });
  }
});

router.post('/', async (req, res) => {
  const { productId, total } = req.body;
  try {
    const response = await get.post(`${ORDER_SERVICE_URL}/orders`, {
      userId: req.user.id,
      productId,
      total
    });
    res.status(201).json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Order Service Error' });
  }
});

export default router;
