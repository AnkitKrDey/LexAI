import { useState } from 'react';
import { motion } from 'framer-motion';
import { Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';

export const ClauseEditor = ({ clause, onSave, onDelete }) => {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(clause.text);

  return (
    <motion.div layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <Card className="space-y-3">
        {editing ? (
          <>
            <Textarea value={value} onChange={(e) => setValue(e.target.value)} />
            <div className="flex gap-2">
              <Button
                size="sm"
                onClick={() => {
                  onSave(value);
                  setEditing(false);
                }}
              >
                Save
              </Button>
              <Button size="sm" variant="secondary" onClick={() => setEditing(false)}>
                Cancel
              </Button>
            </div>
          </>
        ) : (
          <>
            <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">{clause.text}</p>
            <div className="flex gap-2">
              <Button size="sm" variant="secondary" onClick={() => setEditing(true)}>
                <Pencil className="mr-1 h-4 w-4" /> Edit
              </Button>
              <Button size="sm" variant="danger" onClick={onDelete}>
                <Trash2 className="mr-1 h-4 w-4" /> Delete
              </Button>
            </div>
          </>
        )}
      </Card>
    </motion.div>
  );
};
