export const required = (value) => (value && String(value).trim() ? '' : 'This field is required.');

export const minLength = (value, min, label) =>
  String(value || '').trim().length >= min ? '' : `${label} must be at least ${min} characters.`;

export const positiveNumber = (value, label) => {
  const num = Number(value);
  return Number.isFinite(num) && num > 0 ? '' : `${label} must be a positive number.`;
};

export const validateContractForm = (type, formData) => {
  const errors = {};

  const addError = (key, message) => {
    if (message) errors[key] = message;
  };

  if (type === 'NDA') {
    addError('disclosingPartyName', required(formData.disclosingPartyName));
    addError('receivingPartyName', required(formData.receivingPartyName));
    addError('jurisdiction', required(formData.jurisdiction));
    addError('duration', required(formData.duration));
    addError('scope', minLength(formData.scope, 20, 'Confidential Information Scope'));
  }

  if (type === 'Freelance') {
    addError('clientName', required(formData.clientName));
    addError('freelancerName', required(formData.freelancerName));
    addError('scopeOfWork', minLength(formData.scopeOfWork, 20, 'Scope of Work'));
    addError('paymentAmount', positiveNumber(formData.paymentAmount, 'Payment Amount'));
    addError('paymentTerms', required(formData.paymentTerms));
    addError('projectDeadline', required(formData.projectDeadline));
    addError('revisionPolicy', minLength(formData.revisionPolicy, 10, 'Revision Policy'));
    addError('ipOwnership', required(formData.ipOwnership));
    addError('terminationClause', minLength(formData.terminationClause, 10, 'Termination Clause'));
  }

  if (type === 'Service') {
    addError('serviceProviderName', required(formData.serviceProviderName));
    addError('clientName', required(formData.clientName));
    addError('descriptionOfServices', minLength(formData.descriptionOfServices, 20, 'Description of Services'));
    addError('paymentSchedule', required(formData.paymentSchedule));
    addError('liabilityTerms', minLength(formData.liabilityTerms, 10, 'Liability Terms'));
    addError('governingLawJurisdiction', required(formData.governingLawJurisdiction));
  }

  return errors;
};
