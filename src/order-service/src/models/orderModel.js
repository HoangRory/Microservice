import db from '../db.js'

export const createOrder = async (userId, productId, total) => {
  const result = await db.query(
    'INSERT INTO orders (user_id, product_id, total) VALUES ($1, $2, $3) RETURNING *',
    [userId, productId, total]
  );
  return result.rows[0];
};

export const getAllOrders = async (userId) => {
  const result = await db.query('SELECT * FROM orders WHERE user_id = $1', [userId]);
  return result.rows;
};
