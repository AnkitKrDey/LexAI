import { pdfService } from '../services/pdfService.js';

export const pdfController = {
  async generatePdf(req, res, next) {
    try {
      const { contract } = req.body;

      if (!contract || typeof contract !== 'object') {
        return res.status(400).json({ message: 'Contract payload is required.' });
      }

      const parties = {
        partyA:
          contract.formData?.disclosingPartyName ||
          contract.formData?.clientName ||
          contract.formData?.serviceProviderName ||
          'Party A',
        partyB:
          contract.formData?.receivingPartyName ||
          contract.formData?.freelancerName ||
          contract.formData?.clientName ||
          'Party B',
      };

      const pdfBuffer = await pdfService.generateContractPdf({
        type: contract.type,
        title: contract.title,
        jurisdiction:
          contract.formData?.jurisdiction ||
          contract.formData?.governingLaw ||
          contract.formData?.governingLawJurisdiction ||
          '[CITY, STATE]',
        parties,
        content: contract.content,
      });

      const safeTitle = (contract.title || 'contract').toLowerCase().replace(/[^a-z0-9]+/g, '-');
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename="${safeTitle}.pdf"`);
      return res.status(200).send(pdfBuffer);
    } catch (error) {
      return next(error);
    }
  },
};
