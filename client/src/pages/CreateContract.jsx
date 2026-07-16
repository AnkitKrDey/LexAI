import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, BriefcaseBusiness, Shield } from 'lucide-react';
import { api, apiErrorMessage } from '@/lib/api';
import { ContractForm } from '@/components/contract/ContractForm';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { validateContractForm } from '@/utils/validators';
import { useContract } from '@/hooks/useContract';

const contractTypes = [
  {
    type: 'NDA',
    icon: Shield,
    description: 'Protect sensitive business information between parties.',
  },
  {
    type: 'Freelance',
    icon: BriefcaseBusiness,
    description: 'Define scope, payment, and IP terms for independent work.',
  },
  {
    type: 'Service',
    icon: FileText,
    description: 'Document recurring service obligations and liabilities.',
  },
];

const progressMessages = [
  'Analyzing your inputs...',
  'Drafting legal clauses...',
  'Structuring the document...',
  'Finalizing contract...',
];

export default function CreateContract() {
  const navigate = useNavigate();
  const { createContract } = useContract();

  const [step, setStep] = useState(1);
  const [selectedType, setSelectedType] = useState('');
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);
  const [error, setError] = useState('');

  const stepLabel = useMemo(() => ['Select Type', 'Fill Details', 'Review & Generate'], []);

  const updateField = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: '' }));
  };

  const handleNext = () => {
    if (step === 1 && !selectedType) {
      setError('Please select a contract type to continue.');
      return;
    }

    if (step === 2) {
      const validationErrors = validateContractForm(selectedType, formData);
      setErrors(validationErrors);
      if (Object.keys(validationErrors).length) {
        setError('Please fix validation errors before continuing.');
        return;
      }
    }

    setError('');
    setStep((prev) => Math.min(prev + 1, 3));
  };

  const handleGenerate = async () => {
    const validationErrors = validateContractForm(selectedType, formData);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length) {
      setError('Please fix validation errors before generating.');
      return;
    }

    setLoading(true);
    setError('');
    setMessageIndex(0);

    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev < progressMessages.length - 1 ? prev + 1 : prev));
    }, 1200);

    try {
      const generateRes = await api.post('/ai/generate', {
        contractType: selectedType,
        formData,
      });

      const content = generateRes.data.content;
      const title = `${selectedType} Agreement`;

      const contract = await createContract({
        type: selectedType,
        title,
        formData,
        content,
        status: 'completed',
      });

      navigate(`/contracts/${contract.contractId}`);
    } catch (err) {
      setError(apiErrorMessage(err, 'Contract generation failed. Please try again.'));
    } finally {
      clearInterval(interval);
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">Create New Contract</h2>
        <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
          {stepLabel.map((label, index) => (
            <div key={label} className={`rounded-full px-3 py-1 ${step >= index + 1 ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-300'}`}>
              {index + 1}. {label}
            </div>
          ))}
        </div>
      </div>

      {step === 1 ? (
        <div className="grid gap-4 md:grid-cols-3">
          {contractTypes.map((card) => (
            <motion.button
              key={card.type}
              whileHover={{ y: -4 }}
              onClick={() => {
                setSelectedType(card.type);
                setError('');
              }}
              className={`rounded-2xl border p-5 text-left shadow-soft transition ${
                selectedType === card.type
                  ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900'
              }`}
            >
              <card.icon className="h-6 w-6 text-blue-600" />
              <h3 className="mt-3 text-lg font-semibold">{card.type}</h3>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{card.description}</p>
            </motion.button>
          ))}
        </div>
      ) : null}

      {step === 2 ? (
        <Card>
          <ContractForm type={selectedType} formData={formData} onChange={updateField} errors={errors} />
        </Card>
      ) : null}

      {step === 3 ? (
        <Card>
          <AnimatePresence mode="wait">
            {!loading ? (
              <motion.div key="ready" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <h3 className="text-xl font-semibold">Ready to generate</h3>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                  Review your details and generate a fully structured legal contract.
                </p>
                <Button className="mt-4" onClick={handleGenerate}>Generate Contract</Button>
              </motion.div>
            ) : (
              <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-6 text-center">
                <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
                <p className="mt-4 text-base font-medium">{progressMessages[messageIndex]}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>
      ) : null}

      {error ? <p className="text-sm text-red-600">{error}</p> : null}

      <div className="flex flex-wrap gap-2">
        {step > 1 ? (
          <Button variant="secondary" onClick={() => setStep((prev) => Math.max(prev - 1, 1))}>
            Back
          </Button>
        ) : null}
        {step < 3 ? <Button onClick={handleNext}>Continue</Button> : null}
      </div>
    </div>
  );
}
