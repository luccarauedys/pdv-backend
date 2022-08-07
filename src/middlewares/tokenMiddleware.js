import jwt from 'jsonwebtoken';
import { unauthorizedError } from '../utils/errorUtils.js';

export const verifyJWT = (req, res, next) => {
  const token = req.headers.authorization?.replace('Bearer ', '');

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) throw unauthorizedError('Invalid token');
    if (decoded) res.locals.companyId = decoded.companyId;
  });

  next();
};
