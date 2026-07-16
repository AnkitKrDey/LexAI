import express from 'express';
import { contractController } from '../controllers/contract.controller.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { inputSanitizer } from '../middleware/inputSanitizer.js';

const router = express.Router();

router.use(authMiddleware);
router.get('/', contractController.getContracts);
router.post('/', inputSanitizer, contractController.createContract);
router.get('/:id', contractController.getContractById);
router.put('/:id', inputSanitizer, contractController.updateContract);
router.delete('/:id', contractController.deleteContract);

export default router;
