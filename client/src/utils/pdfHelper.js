import { api, apiErrorMessage } from '@/lib/api';

export const downloadContractPdf = async (contract) => {
  try {
    const response = await api.post('/pdf/generate', { contract }, { responseType: 'blob' });
    const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = `${(contract.title || 'contract').replace(/\s+/g, '-').toLowerCase()}.pdf`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
    return { success: true };
  } catch (error) {
    return { success: false, message: apiErrorMessage(error, 'Failed to generate PDF.') };
  }
};
