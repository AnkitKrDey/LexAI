import validator from 'validator';
import { geminiService } from '../services/geminiService.js';

const validTypes = ['NDA', 'Freelance', 'Service'];

export const aiController = {
  async generateContract(req, res, next) {
    try {
      const { contractType, formData } = req.body;

      if (!validTypes.includes(contractType)) {
        return res.status(400).json({ message: 'Invalid contract type.' });
      }

      if (!formData || typeof formData !== 'object') {
        return res.status(400).json({ message: 'Form data is required.' });
      }

      const content = await geminiService.generateContract(contractType, formData);
      if (!content || !validator.isLength(content, { min: 200 })) {
        return res.status(502).json({ message: 'AI returned an incomplete contract. Please try again.' });
      }

      return res.status(200).json({ content });
    } catch (error) {
      return next(error);
    }
  },

  async analyzeContract(req, res, next) {
    try {
      const { contractText } = req.body;
      if (!contractText || !validator.isLength(contractText, { min: 100 })) {
        return res.status(400).json({ message: 'Contract text must be at least 100 characters.' });
      }

      const riskAnalysis = await geminiService.analyzeRisk(contractText);
      return res.status(200).json({ riskAnalysis });
    } catch (error) {
      return next(error);
    }
  },

  async summarizeContract(req, res, next) {
    try {
      const { contractText } = req.body;
      if (!contractText || !validator.isLength(contractText, { min: 100 })) {
        return res.status(400).json({ message: 'Contract text must be at least 100 characters.' });
      }

      const summary = await geminiService.summarize(contractText);
      return res.status(200).json({ summary });
    } catch (error) {
      return next(error);
    }
  },
};
