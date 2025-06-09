import { Router } from 'express';
const router = Router();
import axios from 'axios';

// Route đăng nhập
router.post('/login', async (req, res) => {
  console.log('Login request received:', req.body);
  const { username, password } = req.body;

  // Kiểm tra thông tin đăng nhập, giả sử bạn có một auth service
  try {
    // Gọi Auth Service để kiểm tra user và password
    console.log('path', `${process.env.AUTH_SERVICE_URL}/auth/login`);
    console.log('body', { username, password });
    const response = await axios.post(`${process.env.AUTH_SERVICE_URL}/auth/login`, { username, password });
    if (response.status === 200) {
      const token = response.data.token;
      return res.json({ token });
    }
    return res.status(401).json({ error: 'Invalid credentials' });
  } catch (error) {
    return res.status(500).json({ error: 'Auth service error' + error.message });
  }
});

export default router;
