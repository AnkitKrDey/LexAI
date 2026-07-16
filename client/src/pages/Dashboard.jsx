import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, FilePlus } from 'lucide-react';
import { ContractCard } from '@/components/dashboard/ContractCard';
import { StatsWidget } from '@/components/dashboard/StatsWidget';
import { Modal } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { useContract } from '@/hooks/useContract';

export default function Dashboard() {
  const { profile } = useAuth();
  const { contracts, fetchContracts, deleteContract, loading, error } = useContract();
  const navigate = useNavigate();

  const [contractToDelete, setContractToDelete] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    fetchContracts().catch(() => {});
  }, [fetchContracts]);

  const stats = useMemo(() => {
    const total = contracts.length;
    const drafts = contracts.filter((contract) => contract.status === 'draft').length;
    const completed = contracts.filter((contract) => contract.status === 'completed').length;
    return { total, drafts, completed };
  }, [contracts]);

  const firstName = profile?.name?.split(' ')[0] || 'there';

  const confirmDelete = async () => {
    if (!contractToDelete) return;
    setDeleteLoading(true);
    try {
      await deleteContract(contractToDelete.contractId);
      await fetchContracts();
      setContractToDelete(null);
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-2xl font-semibold">Good morning, {firstName} 👋</h2>
        <Button onClick={() => navigate('/create')}>
          <Plus className="mr-2 h-4 w-4" /> + New Contract
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <StatsWidget label="Total Contracts" value={stats.total} index={0} />
        <StatsWidget label="Drafts" value={stats.drafts} index={1} />
        <StatsWidget label="Completed" value={stats.completed} index={2} />
      </div>

      {loading ? <p className="text-sm text-slate-500">Loading contracts...</p> : null}
      {error ? <p className="text-sm text-red-600">{error}</p> : null}

      {!loading && contracts.length === 0 ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-2xl border border-dashed border-slate-300 p-10 text-center dark:border-slate-700">
          <FilePlus className="mx-auto h-10 w-10 text-slate-400" />
          <p className="mt-4 text-lg font-medium">Create your first contract</p>
          <p className="text-sm text-slate-500">Start with NDA, Freelance, or Service agreement templates.</p>
          <Button className="mt-4" onClick={() => navigate('/create')}>Create Contract</Button>
        </motion.div>
      ) : null}

      <div className="grid gap-4">
        {contracts.map((contract, index) => (
          <ContractCard
            key={contract.contractId}
            contract={contract}
            index={index}
            onView={() => navigate(`/contracts/${contract.contractId}`)}
            onEdit={() => navigate(`/contracts/${contract.contractId}`)}
            onDelete={() => setContractToDelete(contract)}
          />
        ))}
      </div>

      <Modal open={Boolean(contractToDelete)} onOpenChange={() => setContractToDelete(null)} title="Delete contract?">
        <p className="text-sm text-slate-600 dark:text-slate-300">
          This action cannot be undone. The selected contract will be permanently removed.
        </p>
        <div className="mt-4 flex gap-2">
          <Button variant="danger" onClick={confirmDelete} disabled={deleteLoading}>
            {deleteLoading ? 'Deleting...' : 'Delete'}
          </Button>
          <Button variant="secondary" onClick={() => setContractToDelete(null)}>Cancel</Button>
        </div>
      </Modal>
    </div>
  );
}
