import express from 'express';
import { pdfController } from '../controllers/pdf.controller.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { inputSanitizer } from '../middleware/inputSanitizer.js';

const router = express.Router();

router.use(authMiddleware);
router.post('/generate', inputSanitizer, pdfController.generatePdf);

export default router;
