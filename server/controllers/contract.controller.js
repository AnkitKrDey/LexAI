import validator from 'validator';
import { firestoreService } from '../services/firestoreService.js';

const allowedTypes = ['NDA', 'Freelance', 'Service'];
const allowedStatus = ['draft', 'completed'];

const parseClauses = (content = '') => {
  const lines = content.split(/\n+/).map((line) => line.trim()).filter(Boolean);
  return lines
    .filter((line) => /^\d/.test(line) || /^\*\*[A-Z\s]+\*\*$/.test(line))
    .map((text, index) => ({ id: `clause-${index + 1}`, text, order: index + 1 }));
};

export const contractController = {
  async getContracts(req, res, next) {
    try {
      const contracts = await firestoreService.getContractsByUser(req.user.uid);
      return res.status(200).json({ contracts });
    } catch (error) {
      return next(error);
    }
  },

  async createContract(req, res, next) {
    try {
      const { type, title, formData, content = '', status = 'draft', riskAnalysis, simpleSummary } = req.body;

      if (!allowedTypes.includes(type)) {
        return res.status(400).json({ message: 'Invalid contract type.' });
      }

      if (!title || !validator.isLength(title, { min: 3, max: 120 })) {
        return res.status(400).json({ message: 'Title must be between 3 and 120 characters.' });
      }

      if (!allowedStatus.includes(status)) {
        return res.status(400).json({ message: 'Invalid status value.' });
      }

      const created = await firestoreService.createContract({
        userId: req.user.uid,
        type,
        title,
        formData,
        content,
        clauses: parseClauses(content),
        riskAnalysis,
        simpleSummary,
        status,
      });

      return res.status(201).json({ contract: created });
    } catch (error) {
      return next(error);
    }
  },

  async getContractById(req, res, next) {
    try {
      const contract = await firestoreService.getContractById(req.params.id);

      if (!contract) {
        return res.status(404).json({ message: 'Contract not found.' });
      }

      if (contract.userId !== req.user.uid) {
        return res.status(403).json({ message: 'Forbidden.' });
      }

      return res.status(200).json({ contract });
    } catch (error) {
      return next(error);
    }
  },

  async updateContract(req, res, next) {
    try {
      const contract = await firestoreService.getContractById(req.params.id);

      if (!contract) {
        return res.status(404).json({ message: 'Contract not found.' });
      }

      if (contract.userId !== req.user.uid) {
        return res.status(403).json({ message: 'Forbidden.' });
      }

      const payload = { ...req.body };

      if (payload.title && !validator.isLength(payload.title, { min: 3, max: 120 })) {
        return res.status(400).json({ message: 'Title must be between 3 and 120 characters.' });
      }

      if (payload.type && !allowedTypes.includes(payload.type)) {
        return res.status(400).json({ message: 'Invalid contract type.' });
      }

      if (payload.status && !allowedStatus.includes(payload.status)) {
        return res.status(400).json({ message: 'Invalid status value.' });
      }

      if (payload.content && !payload.clauses) {
        payload.clauses = parseClauses(payload.content);
      }

      const updated = await firestoreService.updateContract(req.params.id, payload);
      return res.status(200).json({ contract: updated });
    } catch (error) {
      return next(error);
    }
  },

  async deleteContract(req, res, next) {
    try {
      const contract = await firestoreService.getContractById(req.params.id);

      if (!contract) {
        return res.status(404).json({ message: 'Contract not found.' });
      }

      if (contract.userId !== req.user.uid) {
        return res.status(403).json({ message: 'Forbidden.' });
      }

      await firestoreService.deleteContract(req.params.id, req.user.uid);
      return res.status(200).json({ message: 'Contract deleted successfully.' });
    } catch (error) {
      return next(error);
    }
  },
};
