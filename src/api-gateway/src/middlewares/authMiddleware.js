import jsonwebtoken  from 'jsonwebtoken';
import '../config/env.js'; 

const JWT_SECRET = process.env.JWT_SECRET;
export default (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token missing or invalid' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jsonwebtoken.verify(token, JWT_SECRET);
    req.user = decoded; 
    next();
  } catch (err) {
    return res.status(401).json({ error: err.message || 'Unauthorized' });
  }
};
