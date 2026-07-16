import { format } from 'date-fns';
import { motion } from 'framer-motion';
import { FilePenLine, Trash2, Eye } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const riskTone = {
  Low: 'low',
  Medium: 'medium',
  High: 'high',
};

export const ContractCard = ({ contract, onView, onEdit, onDelete, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ y: -4 }}
    transition={{ delay: index * 0.05 }}
  >
    <Card className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Badge tone={contract.type?.toLowerCase()}>{contract.type}</Badge>
          <Badge tone={contract.status}>{contract.status}</Badge>
        </div>
        <Badge tone={riskTone[contract?.riskAnalysis?.riskScore] || 'medium'}>
          Risk: {contract?.riskAnalysis?.riskScore || 'Medium'}
        </Badge>
      </div>

      <div>
        <h3 className="text-lg font-semibold">{contract.title}</h3>
        <p className="text-sm text-slate-500">
          Created {contract.createdAt?.seconds ? format(contract.createdAt.seconds * 1000, 'PPP') : 'Recently'}
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button size="sm" variant="secondary" onClick={onView}>
          <Eye className="mr-1 h-4 w-4" /> View
        </Button>
        <Button size="sm" variant="secondary" onClick={onEdit}>
          <FilePenLine className="mr-1 h-4 w-4" /> Edit
        </Button>
        <Button size="sm" variant="danger" onClick={onDelete}>
          <Trash2 className="mr-1 h-4 w-4" /> Delete
        </Button>
      </div>
    </Card>
  </motion.div>
);
