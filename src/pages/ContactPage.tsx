import {
  AlertCircle,
  Check,
  CheckCircle2,
  Copy,
  Info,
  Loader2,
  Mail,
  Phone,
} from 'lucide-react';
import {FormEvent, useState} from 'react';
import {AnimatedButton} from '../components/AnimatedButton';
import {
  buildMailtoFallbackUrl,
  ContactSubmissionResult,
  getEmailProviderStatus,
  submitContactInquiry,
} from '../lib/contactService';
import {validateContactField, validateContactForm} from '../lib/validation';
import {ContactFormErrors, ContactFormValues} from '../types';

const INITIAL_VALUES: ContactFormValues = {
  fullName: '',
  email: '',
  phone: '',
  company: '',
  projectType: '',
  budget: '',
  timeline: '',
  message: '',
};

const PROJECT_TYPES = [
  'Brand Identity & Positioning',
  'Flagship Marketing Website',
  'Direct-to-Consumer E-commerce',
  'Design System & Product UI',
  'Integrated Launch Campaign',
];

const BUDGET_RANGES = [
  '$25,000 – $50,000',
  '$50,000 – $100,000',
  '$100,000 – $175,000',
  '$175,000+',
];

const TIMELINES = [
  'Immediate (Next 2–4 weeks)',
  'Q1 / Next 1–2 months',
  'Q2 / 3–6 months out',
  'Exploratory / Scoping stage',
];

export function ContactPage() {
  const [values, setValues] = useState<ContactFormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof ContactFormValues, boolean>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<ContactSubmissionResult | null>(null);
  const [copiedToast, setCopiedToast] = useState(false);

  const providerStatus = getEmailProviderStatus();

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText('hello@kestrelstudio.co');
      setCopiedToast(true);
      window.setTimeout(() => setCopiedToast(false), 3000);
    } catch {
      setCopiedToast(false);
    }
  };

  const handleChange = (field: keyof ContactFormValues, value: string) => {
    setValues((prev) => ({...prev, [field]: value}));
    if (touched[field]) {
      const fieldError = validateContactField(field, value);
      setErrors((prev) => ({...prev, [field]: fieldError}));
    }
  };

  const handleBlur = (field: keyof ContactFormValues) => {
    const trimmed =
      field === 'email' || field === 'fullName' || field === 'company'
        ? values[field].trim()
        : values[field];

    if (trimmed !== values[field]) {
      setValues((prev) => ({...prev, [field]: trimmed}));
    }

    setTouched((prev) => ({...prev, [field]: true}));
    const fieldError = validateContactField(field, trimmed);
    setErrors((prev) => ({...prev, [field]: fieldError}));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitResult(null);

    const normalizedValues: ContactFormValues = {
      ...values,
      fullName: values.fullName.trim(),
      email: values.email.trim(),
      phone: values.phone.trim(),
      company: values.company.trim(),
      message: values.message.trim(),
    };
    setValues(normalizedValues);

    const allTouched: Partial<Record<keyof ContactFormValues, boolean>> = {
      fullName: true,
      email: true,
      phone: true,
      company: true,
      projectType: true,
      budget: true,
      timeline: true,
      message: true,
    };
    setTouched(allTouched);

    const validationErrors = validateContactForm(normalizedValues);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      const firstInvalidKey = Object.keys(validationErrors)[0] as keyof ContactFormValues;
      const el = document.getElementById(`contact-${firstInvalidKey}`);
      el?.focus();
      return;
    }

    setSubmitting(true);
    const result = await submitContactInquiry(normalizedValues);
    setSubmitting(false);
    setSubmitResult(result);

    if (result.status === 'sent') {
      setValues(INITIAL_VALUES);
      setTouched({});
      setErrors({});
    }
  };

  const inputBaseClass = (hasError: boolean) =>
    `w-full rounded-xl border bg-white px-4 py-3 text-sm sm:text-base text-[#111111] placeholder:text-[#767672] transition-colors focus:outline-none focus:ring-2 ${
      hasError
        ? 'border-[#D92D20] focus:border-[#D92D20] focus:ring-[#D92D20]/20'
        : 'border-black/14 hover:border-black/30 focus:border-[#111111] focus:ring-[#111111]/10'
    }`;

  return (
    <div className="w-full pt-28 sm:pt-36 pb-24 lg:pb-32">
      {/* Copy-Email Accessible Toast */}
      <div
        role="status"
        aria-live="polite"
        className={`fixed bottom-6 right-6 z-50 flex items-center gap-2.5 rounded-full bg-[#111111] px-5 py-3 text-xs sm:text-sm font-medium text-white shadow-xl transition-all duration-200 ${
          copiedToast
            ? 'translate-y-0 opacity-100'
            : 'pointer-events-none translate-y-3 opacity-0'
        }`}
      >
        <Check className="h-4 w-4 text-[#FF521B]" aria-hidden="true" />
        <span>Email copied: hello@kestrelstudio.co</span>
      </div>

      <div className="mx-auto max-w-[1380px] px-5 sm:px-8 lg:px-12">
        {/* Hero */}
        <div className="max-w-4xl space-y-5 pb-14 lg:pb-20">
          <p className="text-xs font-semibold tracking-wide text-[#FF521B]">
            New Project Inquiries
          </p>
          <h1 className="font-display text-4xl sm:text-6xl lg:text-[4.35rem] font-semibold tracking-[-0.03em] leading-[1.04] text-[#111111] text-balance">
            Have something ambitious in mind?
          </h1>
          <p className="max-w-2xl text-base sm:text-lg leading-relaxed text-[#575754]">
            Share your project scope, target launch window, and commercial goals. A senior
            director reviews every brief directly and responds within one business day.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left Column: Studio Contact Details */}
          <aside className="lg:col-span-4 space-y-8">
            <div className="rounded-2xl border border-black/10 bg-white p-7 sm:p-8 space-y-7">
              <div className="space-y-3">
                <h2 className="text-xs font-semibold tracking-wide text-[#767672]">
                  Direct Email
                </h2>
                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href="mailto:hello@kestrelstudio.co"
                    className="inline-flex items-center gap-2 font-display text-lg font-semibold text-[#111111] underline decoration-black/20 underline-offset-4 hover:text-[#FF521B] hover:decoration-[#FF521B]"
                  >
                    <Mail className="h-4 w-4 text-[#FF521B]" aria-hidden="true" />
                    <span>hello@kestrelstudio.co</span>
                  </a>
                </div>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-2 rounded-full border border-black/12 bg-[#F6F6F4] px-3.5 py-1.5 text-xs font-medium text-[#111111] transition-colors hover:bg-[#111111] hover:text-white cursor-pointer"
                >
                  <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>{copiedToast ? 'Copied to clipboard' : 'Copy email address'}</span>
                </button>
              </div>

              <div className="border-t border-black/8 pt-6 space-y-2">
                <h2 className="text-xs font-semibold tracking-wide text-[#767672]">
                  Telephone
                </h2>
                <a
                  href="tel:+442079460821"
                  className="inline-flex items-center gap-2 font-mono text-base font-medium text-[#111111] hover:text-[#FF521B]"
                >
                  <Phone className="h-4 w-4 text-[#FF521B]" aria-hidden="true" />
                  <span>+44 20 7946 0821</span>
                </a>
                <p className="text-xs text-[#767672]">
                  Monday – Friday, 09:00 – 18:00 GMT
                </p>
              </div>

              <div className="border-t border-black/8 pt-6 space-y-2">
                <h2 className="text-xs font-semibold tracking-wide text-[#767672]">
                  London Studio
                </h2>
                <p className="text-sm leading-relaxed text-[#111111]">
                  42 Redchurch Street
                  <br />
                  Shoreditch, London E2 7DP
                  <br />
                  United Kingdom
                </p>
              </div>

              <div className="border-t border-black/8 pt-6 space-y-3">
                <h2 className="text-xs font-semibold tracking-wide text-[#767672]">
                  Social Channels
                </h2>
                <div className="flex flex-wrap gap-4 text-sm font-medium">
                  <a
                    href="https://www.linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#111111] hover:text-[#FF521B]"
                  >
                    LinkedIn
                  </a>
                  <a
                    href="https://x.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#111111] hover:text-[#FF521B]"
                  >
                    X (Twitter)
                  </a>
                  <a
                    href="https://www.instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#111111] hover:text-[#FF521B]"
                  >
                    Instagram
                  </a>
                </div>
              </div>
            </div>

            {providerStatus === 'unconfigured' && (
              <div className="rounded-2xl border border-black/10 bg-[#ECECE9] p-5 text-xs leading-relaxed text-[#575754] space-y-2">
                <p className="font-semibold text-[#111111] flex items-center gap-2">
                  <Info className="h-4 w-4 text-[#FF521B] shrink-0" aria-hidden="true" />
                  <span>Email Relay Status: Development Mode</span>
                </p>
                <p>
                  Configure <code className="font-mono text-[#111111]">VITE_EMAILJS_*</code> or{' '}
                  <code className="font-mono text-[#111111]">VITE_BREVO_PROXY_URL</code> in
                  your environment to enable automated delivery. Form validation remains fully
                  active and provides a prefilled email fallback upon submission.
                </p>
              </div>
            )}
          </aside>

          {/* Right Column: Validated Contact Form */}
          <div className="lg:col-span-8">
            <form
              onSubmit={handleSubmit}
              noValidate
              className="rounded-3xl border border-black/10 bg-white p-6 sm:p-10 space-y-7"
            >
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {/* Full Name */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="contact-fullName"
                    className="block text-xs font-semibold text-[#111111]"
                  >
                    Full Name <span className="text-[#FF521B]">*</span>
                  </label>
                  <input
                    id="contact-fullName"
                    name="fullName"
                    type="text"
                    autoComplete="name"
                    placeholder="Clara Lindqvist"
                    value={values.fullName}
                    onChange={(e) => handleChange('fullName', e.target.value)}
                    onBlur={() => handleBlur('fullName')}
                    aria-required="true"
                    aria-invalid={Boolean(errors.fullName)}
                    aria-describedby={errors.fullName ? 'error-fullName' : undefined}
                    className={inputBaseClass(Boolean(errors.fullName))}
                  />
                  {errors.fullName && (
                    <p
                      id="error-fullName"
                      role="alert"
                      className="flex items-start gap-1.5 text-xs font-medium text-[#B42318]"
                    >
                      <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                      <span>{errors.fullName}</span>
                    </p>
                  )}
                </div>

                {/* Email Address */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="contact-email"
                    className="block text-xs font-semibold text-[#111111]"
                  >
                    Email Address <span className="text-[#FF521B]">*</span>
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="clara@company.com"
                    value={values.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    onBlur={() => handleBlur('email')}
                    aria-required="true"
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? 'error-email' : undefined}
                    className={inputBaseClass(Boolean(errors.email))}
                  />
                  {errors.email && (
                    <p
                      id="error-email"
                      role="alert"
                      className="flex items-start gap-1.5 text-xs font-medium text-[#B42318]"
                    >
                      <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                      <span>{errors.email}</span>
                    </p>
                  )}
                </div>

                {/* Phone Number */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="contact-phone"
                    className="block text-xs font-semibold text-[#111111]"
                  >
                    Phone Number <span className="text-[#FF521B]">*</span>
                  </label>
                  <input
                    id="contact-phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder="+44 20 7946 0821"
                    value={values.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    onBlur={() => handleBlur('phone')}
                    aria-required="true"
                    aria-invalid={Boolean(errors.phone)}
                    aria-describedby={errors.phone ? 'error-phone' : undefined}
                    className={inputBaseClass(Boolean(errors.phone))}
                  />
                  {errors.phone && (
                    <p
                      id="error-phone"
                      role="alert"
                      className="flex items-start gap-1.5 text-xs font-medium text-[#B42318]"
                    >
                      <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                      <span>{errors.phone}</span>
                    </p>
                  )}
                </div>

                {/* Company / Brand */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="contact-company"
                    className="block text-xs font-semibold text-[#111111]"
                  >
                    Company / Brand <span className="text-[#FF521B]">*</span>
                  </label>
                  <input
                    id="contact-company"
                    name="company"
                    type="text"
                    autoComplete="organization"
                    placeholder="Vela Precision Systems"
                    value={values.company}
                    onChange={(e) => handleChange('company', e.target.value)}
                    onBlur={() => handleBlur('company')}
                    aria-required="true"
                    aria-invalid={Boolean(errors.company)}
                    aria-describedby={errors.company ? 'error-company' : undefined}
                    className={inputBaseClass(Boolean(errors.company))}
                  />
                  {errors.company && (
                    <p
                      id="error-company"
                      role="alert"
                      className="flex items-start gap-1.5 text-xs font-medium text-[#B42318]"
                    >
                      <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                      <span>{errors.company}</span>
                    </p>
                  )}
                </div>

                {/* Project Type */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="contact-projectType"
                    className="block text-xs font-semibold text-[#111111]"
                  >
                    Project Type <span className="text-[#FF521B]">*</span>
                  </label>
                  <select
                    id="contact-projectType"
                    name="projectType"
                    value={values.projectType}
                    onChange={(e) => handleChange('projectType', e.target.value)}
                    onBlur={() => handleBlur('projectType')}
                    aria-required="true"
                    aria-invalid={Boolean(errors.projectType)}
                    aria-describedby={errors.projectType ? 'error-projectType' : undefined}
                    className={inputBaseClass(Boolean(errors.projectType))}
                  >
                    <option value="">Select project discipline...</option>
                    {PROJECT_TYPES.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  {errors.projectType && (
                    <p
                      id="error-projectType"
                      role="alert"
                      className="flex items-start gap-1.5 text-xs font-medium text-[#B42318]"
                    >
                      <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                      <span>{errors.projectType}</span>
                    </p>
                  )}
                </div>

                {/* Estimated Budget */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="contact-budget"
                    className="block text-xs font-semibold text-[#111111]"
                  >
                    Estimated Budget <span className="text-[#FF521B]">*</span>
                  </label>
                  <select
                    id="contact-budget"
                    name="budget"
                    value={values.budget}
                    onChange={(e) => handleChange('budget', e.target.value)}
                    onBlur={() => handleBlur('budget')}
                    aria-required="true"
                    aria-invalid={Boolean(errors.budget)}
                    aria-describedby={errors.budget ? 'error-budget' : undefined}
                    className={inputBaseClass(Boolean(errors.budget))}
                  >
                    <option value="">Select estimated investment...</option>
                    {BUDGET_RANGES.map((range) => (
                      <option key={range} value={range}>
                        {range}
                      </option>
                    ))}
                  </select>
                  {errors.budget && (
                    <p
                      id="error-budget"
                      role="alert"
                      className="flex items-start gap-1.5 text-xs font-medium text-[#B42318]"
                    >
                      <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                      <span>{errors.budget}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Project Timeline */}
              <div className="space-y-1.5">
                <label
                  htmlFor="contact-timeline"
                  className="block text-xs font-semibold text-[#111111]"
                >
                  Project Timeline <span className="text-[#FF521B]">*</span>
                </label>
                <select
                  id="contact-timeline"
                  name="timeline"
                  value={values.timeline}
                  onChange={(e) => handleChange('timeline', e.target.value)}
                  onBlur={() => handleBlur('timeline')}
                  aria-required="true"
                  aria-invalid={Boolean(errors.timeline)}
                  aria-describedby={errors.timeline ? 'error-timeline' : undefined}
                  className={inputBaseClass(Boolean(errors.timeline))}
                >
                  <option value="">Select target launch window...</option>
                  {TIMELINES.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
                {errors.timeline && (
                  <p
                    id="error-timeline"
                    role="alert"
                    className="flex items-start gap-1.5 text-xs font-medium text-[#B42318]"
                  >
                    <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                    <span>{errors.timeline}</span>
                  </p>
                )}
              </div>

              {/* Project Message */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="contact-message"
                    className="block text-xs font-semibold text-[#111111]"
                  >
                    Project Brief <span className="text-[#FF521B]">*</span>
                  </label>
                  <span className="font-mono text-[11px] text-[#767672]">
                    {values.message.trim().length} / 2000
                  </span>
                </div>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  maxLength={2000}
                  placeholder="Tell us about your brand, product goals, key challenges, and what success looks like six months after launch..."
                  value={values.message}
                  onChange={(e) => handleChange('message', e.target.value)}
                  onBlur={() => handleBlur('message')}
                  aria-required="true"
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? 'error-message' : undefined}
                  className={inputBaseClass(Boolean(errors.message))}
                />
                {errors.message && (
                  <p
                    id="error-message"
                    role="alert"
                    className="flex items-start gap-1.5 text-xs font-medium text-[#B42318]"
                  >
                    <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                    <span>{errors.message}</span>
                  </p>
                )}
              </div>

              {/* Submission Status Feedback */}
              {submitResult && (
                <div
                  role="status"
                  aria-live="polite"
                  className={`rounded-2xl border p-5 text-sm space-y-3 ${
                    submitResult.status === 'sent'
                      ? 'border-[#067647]/25 bg-[#ECFDF3] text-[#067647]'
                      : submitResult.status === 'unconfigured'
                        ? 'border-[#B54708]/25 bg-[#FFFAEB] text-[#7A2E0E]'
                        : 'border-[#D92D20]/25 bg-[#FEF3F2] text-[#B42318]'
                  }`}
                >
                  <div className="flex items-start gap-2.5 font-medium">
                    {submitResult.status === 'sent' ? (
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                    ) : submitResult.status === 'unconfigured' ? (
                      <Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                    ) : (
                      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                    )}
                    <span>{submitResult.message}</span>
                  </div>

                  {submitResult.status === 'unconfigured' && (
                    <div className="flex flex-wrap items-center gap-3 pt-1">
                      <a
                        href={buildMailtoFallbackUrl(values)}
                        className="inline-flex items-center gap-2 rounded-full bg-[#111111] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#FF521B]"
                      >
                        <Mail className="h-3.5 w-3.5" aria-hidden="true" />
                        <span>Open Prefilled Email to hello@kestrelstudio.co</span>
                      </a>
                    </div>
                  )}
                </div>
              )}

              {/* Submit Button */}
              <div className="flex flex-col gap-4 border-t border-black/8 pt-6 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs text-[#767672]">
                  NDA available prior to technical or commercial scoping calls.
                </p>

                <AnimatedButton
                  type="submit"
                  disabled={submitting}
                  label={submitting ? 'Sending Brief...' : 'Submit Project Brief'}
                  variant="primary"
                  size="lg"
                  showArrow={!submitting}
                  icon={
                    submitting ? (
                      <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                    ) : undefined
                  }
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
