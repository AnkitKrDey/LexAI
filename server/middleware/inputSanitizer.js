import xss from 'xss';
import validator from 'validator';

const MAX_FIELD_LENGTH = 50000;
const INJECTION_PATTERNS = [
  /ignore\s+previous\s+instructions/gi,
  /system\s*:/gi,
  /developer\s*:/gi,
  /assistant\s*:/gi,
  /```/g,
  /<script/gi,
];

const sanitizeString = (value) => {
  let sanitized = xss(value, {
    whiteList: {},
    stripIgnoreTag: true,
    stripIgnoreTagBody: ['script'],
  }).trim();

  for (const pattern of INJECTION_PATTERNS) {
    sanitized = sanitized.replace(pattern, '');
  }

  return sanitized;
};

const sanitizeBody = (value, keyPath = '') => {
  if (typeof value === 'string') {
    if (value.length > MAX_FIELD_LENGTH) {
      throw new Error(`Field '${keyPath}' exceeds max length of ${MAX_FIELD_LENGTH} characters.`);
    }

    if (keyPath.toLowerCase().includes('email') && value && !validator.isEmail(value)) {
      throw new Error(`Field '${keyPath}' must be a valid email.`);
    }

    return sanitizeString(value);
  }

  if (Array.isArray(value)) {
    return value.map((item, index) => sanitizeBody(item, `${keyPath}[${index}]`));
  }

  if (value && typeof value === 'object') {
    const output = {};
    for (const [key, nestedValue] of Object.entries(value)) {
      const childKeyPath = keyPath ? `${keyPath}.${key}` : key;
      output[key] = sanitizeBody(nestedValue, childKeyPath);
    }
    return output;
  }

  return value;
};

export const inputSanitizer = (req, res, next) => {
  try {
    req.body = sanitizeBody(req.body);
    return next();
  } catch (error) {
    return res.status(400).json({ message: error.message || 'Invalid request payload.' });
  }
};
