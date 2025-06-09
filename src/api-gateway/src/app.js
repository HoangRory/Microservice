import './config/env.js'; 
import express from 'express';
import cors from 'cors';

import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import profileRoutes from './routes/profileRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import cartRoutes from './routes/cartRoutes.js';

import authMiddleware from './middlewares/authMiddleware.js';

const app = express();
app.use(cors());
app.use(express.json());


// Auth không cần kiểm tra token
app.use('/api/auth', authRoutes);

// Các service còn lại phải kiểm tra token
app.use('/api/products', authMiddleware, productRoutes);
app.use('/api/profile', authMiddleware, profileRoutes);
app.use('/api/orders', authMiddleware, orderRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 API Gateway running on port ${PORT}`);
});
