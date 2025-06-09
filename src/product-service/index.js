import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import sequelize from './config.js';
import productRoutes from './routes/productRoutes.js';
import Product from './models/product.js';

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use('/', productRoutes);

app.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync(); // tạo bảng nếu chưa có
    console.log(`Product Service running at http://localhost:${PORT}`);
  } catch (err) {
    console.error('Unable to connect to DB:', err);
  }
});
