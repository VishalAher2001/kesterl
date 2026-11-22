import {ContactFormErrors, ContactFormValues} from '../types';

/**
 * Validates full name:
 * - Required
 * - Minimum 2 characters after trimming
 * - Must contain at least two alphabetic letters (rejects numbers-only or symbol-only strings)
 */
export function validateFullName(raw: string): string | undefined {
  const value = raw.trim();
  if (!value) {
    return 'Please enter your full name.';
  }
  if (value.length < 2) {
    return 'Full name must be at least 2 characters long.';
  }
  const letters = value.match(/[a-zA-Z\u00C0-\u024F]/g) ?? [];
  if (letters.length < 2) {
    return 'Please enter a valid name containing letters rather than numbers or symbols only.';
  }
  if (/^[0-9\s\W_]+$/.test(value)) {
    return 'Full name cannot consist only of numbers or symbols.';
  }
  return undefined;
}

/**
 * Validates email strictly:
 * - Required, whitespace trimmed
 * - Must have local part + @ + domain label + dot + valid TLD (>= 2 alpha chars)
 * - Rejects malformed formats such as "test@", "test.com", "test@gmail", consecutive dots, spaces
 */
export function validateEmail(raw: string): string | undefined {
  const value = raw.trim();
  if (!value) {
    return 'Please enter your email address.';
  }
  if (/\s/.test(value)) {
    return 'Email address cannot contain spaces.';
  }

  const parts = value.split('@');
  if (parts.length !== 2) {
    return 'Please enter a complete email address (for example, alex@company.com).';
  }

  const [localPart, domainPart] = parts;
  if (!localPart || localPart.length > 64) {
    return 'The username before the @ symbol appears invalid.';
  }
  if (localPart.startsWith('.') || localPart.endsWith('.') || localPart.includes('..')) {
    return 'Email address contains invalid dot placement.';
  }
  if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+$/.test(localPart)) {
    return 'Email address contains unsupported characters.';
  }

  if (!domainPart || !domainPart.includes('.')) {
    return 'Email domain must include a valid extension (such as .com or .co.uk).';
  }
  if (domainPart.startsWith('.') || domainPart.endsWith('.') || domainPart.includes('..')) {
    return 'Email domain contains invalid dot placement.';
  }

  const domainLabels = domainPart.split('.');
  const tld = domainLabels[domainLabels.length - 1];
  if (!/^[a-zA-Z]{2,24}$/.test(tld)) {
    return 'Email address must end with a valid domain extension (at least 2 letters).';
  }

  const invalidLabel = domainLabels.some(
    (label) => !label || label.startsWith('-') || label.endsWith('-') || !/^[a-zA-Z0-9-]+$/.test(label)
  );
  if (invalidLabel) {
    return 'Please check the domain name of your email address.';
  }

  return undefined;
}

/**
 * Validates international phone numbers:
 * - Required
 * - Allows digits, spaces, leading +, parentheses, and hyphens
 * - Rejects alphabetic characters and unsupported symbols
 * - Requires between 7 and 15 digits total (ITU-T E.164 bounds)
 */
export function validatePhone(raw: string): string | undefined {
  const value = raw.trim();
  if (!value) {
    return 'Please enter a contact phone number.';
  }
  if (/[a-zA-Z]/.test(value)) {
    return 'Phone numbers cannot contain letters.';
  }
  if (!/^[+\d\s().-]+$/.test(value)) {
    return 'Use only digits and standard formatting characters (+, spaces, hyphens, parentheses).';
  }
  if (value.indexOf('+') > 0 || (value.match(/\+/g)?.length ?? 0) > 1) {
    return 'The international + prefix can only appear once at the beginning.';
  }

  const digitsOnly = value.replace(/\D/g, '');
  if (digitsOnly.length < 7) {
    return 'Phone number is too short. Include at least 7 digits with area or country code.';
  }
  if (digitsOnly.length > 15) {
    return 'Phone number exceeds the maximum international length of 15 digits.';
  }

  return undefined;
}

export function validateCompany(raw: string): string | undefined {
  const value = raw.trim();
  if (!value) {
    return 'Please enter your company or brand name.';
  }
  if (value.length < 2) {
    return 'Company or brand name must be at least 2 characters.';
  }
  return undefined;
}

export function validateSelect(raw: string, fieldLabel: string): string | undefined {
  if (!raw || !raw.trim()) {
    return `Please select a ${fieldLabel.toLowerCase()}.`;
  }
  return undefined;
}

export function validateMessage(raw: string): string | undefined {
  const value = raw.trim();
  if (!value) {
    return 'Please tell us briefly about your project goals.';
  }
  if (value.length < 20) {
    return `Please add at least ${20 - value.length} more characters (minimum 20 characters).`;
  }
  if (value.length > 2000) {
    return 'Message must be 2,000 characters or fewer.';
  }
  return undefined;
}

export function validateContactField(
  field: keyof ContactFormValues,
  value: string
): string | undefined {
  switch (field) {
    case 'fullName':
      return validateFullName(value);
    case 'email':
      return validateEmail(value);
    case 'phone':
      return validatePhone(value);
    case 'company':
      return validateCompany(value);
    case 'projectType':
      return validateSelect(value, 'project type');
    case 'budget':
      return validateSelect(value, 'budget range');
    case 'timeline':
      return validateSelect(value, 'target timeline');
    case 'message':
      return validateMessage(value);
    default:
      return undefined;
  }
}

export function validateContactForm(values: ContactFormValues): ContactFormErrors {
  const errors: ContactFormErrors = {};
  (Object.keys(values) as (keyof ContactFormValues)[]).forEach((field) => {
    const err = validateContactField(field, values[field]);
    if (err) {
      errors[field] = err;
    }
  });
  return errors;
}
