import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, FileDown, Sparkles, ShieldCheck, Plus } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Modal } from '@/components/ui/modal';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { ClauseEditor } from '@/components/contract/ClauseEditor';
import { ContractPreview } from '@/components/contract/ContractPreview';
import { downloadContractPdf } from '@/utils/pdfHelper';
import { api, apiErrorMessage } from '@/lib/api';
import { useContract } from '@/hooks/useContract';

const parseClauses = (content = '') =>
  content
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean)
    .filter((line) => /^\d/.test(line) || /^\*\*[A-Z\s]+\*\*$/.test(line))
    .map((text, idx) => ({ id: `clause-${idx + 1}`, text, order: idx + 1 }));

const riskTone = {
  Low: 'low',
  Medium: 'medium',
  High: 'high',
};

export default function ContractView() {
  const { id } = useParams();
  const { getContract, updateContract } = useContract();

  const [contract, setContract] = useState(null);
  const [clauses, setClauses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [error, setError] = useState('');
  const [addClauseOpen, setAddClauseOpen] = useState(false);
  const [newClause, setNewClause] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [summarizing, setSummarizing] = useState(false);
  const [pdfLoading, setPdfLoading] = useState(false);

  useEffect(() => {
    const run = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await getContract(id);
        setContract(data);
        setClauses(data.clauses?.length ? data.clauses : parseClauses(data.content));
      } catch (err) {
        setError(apiErrorMessage(err, 'Failed to load contract.'));
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [getContract, id]);

  useEffect(() => {
    if (!dirty || !contract) return;
    const timeout = setTimeout(async () => {
      setSaving(true);
      try {
        const content = clauses.map((item) => item.text).join('\n\n');
        const updated = await updateContract(contract.contractId, { clauses, content });
        setContract(updated);
        setDirty(false);
      } catch (err) {
        setError(apiErrorMessage(err, 'Auto-save failed.'));
      } finally {
        setSaving(false);
      }
    }, 900);

    return () => clearTimeout(timeout);
  }, [dirty, clauses, contract, updateContract]);

  const content = useMemo(() => clauses.map((item) => item.text).join('\n\n'), [clauses]);

  const handleSaveAll = async () => {
    if (!contract) return;
    setSaving(true);
    try {
      const updated = await updateContract(contract.contractId, { clauses, content });
      setContract(updated);
      setDirty(false);
    } catch (err) {
      setError(apiErrorMessage(err, 'Unable to save changes.'));
    } finally {
      setSaving(false);
    }
  };

  const handleAnalyze = async () => {
    if (!contract) return;
    setAnalyzing(true);
    setError('');
    try {
      const { data } = await api.post('/ai/analyze', { contractText: content });
      const updated = await updateContract(contract.contractId, { riskAnalysis: data.riskAnalysis });
      setContract(updated);
    } catch (err) {
      setError(apiErrorMessage(err, 'Failed to analyze contract risk.'));
    } finally {
      setAnalyzing(false);
    }
  };

  const handleSummarize = async () => {
    if (!contract) return;
    setSummarizing(true);
    setError('');
    try {
      const { data } = await api.post('/ai/summarize', { contractText: content });
      const updated = await updateContract(contract.contractId, { simpleSummary: data.summary });
      setContract(updated);
    } catch (err) {
      setError(apiErrorMessage(err, 'Failed to create summary.'));
    } finally {
      setSummarizing(false);
    }
  };

  const handlePdf = async () => {
    if (!contract) return;
    setPdfLoading(true);
    const result = await downloadContractPdf({ ...contract, content });
    if (!result.success) {
      setError(result.message);
    }
    setPdfLoading(false);
  };

  if (loading) {
    return <p className="text-sm text-slate-500">Loading contract...</p>;
  }

  if (!contract) {
    return <p className="text-sm text-red-600">Contract not found.</p>;
  }

  return (
    <div className="grid gap-6 lg:grid-cols-5">
      <div className="space-y-4 lg:col-span-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-2xl font-semibold">{contract.title}</h2>
          <div className="flex items-center gap-2">
            {dirty ? <span className="text-xs text-amber-600">Unsaved changes</span> : null}
            <Button size="sm" onClick={handleSaveAll} disabled={saving}>
              {saving ? 'Saving...' : 'Save All'}
            </Button>
          </div>
        </div>

        <AnimatePresence>
          {clauses.map((clause, index) => (
            <ClauseEditor
              key={clause.id}
              clause={clause}
              onSave={(text) => {
                setClauses((prev) => prev.map((item, idx) => (idx === index ? { ...item, text } : item)));
                setDirty(true);
              }}
              onDelete={() => {
                setClauses((prev) => prev.filter((_, idx) => idx !== index));
                setDirty(true);
              }}
            />
          ))}
        </AnimatePresence>

        <Button variant="secondary" onClick={() => setAddClauseOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add Custom Clause
        </Button>

        <ContractPreview content={content} />
      </div>

      <div className="lg:col-span-2">
        <Card>
          <Tabs defaultValue="risk">
            <TabsList>
              <TabsTrigger value="risk">Risk Analysis</TabsTrigger>
              <TabsTrigger value="summary">Simple Summary</TabsTrigger>
              <TabsTrigger value="export">Export</TabsTrigger>
            </TabsList>

            <TabsContent value="risk" className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">Risk Score</p>
                <Badge tone={riskTone[contract.riskAnalysis?.riskScore] || 'medium'}>
                  {contract.riskAnalysis?.riskScore || 'Medium'}
                </Badge>
              </div>

              <Accordion type="single" collapsible className="space-y-2">
                {(contract.riskAnalysis?.riskyClauses || []).map((item, index) => (
                  <AccordionItem key={`${item.clause}-${index}`} value={`risk-${index}`}>
                    <AccordionTrigger>
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-amber-500" />
                        <span className="truncate">{item.clause}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="mb-2 text-sm">{item.risk}</p>
                      <Badge tone={(item.severity || 'Medium').toLowerCase()}>{item.severity || 'Medium'}</Badge>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>

              <div className="space-y-3">
                <p className="text-sm font-medium">Suggestions</p>
                {(contract.riskAnalysis?.suggestions || []).map((suggestion, index) => (
                  <Card key={index} className="space-y-2 bg-slate-50 dark:bg-slate-900">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Original</p>
                    <p className="text-sm">{suggestion.original}</p>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Improved</p>
                    <p className="text-sm">{suggestion.improved}</p>
                  </Card>
                ))}
              </div>

              <Button variant="secondary" onClick={handleAnalyze} disabled={analyzing}>
                <ShieldCheck className="mr-2 h-4 w-4" /> {analyzing ? 'Re-analyzing...' : 'Re-analyze'}
              </Button>
            </TabsContent>

            <TabsContent value="summary" className="space-y-4">
              <Button variant="secondary" onClick={handleSummarize} disabled={summarizing}>
                <Sparkles className="mr-2 h-4 w-4" />
                {summarizing ? 'Explaining...' : 'Explain in Simple Terms'}
              </Button>

              <AnimatePresence>
                {contract.simpleSummary ? (
                  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
                    <Card className="whitespace-pre-wrap text-sm leading-7">{contract.simpleSummary}</Card>
                  </motion.div>
                ) : (
                  <p className="text-sm text-slate-500">No summary generated yet.</p>
                )}
              </AnimatePresence>
            </TabsContent>

            <TabsContent value="export" className="space-y-4">
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Download your contract as a professionally formatted PDF with page numbers and signature blocks.
              </p>
              <Button onClick={handlePdf} disabled={pdfLoading}>
                <FileDown className="mr-2 h-4 w-4" /> {pdfLoading ? 'Generating PDF...' : 'Download PDF'}
              </Button>
            </TabsContent>
          </Tabs>
        </Card>
      </div>

      {error ? <p className="lg:col-span-5 text-sm text-red-600">{error}</p> : null}

      <Modal open={addClauseOpen} onOpenChange={setAddClauseOpen} title="Add Custom Clause">
        <Textarea
          placeholder="Enter your custom clause text..."
          value={newClause}
          onChange={(event) => setNewClause(event.target.value)}
        />
        <div className="mt-4 flex gap-2">
          <Button
            onClick={() => {
              if (!newClause.trim()) return;
              setClauses((prev) => [...prev, { id: `clause-${Date.now()}`, text: newClause.trim(), order: prev.length + 1 }]);
              setDirty(true);
              setNewClause('');
              setAddClauseOpen(false);
            }}
          >
            Add Clause
          </Button>
          <Button variant="secondary" onClick={() => setAddClauseOpen(false)}>Cancel</Button>
        </div>
      </Modal>
    </div>
  );
}
