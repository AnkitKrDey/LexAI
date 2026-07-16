import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';

export const StatsWidget = ({ label, value, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.08 }}
  >
    <Card>
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-2 text-3xl font-semibold">{value}</p>
    </Card>
  </motion.div>
);
