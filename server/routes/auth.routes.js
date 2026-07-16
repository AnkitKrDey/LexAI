import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { firestoreService } from '../services/firestoreService.js';

const router = express.Router();

router.post('/register', authMiddleware, async (req, res, next) => {
  try {
    const user = await firestoreService.upsertUser({
      uid: req.user.uid,
      name: req.body.name || req.user.name || req.user.email?.split('@')[0],
      email: req.user.email,
    });
    return res.status(201).json({ user });
  } catch (error) {
    return next(error);
  }
});

router.post('/verify', authMiddleware, async (req, res, next) => {
  try {
    const user = await firestoreService.getUser(req.user.uid);
    if (!user) {
      const created = await firestoreService.upsertUser({
        uid: req.user.uid,
        name: req.user.name,
        email: req.user.email,
      });
      return res.status(200).json({ user: created });
    }

    return res.status(200).json({ user });
  } catch (error) {
    return next(error);
  }
});

export default router;
