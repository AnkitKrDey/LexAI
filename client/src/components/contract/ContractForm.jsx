import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';

const ErrorText = ({ children }) => (children ? <p className="mt-1 text-xs text-red-600">{children}</p> : null);

const Field = ({ label, children, error }) => (
  <div>
    <label className="mb-1 block text-sm font-medium">{label}</label>
    {children}
    <ErrorText>{error}</ErrorText>
  </div>
);

export const ContractForm = ({ type, formData, onChange, errors }) => {
  if (!type) return null;

  return (
    <div className="grid gap-4">
      {type === 'NDA' ? (
        <>
          <Field label="Disclosing Party Name" error={errors.disclosingPartyName}>
            <Input value={formData.disclosingPartyName || ''} onChange={(e) => onChange('disclosingPartyName', e.target.value)} />
          </Field>
          <Field label="Receiving Party Name" error={errors.receivingPartyName}>
            <Input value={formData.receivingPartyName || ''} onChange={(e) => onChange('receivingPartyName', e.target.value)} />
          </Field>
          <Field label="Jurisdiction" error={errors.jurisdiction}>
            <Input value={formData.jurisdiction || ''} onChange={(e) => onChange('jurisdiction', e.target.value)} />
          </Field>
          <Field label="Duration" error={errors.duration}>
            <Select value={formData.duration || ''} onValueChange={(value) => onChange('duration', value)}>
              <SelectTrigger />
              <SelectContent>
                <SelectItem value="1 year">1 year</SelectItem>
                <SelectItem value="2 years">2 years</SelectItem>
                <SelectItem value="3 years">3 years</SelectItem>
                <SelectItem value="5 years">5 years</SelectItem>
              </SelectContent>
            </Select>
          </Field>
          <Field label="Confidential Information Scope" error={errors.scope}>
            <Textarea value={formData.scope || ''} onChange={(e) => onChange('scope', e.target.value)} />
          </Field>
        </>
      ) : null}

      {type === 'Freelance' ? (
        <>
          <Field label="Client Name" error={errors.clientName}>
            <Input value={formData.clientName || ''} onChange={(e) => onChange('clientName', e.target.value)} />
          </Field>
          <Field label="Freelancer Name" error={errors.freelancerName}>
            <Input value={formData.freelancerName || ''} onChange={(e) => onChange('freelancerName', e.target.value)} />
          </Field>
          <Field label="Scope of Work" error={errors.scopeOfWork}>
            <Textarea value={formData.scopeOfWork || ''} onChange={(e) => onChange('scopeOfWork', e.target.value)} />
          </Field>
          <Field label="Payment Amount" error={errors.paymentAmount}>
            <Input type="number" value={formData.paymentAmount || ''} onChange={(e) => onChange('paymentAmount', e.target.value)} />
          </Field>
          <Field label="Payment Terms" error={errors.paymentTerms}>
            <Select value={formData.paymentTerms || ''} onValueChange={(value) => onChange('paymentTerms', value)}>
              <SelectTrigger />
              <SelectContent>
                <SelectItem value="hourly">hourly</SelectItem>
                <SelectItem value="milestone">milestone</SelectItem>
                <SelectItem value="fixed">fixed</SelectItem>
              </SelectContent>
            </Select>
          </Field>
          <Field label="Project Deadline" error={errors.projectDeadline}>
            <Input type="date" value={formData.projectDeadline || ''} onChange={(e) => onChange('projectDeadline', e.target.value)} />
          </Field>
          <Field label="Revision Policy" error={errors.revisionPolicy}>
            <Textarea value={formData.revisionPolicy || ''} onChange={(e) => onChange('revisionPolicy', e.target.value)} />
          </Field>
          <Field label="IP Ownership" error={errors.ipOwnership}>
            <Select value={formData.ipOwnership || ''} onValueChange={(value) => onChange('ipOwnership', value)}>
              <SelectTrigger />
              <SelectContent>
                <SelectItem value="client">client</SelectItem>
                <SelectItem value="freelancer">freelancer</SelectItem>
                <SelectItem value="shared">shared</SelectItem>
              </SelectContent>
            </Select>
          </Field>
          <Field label="Termination Clause" error={errors.terminationClause}>
            <Textarea value={formData.terminationClause || ''} onChange={(e) => onChange('terminationClause', e.target.value)} />
          </Field>
        </>
      ) : null}

      {type === 'Service' ? (
        <>
          <Field label="Service Provider Name" error={errors.serviceProviderName}>
            <Input value={formData.serviceProviderName || ''} onChange={(e) => onChange('serviceProviderName', e.target.value)} />
          </Field>
          <Field label="Client Name" error={errors.clientName}>
            <Input value={formData.clientName || ''} onChange={(e) => onChange('clientName', e.target.value)} />
          </Field>
          <Field label="Description of Services" error={errors.descriptionOfServices}>
            <Textarea value={formData.descriptionOfServices || ''} onChange={(e) => onChange('descriptionOfServices', e.target.value)} />
          </Field>
          <Field label="Payment Schedule" error={errors.paymentSchedule}>
            <Select value={formData.paymentSchedule || ''} onValueChange={(value) => onChange('paymentSchedule', value)}>
              <SelectTrigger />
              <SelectContent>
                <SelectItem value="weekly">weekly</SelectItem>
                <SelectItem value="biweekly">biweekly</SelectItem>
                <SelectItem value="monthly">monthly</SelectItem>
                <SelectItem value="on completion">on completion</SelectItem>
              </SelectContent>
            </Select>
          </Field>
          <Field label="Liability Terms" error={errors.liabilityTerms}>
            <Textarea value={formData.liabilityTerms || ''} onChange={(e) => onChange('liabilityTerms', e.target.value)} />
          </Field>
          <Field label="Confidentiality">
            <div className="flex items-center gap-3 rounded-xl border border-slate-200 p-3 dark:border-slate-800">
              <Switch
                checked={Boolean(formData.confidentiality)}
                onCheckedChange={(checked) => onChange('confidentiality', checked)}
              />
              <span className="text-sm">{formData.confidentiality ? 'Yes' : 'No'}</span>
            </div>
          </Field>
          <Field label="Governing Law / Jurisdiction" error={errors.governingLawJurisdiction}>
            <Input
              value={formData.governingLawJurisdiction || ''}
              onChange={(e) => onChange('governingLawJurisdiction', e.target.value)}
            />
          </Field>
        </>
      ) : null}
    </div>
  );
};
