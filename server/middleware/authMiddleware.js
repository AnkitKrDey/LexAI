import { firebaseAdmin } from '../config/firebase.config.js';

const parseToken = (authHeader = '') => {
  if (!authHeader.startsWith('Bearer ')) return null;
  return authHeader.slice(7).trim();
};

export const authMiddleware = async (req, res, next) => {
  try {
    const token = parseToken(req.headers.authorization);
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized: Missing Bearer token.' });
    }

    const decoded = await firebaseAdmin.auth().verifyIdToken(token);
    req.user = decoded;
    return next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized: Invalid or expired token.' });
  }
};
