import express from 'express';
import { aiController } from '../controllers/ai.controller.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { generationLimiter } from '../middleware/rateLimiter.js';
import { inputSanitizer } from '../middleware/inputSanitizer.js';

const router = express.Router();

router.use(authMiddleware);
router.post('/generate', generationLimiter, inputSanitizer, aiController.generateContract);
router.post('/analyze', inputSanitizer, aiController.analyzeContract);
router.post('/summarize', inputSanitizer, aiController.summarizeContract);

export default router;
