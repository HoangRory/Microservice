import '../config/env.js'; // Load environment variables
import { Router } from 'express';
const router = Router();
import axios from 'axios';
const PRODUCT_SERVICE_URL = process.env.PRODUCT_SERVICE_URL;

router.get('/', async (req, res) => {
  try {
    console.log('get path :' + PRODUCT_SERVICE_URL + '/products');
    const response = await axios.get(`${PRODUCT_SERVICE_URL}/products`);
    if (response.status !== 200) {
      return res.status(response.status).json({ error: 'Failed to fetch products' });
    }
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Product Service Error' });
  }
});

export default router;
