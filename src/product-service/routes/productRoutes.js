import { Router } from 'express';
import Product from '../models/product.js';

const router = Router();

router.get('/products', async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
