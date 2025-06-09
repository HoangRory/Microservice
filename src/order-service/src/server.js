import express, { json } from 'express';
import orderRoutes from './routes/orderRoutes.js';
import dotenv from 'dotenv';
dotenv.config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 3004;

app.use(json());
app.use('/orders', orderRoutes);

app.listen(PORT, () => {
  console.log(`Order Service running on port ${PORT}`);
});
