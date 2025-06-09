import '../config/env.js'; // Load environment variables
import { Router } from 'express';
const router = Router();
import get from 'axios';
const PROFILE_SERVICE_URL = process.env.PROFILE_SERVICE_URL;

router.get('/', async (req, res) => {
  try {
    const userId = req.user.id; 
    const response = await get(`${PROFILE_SERVICE_URL}/profile/${userId}`);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'User Service Error' });
  }
});

export default router;
