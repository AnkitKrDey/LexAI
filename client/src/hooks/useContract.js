import { useCallback, useState } from 'react';
import { api, apiErrorMessage } from '@/lib/api';

export const useContract = () => {
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchContracts = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const { data } = await api.get('/contracts');
      setContracts(data.contracts || []);
      return data.contracts || [];
    } catch (err) {
      const message = apiErrorMessage(err, 'Failed to load contracts.');
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  }, []);

  const getContract = useCallback(async (id) => {
    const { data } = await api.get(`/contracts/${id}`);
    return data.contract;
  }, []);

  const createContract = useCallback(async (payload) => {
    const { data } = await api.post('/contracts', payload);
    return data.contract;
  }, []);

  const updateContract = useCallback(async (id, payload) => {
    const { data } = await api.put(`/contracts/${id}`, payload);
    return data.contract;
  }, []);

  const deleteContract = useCallback(async (id) => {
    await api.delete(`/contracts/${id}`);
  }, []);

  return {
    contracts,
    loading,
    error,
    fetchContracts,
    getContract,
    createContract,
    updateContract,
    deleteContract,
  };
};
