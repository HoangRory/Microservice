import '../config/env.js';
import { Router } from 'express';
const router = Router();
import  get  from 'axios';
const CART_SERVICE_URL = process.env.CART_SERVICE_URL;

router.get('/', async (req, res) => {
  try {
    const response = await get(`${CART_SERVICE_URL}/cart/${req.user.id}`);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Cart Service Error' });
  }
});

export default router;
