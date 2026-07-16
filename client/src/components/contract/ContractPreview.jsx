import { Card } from '@/components/ui/card';

export const ContractPreview = ({ content }) => (
  <Card className="max-h-[70vh] overflow-auto whitespace-pre-wrap text-sm leading-7 text-slate-700 dark:text-slate-300">
    {content || 'Contract content will appear here.'}
  </Card>
);
